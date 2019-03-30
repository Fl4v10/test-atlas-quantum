/*
 * Copyright (C) 2017 Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */

import test from "ava";

import * as index from "../src/index";

test("Should have HuobiClient available", t => {
    t.truthy(index.HuobiClient);
});
