export type Currency = 'GBP' | 'USD' | 'EUR';

export interface HourlyRate {
    type: 'hourly';
    min: number;
    max: number;
    currency: Currency;
}

export interface DailyRate {
    type: 'daily';
    min: number;
    max: number;
    currency: Currency;
}

export interface YearlyRate {
    type: 'yearly';
    min: number;
    max: number;
    currency: Currency;
}

export interface UnknownRate {
    type: 'unknown';
}

export type PayRate = UnknownRate | HourlyRate | DailyRate | YearlyRate;
