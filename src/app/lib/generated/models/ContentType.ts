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
export const ContentType = {
    Avatar: 'avatar',
    Public: 'public',
    PrivateWall: 'private_wall',
    PrivateChat: 'private_chat',
    PrivateGallery: 'private_gallery'
} as const;
export type ContentType = typeof ContentType[keyof typeof ContentType];


export function instanceOfContentType(value: any): boolean {
    for (const key in ContentType) {
        if (Object.prototype.hasOwnProperty.call(ContentType, key)) {
            if (ContentType[key as keyof typeof ContentType] === value) {
                return true;
            }
        }
    }
    return false;
}

export function ContentTypeFromJSON(json: any): ContentType {
    return ContentTypeFromJSONTyped(json, false);
}

export function ContentTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): ContentType {
    return json as ContentType;
}

export function ContentTypeToJSON(value?: ContentType | null): any {
    return value as any;
}

export function ContentTypeToJSONTyped(value: any, ignoreDiscriminator: boolean): ContentType {
    return value as ContentType;
}

