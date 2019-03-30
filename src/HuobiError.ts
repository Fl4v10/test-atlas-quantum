/*
 * Copyright (C) 2017 Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */

import { HuobiErrorCodes } from "./HuobiErrorCodes";

/**
 * Error thrown by the HuobiClient.
 */
export class HuobiError extends Error {
    /**
     * The code for this error.
     */
    public code: HuobiErrorCodes | undefined;

    /**
     * Creates a new error with the given message and code.
     */
    constructor(message: string, code?: HuobiErrorCodes) {
        super(message);

        this.code = code;

        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, HuobiError);
    }
}
