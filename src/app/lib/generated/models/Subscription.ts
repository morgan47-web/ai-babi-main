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
import type { BillingPeriod } from './BillingPeriod';
import {
    BillingPeriodFromJSON,
    BillingPeriodFromJSONTyped,
    BillingPeriodToJSON,
    BillingPeriodToJSONTyped,
} from './BillingPeriod';
import type { SubscriptionStatus } from './SubscriptionStatus';
import {
    SubscriptionStatusFromJSON,
    SubscriptionStatusFromJSONTyped,
    SubscriptionStatusToJSON,
    SubscriptionStatusToJSONTyped,
} from './SubscriptionStatus';
import type { SubscriptionModel } from './SubscriptionModel';
import {
    SubscriptionModelFromJSON,
    SubscriptionModelFromJSONTyped,
    SubscriptionModelToJSON,
    SubscriptionModelToJSONTyped,
} from './SubscriptionModel';
import type { PaymentProviderType } from './PaymentProviderType';
import {
    PaymentProviderTypeFromJSON,
    PaymentProviderTypeFromJSONTyped,
    PaymentProviderTypeToJSON,
    PaymentProviderTypeToJSONTyped,
} from './PaymentProviderType';

/**
 * 
 * @export
 * @interface Subscription
 */
export interface Subscription {
    /**
     * 
     * @type {Date}
     * @memberof Subscription
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof Subscription
     */
    updatedAt?: Date;
    /**
     * 
     * @type {string}
     * @memberof Subscription
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof Subscription
     */
    userId: string;
    /**
     * 
     * @type {string}
     * @memberof Subscription
     */
    externalId: string;
    /**
     * 
     * @type {SubscriptionStatus}
     * @memberof Subscription
     */
    status: SubscriptionStatus;
    /**
     * 
     * @type {number}
     * @memberof Subscription
     */
    tokens: number;
    /**
     * 
     * @type {Date}
     * @memberof Subscription
     */
    termEnd?: Date;
    /**
     * 
     * @type {number}
     * @memberof Subscription
     */
    price?: number;
    /**
     * 
     * @type {BillingPeriod}
     * @memberof Subscription
     */
    billingPeriod?: BillingPeriod;
    /**
     * 
     * @type {string}
     * @memberof Subscription
     */
    currency: string;
    /**
     * 
     * @type {PaymentProviderType}
     * @memberof Subscription
     */
    psp: PaymentProviderType;
}



/**
 * Check if a given object implements the Subscription interface.
 */
export function instanceOfSubscription(value: object): value is Subscription {
    if (!('userId' in value) || value['userId'] === undefined) return false;
    if (!('externalId' in value) || value['externalId'] === undefined) return false;
    if (!('status' in value) || value['status'] === undefined) return false;
    if (!('tokens' in value) || value['tokens'] === undefined) return false;
    if (!('currency' in value) || value['currency'] === undefined) return false;
    if (!('psp' in value) || value['psp'] === undefined) return false;
    return true;
}

export function SubscriptionFromJSON(json: any): Subscription {
    return SubscriptionFromJSONTyped(json, false);
}

export function SubscriptionFromJSONTyped(json: any, ignoreDiscriminator: boolean): Subscription {
    if (json == null) {
        return json;
    }
    return {
        
        'createdAt': json['created_at'] == null ? undefined : (new Date(json['created_at'])),
        'updatedAt': json['updated_at'] == null ? undefined : (new Date(json['updated_at'])),
        'id': json['id'] == null ? undefined : json['id'],
        'userId': json['user_id'],
        'externalId': json['external_id'],
        'status': SubscriptionStatusFromJSON(json['status']),
        'tokens': json['tokens'],
        'termEnd': json['term_end'] == null ? undefined : (new Date(json['term_end'])),
        'price': json['price'] == null ? undefined : json['price'],
        'billingPeriod': json['billing_period'] == null ? undefined : BillingPeriodFromJSON(json['billing_period']),
        'currency': json['currency'],
        'psp': PaymentProviderTypeFromJSON(json['psp']),
    };
}

export function SubscriptionToJSON(json: any): Subscription {
    return SubscriptionToJSONTyped(json, false);
}

export function SubscriptionToJSONTyped(value?: Subscription | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'created_at': value['createdAt'] == null ? undefined : ((value['createdAt']).toISOString()),
        'updated_at': value['updatedAt'] == null ? undefined : ((value['updatedAt']).toISOString()),
        'id': value['id'],
        'user_id': value['userId'],
        'external_id': value['externalId'],
        'status': SubscriptionStatusToJSON(value['status']),
        'tokens': value['tokens'],
        'term_end': value['termEnd'] == null ? undefined : ((value['termEnd']).toISOString()),
        'price': value['price'],
        'billing_period': BillingPeriodToJSON(value['billingPeriod']),
        'currency': value['currency'],
        'psp': PaymentProviderTypeToJSON(value['psp']),
    };
}

