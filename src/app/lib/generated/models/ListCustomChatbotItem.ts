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
import type { FantasyRace } from './FantasyRace';
import {
    FantasyRaceFromJSON,
    FantasyRaceFromJSONTyped,
    FantasyRaceToJSON,
    FantasyRaceToJSONTyped,
} from './FantasyRace';
import type { Occupation } from './Occupation';
import {
    OccupationFromJSON,
    OccupationFromJSONTyped,
    OccupationToJSON,
    OccupationToJSONTyped,
} from './Occupation';
import type { Ethnicity } from './Ethnicity';
import {
    EthnicityFromJSON,
    EthnicityFromJSONTyped,
    EthnicityToJSON,
    EthnicityToJSONTyped,
} from './Ethnicity';
import type { EyeColor } from './EyeColor';
import {
    EyeColorFromJSON,
    EyeColorFromJSONTyped,
    EyeColorToJSON,
    EyeColorToJSONTyped,
} from './EyeColor';
import type { ButtSize } from './ButtSize';
import {
    ButtSizeFromJSON,
    ButtSizeFromJSONTyped,
    ButtSizeToJSON,
    ButtSizeToJSONTyped,
} from './ButtSize';
import type { BodyType } from './BodyType';
import {
    BodyTypeFromJSON,
    BodyTypeFromJSONTyped,
    BodyTypeToJSON,
    BodyTypeToJSONTyped,
} from './BodyType';
import type { BreastSize } from './BreastSize';
import {
    BreastSizeFromJSON,
    BreastSizeFromJSONTyped,
    BreastSizeToJSON,
    BreastSizeToJSONTyped,
} from './BreastSize';
import type { HairColor } from './HairColor';
import {
    HairColorFromJSON,
    HairColorFromJSONTyped,
    HairColorToJSON,
    HairColorToJSONTyped,
} from './HairColor';
import type { RelationshipStatus } from './RelationshipStatus';
import {
    RelationshipStatusFromJSON,
    RelationshipStatusFromJSONTyped,
    RelationshipStatusToJSON,
    RelationshipStatusToJSONTyped,
} from './RelationshipStatus';
import type { HairStyle } from './HairStyle';
import {
    HairStyleFromJSON,
    HairStyleFromJSONTyped,
    HairStyleToJSON,
    HairStyleToJSONTyped,
} from './HairStyle';

/**
 * 
 * @export
 * @interface ListCustomChatbotItem
 */
export interface ListCustomChatbotItem {
    /**
     * 
     * @type {string}
     * @memberof ListCustomChatbotItem
     */
    displayName: string;
    /**
     * 
     * @type {string}
     * @memberof ListCustomChatbotItem
     */
    profilePicture: string;
    /**
     * 
     * @type {string}
     * @memberof ListCustomChatbotItem
     */
    fullBio: string;
    /**
     * 
     * @type {number}
     * @memberof ListCustomChatbotItem
     */
    characterAge: number;
    /**
     * 
     * @type {Ethnicity}
     * @memberof ListCustomChatbotItem
     */
    ethnicity?: Ethnicity | null;
    /**
     * 
     * @type {FantasyRace}
     * @memberof ListCustomChatbotItem
     */
    fantasyRace?: FantasyRace | null;
    /**
     * 
     * @type {BodyType}
     * @memberof ListCustomChatbotItem
     */
    bodyType: BodyType;
    /**
     * 
     * @type {EyeColor}
     * @memberof ListCustomChatbotItem
     */
    eyeColor: EyeColor;
    /**
     * 
     * @type {HairStyle}
     * @memberof ListCustomChatbotItem
     */
    hairStyle: HairStyle;
    /**
     * 
     * @type {HairColor}
     * @memberof ListCustomChatbotItem
     */
    hairColor: HairColor;
    /**
     * 
     * @type {BreastSize}
     * @memberof ListCustomChatbotItem
     */
    breastSize: BreastSize;
    /**
     * 
     * @type {ButtSize}
     * @memberof ListCustomChatbotItem
     */
    buttSize: ButtSize;
    /**
     * 
     * @type {Occupation}
     * @memberof ListCustomChatbotItem
     */
    occupation?: Occupation | null;
    /**
     * 
     * @type {RelationshipStatus}
     * @memberof ListCustomChatbotItem
     */
    relationshipStatus: RelationshipStatus;
    /**
     * 
     * @type {string}
     * @memberof ListCustomChatbotItem
     */
    ownerUserId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ListCustomChatbotItem
     */
    id: string;
}



/**
 * Check if a given object implements the ListCustomChatbotItem interface.
 */
export function instanceOfListCustomChatbotItem(value: object): value is ListCustomChatbotItem {
    if (!('displayName' in value) || value['displayName'] === undefined) return false;
    if (!('profilePicture' in value) || value['profilePicture'] === undefined) return false;
    if (!('fullBio' in value) || value['fullBio'] === undefined) return false;
    if (!('characterAge' in value) || value['characterAge'] === undefined) return false;
    if (!('bodyType' in value) || value['bodyType'] === undefined) return false;
    if (!('eyeColor' in value) || value['eyeColor'] === undefined) return false;
    if (!('hairStyle' in value) || value['hairStyle'] === undefined) return false;
    if (!('hairColor' in value) || value['hairColor'] === undefined) return false;
    if (!('breastSize' in value) || value['breastSize'] === undefined) return false;
    if (!('buttSize' in value) || value['buttSize'] === undefined) return false;
    if (!('relationshipStatus' in value) || value['relationshipStatus'] === undefined) return false;
    if (!('id' in value) || value['id'] === undefined) return false;
    return true;
}

export function ListCustomChatbotItemFromJSON(json: any): ListCustomChatbotItem {
    return ListCustomChatbotItemFromJSONTyped(json, false);
}

export function ListCustomChatbotItemFromJSONTyped(json: any, ignoreDiscriminator: boolean): ListCustomChatbotItem {
    if (json == null) {
        return json;
    }
    return {
        
        'displayName': json['display_name'],
        'profilePicture': json['profile_picture'],
        'fullBio': json['full_bio'],
        'characterAge': json['character_age'],
        'ethnicity': json['ethnicity'] == null ? undefined : EthnicityFromJSON(json['ethnicity']),
        'fantasyRace': json['fantasy_race'] == null ? undefined : FantasyRaceFromJSON(json['fantasy_race']),
        'bodyType': BodyTypeFromJSON(json['body_type']),
        'eyeColor': EyeColorFromJSON(json['eye_color']),
        'hairStyle': HairStyleFromJSON(json['hair_style']),
        'hairColor': HairColorFromJSON(json['hair_color']),
        'breastSize': BreastSizeFromJSON(json['breast_size']),
        'buttSize': ButtSizeFromJSON(json['butt_size']),
        'occupation': json['occupation'] == null ? undefined : OccupationFromJSON(json['occupation']),
        'relationshipStatus': RelationshipStatusFromJSON(json['relationship_status']),
        'ownerUserId': json['owner_user_id'] == null ? undefined : json['owner_user_id'],
        'id': json['id'],
    };
}

export function ListCustomChatbotItemToJSON(json: any): ListCustomChatbotItem {
    return ListCustomChatbotItemToJSONTyped(json, false);
}

export function ListCustomChatbotItemToJSONTyped(value?: ListCustomChatbotItem | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'display_name': value['displayName'],
        'profile_picture': value['profilePicture'],
        'full_bio': value['fullBio'],
        'character_age': value['characterAge'],
        'ethnicity': EthnicityToJSON(value['ethnicity']),
        'fantasy_race': FantasyRaceToJSON(value['fantasyRace']),
        'body_type': BodyTypeToJSON(value['bodyType']),
        'eye_color': EyeColorToJSON(value['eyeColor']),
        'hair_style': HairStyleToJSON(value['hairStyle']),
        'hair_color': HairColorToJSON(value['hairColor']),
        'breast_size': BreastSizeToJSON(value['breastSize']),
        'butt_size': ButtSizeToJSON(value['buttSize']),
        'occupation': OccupationToJSON(value['occupation']),
        'relationship_status': RelationshipStatusToJSON(value['relationshipStatus']),
        'owner_user_id': value['ownerUserId'],
        'id': value['id'],
    };
}

