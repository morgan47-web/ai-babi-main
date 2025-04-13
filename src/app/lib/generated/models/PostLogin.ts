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
 * @interface PostLogin
 */
export interface PostLogin {
    /**
     * The email of the user
     * @type {string}
     * @memberof PostLogin
     */
    email: string;
    /**
     * The password of the user
     * @type {string}
     * @memberof PostLogin
     */
    password: string;
}

/**
 * Check if a given object implements the PostLogin interface.
 */
export function instanceOfPostLogin(value: object): value is PostLogin {
    if (!('email' in value) || value['email'] === undefined) return false;
    if (!('password' in value) || value['password'] === undefined) return false;
    return true;
}

export function PostLoginFromJSON(json: any): PostLogin {
    return PostLoginFromJSONTyped(json, false);
}

export function PostLoginFromJSONTyped(json: any, ignoreDiscriminator: boolean): PostLogin {
    if (json == null) {
        return json;
    }
    return {
        
        'email': json['email'],
        'password': json['password'],
    };
}

export function PostLoginToJSON(json: any): PostLogin {
    return PostLoginToJSONTyped(json, false);
}

export function PostLoginToJSONTyped(value?: PostLogin | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'email': value['email'],
        'password': value['password'],
    };
}

