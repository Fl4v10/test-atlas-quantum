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

test("Should get getTickers", t => {
    const client = new Core.HuobiClient();

    (client as any).httpJSONRequest = () =>
        Promise.resolve({
            status: "ok",
            ts: 1553907172501,
            data: [{
                "open": 0.007017,
                "close": 0.007133,
                "low": 0.006764,
                "high": 0.0076,
                "amount": 131734020.74206652,
                "count": 13466,
                "vol": 956230.3659966078,
                "symbol": "socusdt"
            },
            {
                "open": 0.00007524,
                "close": 0.00007518,
                "low": 0.00007477,
                "high": 0.00007579,
                "amount": 1950349.9599223558,
                "count": 6748,
                "vol": 146.7113414379494,
                "symbol": "iotabtc"
            }
            ]
        });

    return client.getTickers().then(info => {
        t.is(info.length, 2);
        t.deepEqual(info, [
            {
                open: 0.007017,
                close: 0.007133,
                low: 0.006764,
                high: 0.0076,
                amount: 131734020.74206652,
                count: 13466,
                vol: 956230.3659966078,
                symbol: "socusdt",
                ts: 1553907172501
            },
            {
                open: 0.00007524,
                close: 0.00007518,
                low: 0.00007477,
                high: 0.00007579,
                amount: 1950349.9599223558,
                count: 6748,
                vol: 146.7113414379494,
                symbol: "iotabtc",
                ts: 1553907172501
            }
        ]);
    });
});

if (process.env.ONLINE_TESTS === undefined) {
    test.skip("Skipping HuobiClient.getTickers() online tests.", () =>
        undefined);
} else {
    test.serial("Should get getTickers (online)", t => {
        const client = new Core.HuobiClient();
        return client.getTickers().then(info => {
            t.true(info.length > 0);
            t.truthy(
                info.find(
                    symbol =>
                        symbol.symbol === "iotabtc"
                )
            );
        });
    });
}
