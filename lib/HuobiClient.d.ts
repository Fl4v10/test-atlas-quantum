import * as Model from "./Model";
/**
 * The Huobi Client.
 */
export declare class HuobiClient {
    /**
     * Shared http agent.
     */
    private static httpAgent;
    /**
     * Shared https agent.
     */
    private static httpsAgent;
    /**
     * The key of this client.
     */
    private readonly key;
    /**
     * The secret of this client.
     */
    private readonly secret;
    /**
     * The underlying client used for communication.
     */
    private readonly client;
    /**
     * The public API url.
     */
    private readonly publicURL;
    /**
     * The private API url.
     */
    private readonly privateURL;
    /**
     * The constructor of this client.
     */
    constructor(credentials?: {
        key: string;
        secret: string;
    });
    /**
     * Used to get the available symbols and markets.
     */
    getSymbols(): Promise<Model.IHuobiSymbol[]>;
    /**
     * Used to get the available quotes of currencies.
     */
    getCurrencys(): Promise<Model.IHuobiCurrency[]>;
    /**
     * Query all accounts of the current user
     */
    private getAccount;
    /**
     * Used to get the available tickers.
     */
    getTickers(): Promise<Model.IHuobiTicker[]>;
    /**
     * Makes a public api request and returns the response.
     */
    private publicRequest;
    /**
     * Makes a private api request and returns the response.
     */
    private privateRequest;
    /**
     * Makes a http request and returns a JSON parsed object.
     */
    private httpJSONRequest;
    /**
     * Parses the response and throws if there is any error information within.
     */
    private parseErrors;
}
