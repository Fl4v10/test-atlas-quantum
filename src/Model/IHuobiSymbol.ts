/*
 * Copyright (C) 2017 Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */

/**
 * Market symbols informations for Huobi.
 */
export interface IHuobiSymbol {
    /**
     * Base currency.
     */
    baseCurrency: string;

    /**
     * Quote currency.
     */
    quoteCurrency: string;

    /**
     * Price precision for base currency.
     */
    pricePrecision: number;

    /**
     * Amount Precision for quote currency.
     */
    amountPrecision: number;

    /**
     * Symbol Partition.
     */
    symbolPartition: string;

    /**
     * Symbol.
     */
    symbol: string;
}
