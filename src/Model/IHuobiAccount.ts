/*
 * Copyright (C) 2017 Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */

/**
 * Account informations for Huobi.
 */
export interface IHuobiAccount {
    /**
     * Id.
     */
    id: number;
    
    /**
     * userId
     */
    userId: number;
    
    /**
     * Type
     */
    type: string;
    
    /**
     * State
     */
    state: string;
}
