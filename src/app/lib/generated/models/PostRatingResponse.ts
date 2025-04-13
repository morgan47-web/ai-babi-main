/* tslint:disable */
/* eslint-disable */
/**
 * AI Babe Public API
 * Lorem ipsum
 *
 * The version of the OpenAPI document: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface PostRatingResponse
 */
export interface PostRatingResponse {
    /**
     * 
     * @type {number}
     * @memberof PostRatingResponse
     */
    newBalance: number;
}

/**
 * Check if a given object implements the PostRatingResponse interface.
 */
export function instanceOfPostRatingResponse(value: object): value is PostRatingResponse {
    if (!('newBalance' in value) || value['newBalance'] === undefined) return false;
    return true;
}

export function PostRatingResponseFromJSON(json: any): PostRatingResponse {
    return PostRatingResponseFromJSONTyped(json, false);
}

export function PostRatingResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PostRatingResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'newBalance': json['new_balance'],
    };
}

export function PostRatingResponseToJSON(json: any): PostRatingResponse {
    return PostRatingResponseToJSONTyped(json, false);
}

export function PostRatingResponseToJSONTyped(value?: PostRatingResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'new_balance': value['newBalance'],
    };
}

