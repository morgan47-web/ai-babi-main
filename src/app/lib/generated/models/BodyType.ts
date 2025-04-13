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


/**
 * 
 * @export
 */
export const BodyType = {
    Slim: 'slim',
    Athletic: 'athletic',
    Voluptuous: 'voluptuous',
    Curvy: 'curvy'
} as const;
export type BodyType = typeof BodyType[keyof typeof BodyType];


export function instanceOfBodyType(value: any): boolean {
    for (const key in BodyType) {
        if (Object.prototype.hasOwnProperty.call(BodyType, key)) {
            if (BodyType[key as keyof typeof BodyType] === value) {
                return true;
            }
        }
    }
    return false;
}

export function BodyTypeFromJSON(json: any): BodyType {
    return BodyTypeFromJSONTyped(json, false);
}

export function BodyTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): BodyType {
    return json as BodyType;
}

export function BodyTypeToJSON(value?: BodyType | null): any {
    return value as any;
}

export function BodyTypeToJSONTyped(value: any, ignoreDiscriminator: boolean): BodyType {
    return value as BodyType;
}

