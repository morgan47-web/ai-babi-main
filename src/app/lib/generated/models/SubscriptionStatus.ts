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
export const SubscriptionStatus = {
    Inactive: 'inactive',
    Active: 'active',
    Trial: 'trial',
    Canceled: 'canceled'
} as const;
export type SubscriptionStatus = typeof SubscriptionStatus[keyof typeof SubscriptionStatus];


export function instanceOfSubscriptionStatus(value: any): boolean {
    for (const key in SubscriptionStatus) {
        if (Object.prototype.hasOwnProperty.call(SubscriptionStatus, key)) {
            if (SubscriptionStatus[key as keyof typeof SubscriptionStatus] === value) {
                return true;
            }
        }
    }
    return false;
}

export function SubscriptionStatusFromJSON(json: any): SubscriptionStatus {
    return SubscriptionStatusFromJSONTyped(json, false);
}

export function SubscriptionStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): SubscriptionStatus {
    return json as SubscriptionStatus;
}

export function SubscriptionStatusToJSON(value?: SubscriptionStatus | null): any {
    return value as any;
}

export function SubscriptionStatusToJSONTyped(value: any, ignoreDiscriminator: boolean): SubscriptionStatus {
    return value as SubscriptionStatus;
}

