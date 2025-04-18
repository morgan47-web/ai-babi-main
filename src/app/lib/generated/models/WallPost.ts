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
import type { ContentType } from './ContentType';
import {
    ContentTypeFromJSON,
    ContentTypeFromJSONTyped,
    ContentTypeToJSON,
    ContentTypeToJSONTyped,
} from './ContentType';

/**
 * 
 * @export
 * @interface WallPost
 */
export interface WallPost {
    /**
     * 
     * @type {string}
     * @memberof WallPost
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof WallPost
     */
    chatbotId: string;
    /**
     * 
     * @type {string}
     * @memberof WallPost
     */
    chatbotName: string;
    /**
     * 
     * @type {string}
     * @memberof WallPost
     */
    chatbotProfilePicture: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof WallPost
     */
    pictures: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof WallPost
     */
    videos: Array<string>;
    /**
     * 
     * @type {number}
     * @memberof WallPost
     */
    likes: number;
    /**
     * 
     * @type {string}
     * @memberof WallPost
     */
    description: string;
    /**
     * 
     * @type {Date}
     * @memberof WallPost
     */
    createdAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof WallPost
     */
    updatedAt: Date;
    /**
     * 
     * @type {boolean}
     * @memberof WallPost
     */
    unlocked: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof WallPost
     */
    liked: boolean;
    /**
     * 
     * @type {ContentType}
     * @memberof WallPost
     */
    type: ContentType;
    /**
     * 
     * @type {number}
     * @memberof WallPost
     */
    price?: number | null;
}



/**
 * Check if a given object implements the WallPost interface.
 */
export function instanceOfWallPost(value: object): value is WallPost {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('chatbotId' in value) || value['chatbotId'] === undefined) return false;
    if (!('chatbotName' in value) || value['chatbotName'] === undefined) return false;
    if (!('chatbotProfilePicture' in value) || value['chatbotProfilePicture'] === undefined) return false;
    if (!('pictures' in value) || value['pictures'] === undefined) return false;
    if (!('videos' in value) || value['videos'] === undefined) return false;
    if (!('likes' in value) || value['likes'] === undefined) return false;
    if (!('description' in value) || value['description'] === undefined) return false;
    if (!('createdAt' in value) || value['createdAt'] === undefined) return false;
    if (!('updatedAt' in value) || value['updatedAt'] === undefined) return false;
    if (!('unlocked' in value) || value['unlocked'] === undefined) return false;
    if (!('liked' in value) || value['liked'] === undefined) return false;
    if (!('type' in value) || value['type'] === undefined) return false;
    return true;
}

export function WallPostFromJSON(json: any): WallPost {
    return WallPostFromJSONTyped(json, false);
}

export function WallPostFromJSONTyped(json: any, ignoreDiscriminator: boolean): WallPost {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'chatbotId': json['chatbot_id'],
        'chatbotName': json['chatbot_name'],
        'chatbotProfilePicture': json['chatbot_profile_picture'],
        'pictures': json['pictures'],
        'videos': json['videos'],
        'likes': json['likes'],
        'description': json['description'],
        'createdAt': (new Date(json['created_at'])),
        'updatedAt': (new Date(json['updated_at'])),
        'unlocked': json['unlocked'],
        'liked': json['liked'],
        'type': ContentTypeFromJSON(json['type']),
        'price': json['price'] == null ? undefined : json['price'],
    };
}

export function WallPostToJSON(json: any): WallPost {
    return WallPostToJSONTyped(json, false);
}

export function WallPostToJSONTyped(value?: WallPost | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'chatbot_id': value['chatbotId'],
        'chatbot_name': value['chatbotName'],
        'chatbot_profile_picture': value['chatbotProfilePicture'],
        'pictures': value['pictures'],
        'videos': value['videos'],
        'likes': value['likes'],
        'description': value['description'],
        'created_at': ((value['createdAt']).toISOString()),
        'updated_at': ((value['updatedAt']).toISOString()),
        'unlocked': value['unlocked'],
        'liked': value['liked'],
        'type': ContentTypeToJSON(value['type']),
        'price': value['price'],
    };
}

