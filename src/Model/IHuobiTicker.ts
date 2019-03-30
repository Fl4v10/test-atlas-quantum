/*
 * Copyright (C) 2017 Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */

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
