/**
 * Market tickers informations for Huobi.
 */
export interface IHuobiTicker {
    /**
     * Open.
     */
    open: number;
    /**
     * Close
     */
    close: number;
    /**
     * low
     */
    low: number;
    /**
     * High
     */
    high: number;
    /**
     * Amount
     */
    amount: number;
    /**
     * Count
     */
    count: number;
    /**
     * Vol
     */
    vol: number;
    /**
     * Symbol.
     */
    symbol: string;
    /**
     * Timestamp.
     */
    ts: number;
}
