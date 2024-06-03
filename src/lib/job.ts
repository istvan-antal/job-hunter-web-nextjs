import type { ObjectId } from 'mongodb';
import { type PayRate } from './pay-rate';

export interface Job {
    _id: ObjectId;
    source: string;
    title: string;
    description: string;
    salary_text: string;
    pay_rate: PayRate;
    posted: string;
    url: string;
    location: string;
    updated: Date;
    created: Date;
}
