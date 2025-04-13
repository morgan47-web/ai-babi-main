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
import type { ChatbotType } from './ChatbotType';
import {
    ChatbotTypeFromJSON,
    ChatbotTypeFromJSONTyped,
    ChatbotTypeToJSON,
    ChatbotTypeToJSONTyped,
} from './ChatbotType';

/**
 * The new type of the chatbot
 * @export
 * @interface Type
 */
export interface Type {
}

/**
 * Check if a given object implements the Type interface.
 */
export function instanceOfType(value: object): value is Type {
    return true;
}

export function TypeFromJSON(json: any): Type {
    return TypeFromJSONTyped(json, false);
}

export function TypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): Type {
    return json;
}

export function TypeToJSON(json: any): Type {
    return TypeToJSONTyped(json, false);
}

export function TypeToJSONTyped(value?: Type | null, ignoreDiscriminator: boolean = false): any {
    return value;
}

