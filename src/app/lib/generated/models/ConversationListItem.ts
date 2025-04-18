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
 * @interface ConversationListItem
 */
export interface ConversationListItem {
    /**
     * 
     * @type {string}
     * @memberof ConversationListItem
     */
    chatbotId: string;
    /**
     * 
     * @type {string}
     * @memberof ConversationListItem
     */
    profilePicture: string;
    /**
     * 
     * @type {string}
     * @memberof ConversationListItem
     */
    displayName: string;
    /**
     * 
     * @type {string}
     * @memberof ConversationListItem
     */
    lastMessage: string;
    /**
     * 
     * @type {boolean}
     * @memberof ConversationListItem
     */
    unread: boolean;
}

/**
 * Check if a given object implements the ConversationListItem interface.
 */
export function instanceOfConversationListItem(value: object): value is ConversationListItem {
    if (!('chatbotId' in value) || value['chatbotId'] === undefined) return false;
    if (!('profilePicture' in value) || value['profilePicture'] === undefined) return false;
    if (!('displayName' in value) || value['displayName'] === undefined) return false;
    if (!('lastMessage' in value) || value['lastMessage'] === undefined) return false;
    if (!('unread' in value) || value['unread'] === undefined) return false;
    return true;
}

export function ConversationListItemFromJSON(json: any): ConversationListItem {
    return ConversationListItemFromJSONTyped(json, false);
}

export function ConversationListItemFromJSONTyped(json: any, ignoreDiscriminator: boolean): ConversationListItem {
    if (json == null) {
        return json;
    }
    return {
        
        'chatbotId': json['chatbot_id'],
        'profilePicture': json['profile_picture'],
        'displayName': json['display_name'],
        'lastMessage': json['last_message'],
        'unread': json['unread'],
    };
}

export function ConversationListItemToJSON(json: any): ConversationListItem {
    return ConversationListItemToJSONTyped(json, false);
}

export function ConversationListItemToJSONTyped(value?: ConversationListItem | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'chatbot_id': value['chatbotId'],
        'profile_picture': value['profilePicture'],
        'display_name': value['displayName'],
        'last_message': value['lastMessage'],
        'unread': value['unread'],
    };
}

