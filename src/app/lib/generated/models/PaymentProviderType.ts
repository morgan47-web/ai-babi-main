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
export const PaymentProviderType = {
    Unicorn: 'unicorn',
    Corpay: 'corpay',
    Patreon: 'patreon',
    Truevo: 'truevo'
} as const;
export type PaymentProviderType = typeof PaymentProviderType[keyof typeof PaymentProviderType];


export function instanceOfPaymentProviderType(value: any): boolean {
    for (const key in PaymentProviderType) {
        if (Object.prototype.hasOwnProperty.call(PaymentProviderType, key)) {
            if (PaymentProviderType[key as keyof typeof PaymentProviderType] === value) {
                return true;
            }
        }
    }
    return false;
}

export function PaymentProviderTypeFromJSON(json: any): PaymentProviderType {
    return PaymentProviderTypeFromJSONTyped(json, false);
}

export function PaymentProviderTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaymentProviderType {
    return json as PaymentProviderType;
}

export function PaymentProviderTypeToJSON(value?: PaymentProviderType | null): any {
    return value as any;
}

export function PaymentProviderTypeToJSONTyped(value: any, ignoreDiscriminator: boolean): PaymentProviderType {
    return value as PaymentProviderType;
}

