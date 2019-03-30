"use strict";
/*
 * Copyright (C) 2017 Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const parse = require("@raphaabreu/parser");
const axios_1 = require("axios");
const debug = require("debug");
const http = require("http");
const https = require("https");
const HuobiError_1 = require("./HuobiError");
const log = debug("bf:huobi:client");
/**
 * The Huobi Client.
 */
class HuobiClient {
    /**
     * The constructor of this client.
     */
    constructor(credentials) {
        /**
         * The public API url.
         */
        this.publicURL = "https://api.huobi.pro/";
        /**
         * The private API url.
         */
        this.privateURL = "https://api.huobi.pro/v1/";
        if (credentials !== undefined) {
            this.key = credentials.key;
            this.secret = credentials.secret;
        }
        this.client = axios_1.default.create({
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
    getSymbols() {
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
        return this.publicRequest("v1/common/symbols").then((response) => {
            const items = [];
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
    getCurrencys() {
        /*
        {
            "status":"ok",
            "data":[
                "hb10",
                "usdt"
            ]
        }
        */
        return this.publicRequest("v1/common/currencys").then((response) => {
            const items = [];
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
    getAccount() {
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
        return this.privateRequest("GET", "account/accounts").then((response) => {
            const items = [];
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
    getTickers() {
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
        return this.publicRequest("market/tickers").then((response) => {
            const items = [];
            for (const item of parse.array(response.data)) {
                items.push({
                    open: item["open"],
                    close: item["close"],
                    low: item["low"],
                    high: item["high"],
                    amount: item["amount"],
                    count: item["count"],
                    vol: item["vol"],
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
    publicRequest(endPoint, params) {
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
    privateRequest(method, endPoint, params) {
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
    httpJSONRequest(options) {
        log(this.key || "NO_KEY", options.method, options.url, JSON.stringify({ params: options.params, data: options.data }));
        return this.client
            .request(options)
            .then(response => {
            return this.parseErrors(response);
        }, error => {
            this.parseErrors(error.response);
            return Promise.reject(new HuobiError_1.HuobiError(error.message));
        })
            .then((response) => {
            log(this.key || "NO_KEY", options.method, options.url, JSON.stringify({
                params: options.params,
                data: options.data
            }), "SUCCESS");
            return response.data;
        }, error => {
            log(this.key || "NO_KEY", options.method, options.url, JSON.stringify({
                params: options.params,
                data: options.data
            }), "FAILED", JSON.stringify(error));
            return Promise.reject(error);
        });
    }
    /**
     * Parses the response and throws if there is any error information within.
     */
    parseErrors(response) {
        if (response !== undefined &&
            response.data !== undefined &&
            response.data["err-code"] !== undefined &&
            response.data["err-msg"] !== undefined) {
            const code = response.data["err-code"];
            throw new HuobiError_1.HuobiError("Huobi Error: " + response.data["err-msg"], code);
        }
        return response;
    }
}
/**
 * Shared http agent.
 */
HuobiClient.httpAgent = new http.Agent({ keepAlive: true });
/**
 * Shared https agent.
 */
HuobiClient.httpsAgent = new https.Agent({ keepAlive: true });
exports.HuobiClient = HuobiClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSHVvYmlDbGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvSHVvYmlDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7O0dBT0c7O0FBRUgsNENBQTRDO0FBQzVDLGlDQUFnRjtBQUVoRiwrQkFBK0I7QUFDL0IsNkJBQTZCO0FBQzdCLCtCQUErQjtBQUUvQiw2Q0FBMEM7QUFJMUMsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFFckM7O0dBRUc7QUFDSDtJQW9DSTs7T0FFRztJQUNILFlBQVksV0FBNkM7UUFiekQ7O1dBRUc7UUFDYyxjQUFTLEdBQVcsd0JBQXdCLENBQUM7UUFFOUQ7O1dBRUc7UUFDYyxlQUFVLEdBQVcsMkJBQTJCLENBQUM7UUFNOUQsSUFBSSxXQUFXLEtBQUssU0FBUyxFQUFFO1lBQzNCLElBQUksQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQztZQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7U0FDcEM7UUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLGVBQUssQ0FBQyxNQUFNLENBQUM7WUFDdkIsU0FBUyxFQUFFLFdBQVcsQ0FBQyxTQUFTO1lBQ2hDLFVBQVUsRUFBRSxXQUFXLENBQUMsVUFBVTtZQUNsQyxPQUFPLEVBQUU7Z0JBQ0wsY0FBYyxFQUFFLGtCQUFrQjthQUNyQztTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7T0FFRztJQUNJLFVBQVU7UUFDYjs7Ozs7Ozs7Ozs7Ozs7UUFjQTtRQUNBLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQWEsRUFBRSxFQUFFO1lBQ2xFLE1BQU0sS0FBSyxHQUF5QixFQUFFLENBQUM7WUFDdkMsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENB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