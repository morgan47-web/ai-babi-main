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
 * @interface AddonPrice
 */
export interface AddonPrice {
    /**
     * 
     * @type {string}
     * @memberof AddonPrice
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof AddonPrice
     */
    displayName: string;
    /**
     * 
     * @type {string}
     * @memberof AddonPrice
     */
    displayPrice: string;
    /**
     * 
     * @type {string}
     * @memberof AddonPrice
     */
    currency: string;
    /**
     * 
     * @type {number}
     * @memberof AddonPrice
     */
    tokens: number;
    /**
     * 
     * @type {string}
     * @memberof AddonPrice
     */
    discount: string | null;
}

/**
 * Check if a given object implements the AddonPrice interface.
 */
export function instanceOfAddonPrice(value: object): value is AddonPrice {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('displayName' in value) || value['displayName'] === undefined) return false;
    if (!('displayPrice' in value) || value['displayPrice'] === undefined) return false;
    if (!('currency' in value) || value['currency'] === undefined) return false;
    if (!('tokens' in value) || value['tokens'] === undefined) return false;
    if (!('discount' in value) || value['discount'] === undefined) return false;
    return true;
}

export function AddonPriceFromJSON(json: any): AddonPrice {
    return AddonPriceFromJSONTyped(json, false);
}

export function AddonPriceFromJSONTyped(json: any, ignoreDiscriminator: boolean): AddonPrice {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'displayName': json['display_name'],
        'displayPrice': json['display_price'],
        'currency': json['currency'],
        'tokens': json['tokens'],
        'discount': json['discount'],
    };
}

export function AddonPriceToJSON(json: any): AddonPrice {
    return AddonPriceToJSONTyped(json, false);
}

export function AddonPriceToJSONTyped(value?: AddonPrice | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'display_name': value['displayName'],
        'display_price': value['displayPrice'],
        'currency': value['currency'],
        'tokens': value['tokens'],
        'discount': value['discount'],
    };
}

