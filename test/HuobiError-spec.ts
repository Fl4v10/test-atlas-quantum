/*
 * Copyright (C) 2017 Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */

import test from "ava";

import * as Core from "../src";

test("Should instantiate a new HuobiError with custom message", t => {
    const error = new Core.HuobiError("test message");

    t.is(error.message, "test message");
});
