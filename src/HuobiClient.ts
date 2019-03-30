/*
 * Copyright (C) 2017 Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */

import * as parse from "@raphaabreu/parser";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import * as crypto from "crypto";
import * as debug from "debug";
import * as http from "http";
import * as https from "https";

import { HuobiError } from "./HuobiError";
import { HuobiErrorCodes } from "./HuobiErrorCodes";
import * as Model from "./Model";

const log = debug("bf:huobi:client");

/**
 * The Huobi Client.
 */
export class HuobiClient {
    /**
     * Shared http agent.
     */
    private static httpAgent = new http.Agent({ keepAlive: true });

    /**
     * Shared https agent.
     */
    private static httpsAgent = new https.Agent({ keepAlive: true });

    /**
     * The key of this client.
     */
    private readonly key!: string;

    /**
     * The secret of this client.
     */
    private readonly secret!: string;

    /**
     * The underlying client used for communication.
     */
    private readonly client: AxiosInstance;

    /**
     * The public API url.
     */
    private readonly publicURL: string = "https://api.huobi.pro/";

    /**
     * The private API url.
     */
    private readonly privateURL: string = "https://api.huobi.pro/v1/";

    /**
     * The constructor of this client.
     */
    constructor(credentials?: { key: string; secret: string }) {
        if (credentials !== undefined) {
            this.key = credentials.key;
            this.secret = credentials.secret;
        }

        this.client = axios.create({
            httpAgent: HuobiClient.httpAgent,
            httpsAgent: HuobiClient.httpsAgent,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    /**
     * Used to get the available symbols and markets.
     */
    public getSymbols(): Promise<Model.IHuobiSymbol[]> {
        /*
      {
        "status":"ok",
        "data":[
          {
            "base-currency":"btc",
            "quote-currency":"usdt",
            "price-precision":2,
            "amount-precision":4,
            "symbol-partition":"main",
            "symbol": ""
          }
        ]
      }
      */
        return this.publicRequest("v1/common/symbols").then((response: any) => {
            const items: Model.IHuobiSymbol[] = [];
            for (const item of parse.array(response.data)) {
                items.push({
                    baseCurrency: parse.text(item["base-currency"]),
                    quoteCurrency: parse.text(item["quote-currency"]),
                    pricePrecision: parse.integer(item["price-precision"]),
                    amountPrecision: parse.integer(item["amount-precision"]),
                    symbolPartition: parse.text(item["symbol-partition"]),
                    symbol: parse.text(item.symbol)
                });
            }
            return items;
        });
    }

    /**
     * Used to get the available quotes of currencies.
     */
    public getCurrencys(): Promise<Model.IHuobiCurrency[]> {
        /*
        {
            "status":"ok",
            "data":[
                "hb10",
                "usdt"
            ]
        }
        */
        return this.publicRequest("v1/common/currencys").then((response: any) => {
            const items: Model.IHuobiCurrency[] = [];
            for (const item of parse.array(response.data)) {
                items.push({
                    quoteCurrency: parse.text(item),
                });
            }
            return items;
        });
    }
    
    /**
     * Query all accounts of the current user
     */
    private getAccount(): Promise<Model.IHuobiAccount[]> {
        /*
      {
        "status": "ok",
        "data": [
            {
            "id": 100009,
            "type": "spot",
            "state": "working",
            "user-id": 1000
            }
        ]
      }
      */
        return this.privateRequest("GET", "account/accounts").then((response: any) => {
            const items: Model.IHuobiAccount[] = [];
            for (const item of parse.array(response.data)) {
                items.push({
                    id: parse.integer(item["id"]),
                    type: parse.text(item["type"]),
                    state: parse.text(item["state"]),
                    userId: parse.integer(item["user-id"])
                });
            }
            return items;
        });
    }

    /**
     * Used to get the available tickers.
     */
    public getTickers(): Promise<Model.IHuobiTicker[]> {
        /*
      {
        "status":"ok",
        "ts": 1553907172501,
        "data": [
            {
                "open": 0.007017,
                "close": 0.007133,
                "low": 0.006764,
                "high": 0.0076,
                "amount": 131734020.74206652,
                "count": 13466,
                "vol": 956230.3659966078,
                "symbol": "socusdt"
            }
        ]
      }
      */
        return this.publicRequest("market/tickers").then((response: any) => {
            const items: Model.IHuobiTicker[] = [];
            for (const item of parse.array(response.data)) {
                items.push({
                    open : item["open"],
                    close : item["close"],
                    low : item["low"],
                    high : item["high"],
                    amount : item["amount"],
                    count : item["count"],
                    vol : item["vol"],
                    symbol: parse.text(item.symbol),
                    ts: response.ts
                });
            }
            return items;
        });
    }

    /**
     * Makes a public api request and returns the response.
     */
    private publicRequest(endPoint: string, params?: any): Promise<any> {
        return this.httpJSONRequest({
            baseURL: this.publicURL,
            url: endPoint,
            method: "GET",
            params
        });
    }

    /**
     * Makes a private api request and returns the response.
     */
    private privateRequest(
        method: string,
        endPoint: string,
        params?: any
    ): Promise<any> {
        // set initial login params
        if (params === undefined) {
            params = {};
        }
        const body = params;
        const data = "";

        // generate your hash here

        return this.httpJSONRequest({
            baseURL: this.privateURL,
            url: endPoint + "?" + data,
            method,
            data: params
        });
    }

    /**
     * Makes a http request and returns a JSON parsed object.
     */
    private httpJSONRequest(options: AxiosRequestConfig): Promise<any> {
        log(
            this.key || "NO_KEY",
            options.method,
            options.url,
            JSON.stringify({ params: options.params, data: options.data })
        );

        return this.client
            .request(options)
            .then(
                response => {
                    return this.parseErrors(response);
                },
                error => {
                    this.parseErrors(error.response);
                    return Promise.reject(new HuobiError(error.message));
                }
            )
            .then(
                (response: any) => {
                    log(
                        this.key || "NO_KEY",
                        options.method,
                        options.url,
                        JSON.stringify({
                            params: options.params,
                            data: options.data
                        }),
                        "SUCCESS"
                    );
                    return response.data;
                },
                error => {
                    log(
                        this.key || "NO_KEY",
                        options.method,
                        options.url,
                        JSON.stringify({
                            params: options.params,
                            data: options.data
                        }),
                        "FAILED",
                        JSON.stringify(error)
                    );
                    return Promise.reject(error);
                }
            );
    }

    /**
     * Parses the response and throws if there is any error information within.
     */
    private parseErrors(response: AxiosResponse): AxiosResponse {
        if (
            response !== undefined &&
            response.data !== undefined &&
            response.data["err-code"] !== undefined &&
            response.data["err-msg"] !== undefined
        ) {
            const code = response.data["err-code"] as HuobiErrorCodes;
            throw new HuobiError(
                "Huobi Error: " + response.data["err-msg"],
                code
            );
        }

        return response;
    }
}
