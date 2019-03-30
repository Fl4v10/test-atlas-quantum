import { HuobiErrorCodes } from "./HuobiErrorCodes";
/**
 * Error thrown by the HuobiClient.
 */
export declare class HuobiError extends Error {
    /**
     * The code for this error.
     */
    code: HuobiErrorCodes | undefined;
    /**
     * Creates a new error with the given message and code.
     */
    constructor(message: string, code?: HuobiErrorCodes);
}
