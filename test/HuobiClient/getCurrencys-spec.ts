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

test("Should get getCurrencys", t => {
    const client = new Core.HuobiClient();

    (client as any).httpJSONRequest = () =>
        Promise.resolve({
            status: "ok",
            data:[
                "hb10",
                "usdt",
                "btc",
                "bch",
                "eth",
                "xrp",
                "ltc",
                "ht",
                "ada",
                "eos",
                "iota",
                "xem",
                "xmr",
                "dash",
                "neo",
                "trx",
                "icx",
                "lsk",
                "qtum",
                "etc",
                "btg",
                "omg"
            ]
        });

    return client.getCurrencys().then(info => {
        t.is(info.length, 22);
        t.deepEqual(info[2].quoteCurrency, "btc");
        t.deepEqual(info[19].quoteCurrency, "etc");
    });
});

if (process.env.ONLINE_TESTS === undefined) {
    test.skip("Skipping HuobiClient.getCurrencys() online tests.", () =>
        undefined);
} else {
    test.serial("Should get getCurrencys (online)", t => {
        const client = new Core.HuobiClient();
        return client.getCurrencys().then(info => {
            t.true(info.length > 0);
            t.truthy(
                info.find(
                    symbol =>
                        symbol.quoteCurrency === "btc"
                )
            );
        });
    });
}
