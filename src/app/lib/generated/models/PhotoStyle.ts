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
export const PhotoStyle = {
    Amateur: 'amateur',
    Canon: 'canon'
} as const;
export type PhotoStyle = typeof PhotoStyle[keyof typeof PhotoStyle];


export function instanceOfPhotoStyle(value: any): boolean {
    for (const key in PhotoStyle) {
        if (Object.prototype.hasOwnProperty.call(PhotoStyle, key)) {
            if (PhotoStyle[key as keyof typeof PhotoStyle] === value) {
                return true;
            }
        }
    }
    return false;
}

export function PhotoStyleFromJSON(json: any): PhotoStyle {
    return PhotoStyleFromJSONTyped(json, false);
}

export function PhotoStyleFromJSONTyped(json: any, ignoreDiscriminator: boolean): PhotoStyle {
    return json as PhotoStyle;
}

export function PhotoStyleToJSON(value?: PhotoStyle | null): any {
    return value as any;
}

export function PhotoStyleToJSONTyped(value: any, ignoreDiscriminator: boolean): PhotoStyle {
    return value as PhotoStyle;
}

