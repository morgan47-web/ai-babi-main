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
import type { GalleryItem } from './GalleryItem';
import {
    GalleryItemFromJSON,
    GalleryItemFromJSONTyped,
    GalleryItemToJSON,
    GalleryItemToJSONTyped,
} from './GalleryItem';
import type { WallPost } from './WallPost';
import {
    WallPostFromJSON,
    WallPostFromJSONTyped,
    WallPostToJSON,
    WallPostToJSONTyped,
} from './WallPost';

/**
 * 
 * @export
 * @interface GetChatbotResponse
 */
export interface GetChatbotResponse {
    /**
     * 
     * @type {string}
     * @memberof GetChatbotResponse
     */
    displayName: string;
    /**
     * 
     * @type {string}
     * @memberof GetChatbotResponse
     */
    profilePicture: string;
    /**
     * 
     * @type {string}
     * @memberof GetChatbotResponse
     */
    fullBio: string;
    /**
     * 
     * @type {number}
     * @memberof GetChatbotResponse
     */
    characterAge: number;
    /**
     * 
     * @type {string}
     * @memberof GetChatbotResponse
     */
    profileVideo: string;
    /**
     * 
     * @type {Array<WallPost>}
     * @memberof GetChatbotResponse
     */
    posts: Array<WallPost>;
    /**
     * 
     * @type {Array<GalleryItem>}
     * @memberof GetChatbotResponse
     */
    galleries: Array<GalleryItem>;
    /**
     * 
     * @type {number}
     * @memberof GetChatbotResponse
     */
    unlockAllPrice: number;
}

/**
 * Check if a given object implements the GetChatbotResponse interface.
 */
export function instanceOfGetChatbotResponse(value: object): value is GetChatbotResponse {
    if (!('displayName' in value) || value['displayName'] === undefined) return false;
    if (!('profilePicture' in value) || value['profilePicture'] === undefined) return false;
    if (!('fullBio' in value) || value['fullBio'] === undefined) return false;
    if (!('characterAge' in value) || value['characterAge'] === undefined) return false;
    if (!('profileVideo' in value) || value['profileVideo'] === undefined) return false;
    if (!('posts' in value) || value['posts'] === undefined) return false;
    if (!('galleries' in value) || value['galleries'] === undefined) return false;
    if (!('unlockAllPrice' in value) || value['unlockAllPrice'] === undefined) return false;
    return true;
}

export function GetChatbotResponseFromJSON(json: any): GetChatbotResponse {
    return GetChatbotResponseFromJSONTyped(json, false);
}

export function GetChatbotResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetChatbotResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'displayName': json['display_name'],
        'profilePicture': json['profile_picture'],
        'fullBio': json['full_bio'],
        'characterAge': json['character_age'],
        'profileVideo': json['profile_video'],
        'posts': ((json['posts'] as Array<any>).map(WallPostFromJSON)),
        'galleries': ((json['galleries'] as Array<any>).map(GalleryItemFromJSON)),
        'unlockAllPrice': json['unlock_all_price'],
    };
}

export function GetChatbotResponseToJSON(json: any): GetChatbotResponse {
    return GetChatbotResponseToJSONTyped(json, false);
}

export function GetChatbotResponseToJSONTyped(value?: GetChatbotResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'display_name': value['displayName'],
        'profile_picture': value['profilePicture'],
        'full_bio': value['fullBio'],
        'character_age': value['characterAge'],
        'profile_video': value['profileVideo'],
        'posts': ((value['posts'] as Array<any>).map(WallPostToJSON)),
        'galleries': ((value['galleries'] as Array<any>).map(GalleryItemToJSON)),
        'unlock_all_price': value['unlockAllPrice'],
    };
}

