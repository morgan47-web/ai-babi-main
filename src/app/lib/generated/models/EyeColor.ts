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
export const EyeColor = {
    Blue: 'blue',
    Brown: 'brown',
    Green: 'green'
} as const;
export type EyeColor = typeof EyeColor[keyof typeof EyeColor];


export function instanceOfEyeColor(value: any): boolean {
    for (const key in EyeColor) {
        if (Object.prototype.hasOwnProperty.call(EyeColor, key)) {
            if (EyeColor[key as keyof typeof EyeColor] === value) {
                return true;
            }
        }
    }
    return false;
}

export function EyeColorFromJSON(json: any): EyeColor {
    return EyeColorFromJSONTyped(json, false);
}

export function EyeColorFromJSONTyped(json: any, ignoreDiscriminator: boolean): EyeColor {
    return json as EyeColor;
}

export function EyeColorToJSON(value?: EyeColor | null): any {
    return value as any;
}

export function EyeColorToJSONTyped(value: any, ignoreDiscriminator: boolean): EyeColor {
    return value as EyeColor;
}

