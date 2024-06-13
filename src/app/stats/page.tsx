import { fetchStats } from '../actions';

export default async function StatsPage() {
    const appliedSeries = await fetchStats();
    return (
        <div>
            {appliedSeries.map(item => (
                <div key={item.date}>
                    {item.date} {item.count}
                </div>
            ))}
        </div>
    );
}
