"use strict";
/*
 * Copyright (C) 2017 Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Error thrown by the HuobiClient.
 */
class HuobiError extends Error {
    /**
     * Creates a new error with the given message and code.
     */
    constructor(message, code) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, HuobiError);
    }
}
exports.HuobiError = HuobiError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSHVvYmlFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9IdW9iaUVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7OztHQU9HOztBQUlIOztHQUVHO0FBQ0gsZ0JBQXdCLFNBQVEsS0FBSztJQU1qQzs7T0FFRztJQUNILFlBQVksT0FBZSxFQUFFLElBQXNCO1FBQy9DLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVmLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEQsS0FBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztJQUM5QyxDQUFDO0NBQ0o7QUFqQkQsZ0NBaUJDIn0=