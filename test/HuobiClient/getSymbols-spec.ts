/*
 * Copyright (C) 2017 Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */

import test from "ava";

import * as Core from "../../src";

test("Should get getSymbols", t => {
    const client = new Core.HuobiClient();

    (client as any).httpJSONRequest = () =>
        Promise.resolve({
            status: "ok",
            data: [
                {
                    "base-currency": "btc",
                    "quote-currency": "usdt",
                    "price-precision": 2,
                    "amount-precision": 4,
                    "symbol-partition": "main",
                    symbol: "qtumbtc"
                },
                {
                    "base-currency": "bch",
                    "quote-currency": "usdt",
                    "price-precision": 2,
                    "amount-precision": 4,
                    "symbol-partition": "main",
                    symbol: "qtumbtc"
                }
            ]
        });

    return client.getSymbols().then(info => {
        t.is(info.length, 2);
        t.deepEqual(info, [
            {
                baseCurrency: "btc",
                quoteCurrency: "usdt",
                pricePrecision: 2,
                amountPrecision: 4,
                symbolPartition: "main",
                symbol: "qtumbtc"
            },
            {
                baseCurrency: "bch",
                quoteCurrency: "usdt",
                pricePrecision: 2,
                amountPrecision: 4,
                symbolPartition: "main",
                symbol: "qtumbtc"
            }
        ]);
    });
});

if (process.env.ONLINE_TESTS === undefined) {
    test.skip("Skipping HuobiClient.getSymbols() online tests.", () =>
        undefined);
} else {
    test.serial("Should get getSymbols (online)", t => {
        const client = new Core.HuobiClient();
        return client.getSymbols().then(info => {
            t.true(info.length > 0);
            t.truthy(
                info.find(
                    symbol =>
                        symbol.baseCurrency === "btc" &&
                        symbol.quoteCurrency === "usdt"
                )
            );
        });
    });
}
