import type { Job } from '../../lib/job';
import type { Currency } from '../../lib/pay-rate';

const currencySymbols = new Map<Currency, string>([
    ['GBP', '£'],
    ['USD', '$'],
    ['EUR', '€'],
]);

export const PayRateView = ({ job }: { job: Job }) => {
    switch (job.pay_rate.type) {
        case 'hourly':
            return (
                <>
                    {currencySymbols.get(job.pay_rate.currency)}
                    {job.pay_rate.max} / hour
                </>
            );
        case 'daily':
            return (
                <>
                    {currencySymbols.get(job.pay_rate.currency)}
                    {job.pay_rate.max} / day
                </>
            );
        case 'yearly':
            return (
                <>
                    {currencySymbols.get(job.pay_rate.currency)}
                    {job.pay_rate.max} / year
                </>
            );
        default:
            return (
                <div className="max-w-36 overflow-hidden whitespace-nowrap text-ellipsis" title={job.salary_text}>
                    {job.salary_text || 'unknown'}
                </div>
            );
    }
};
