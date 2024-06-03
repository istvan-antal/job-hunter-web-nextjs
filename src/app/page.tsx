import { MongoClient } from 'mongodb';
import type { Job } from '../lib/job';
import { JobList } from './job-list';

export default async function Home() {
    // TODO: remove repetition
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    await client.connect();

    const db = client.db('job_hunter');
    const collection = db.collection('jobs');

    const jobs = (
        await collection.find({ hidden: { $not: { $eq: true } } }, { sort: [['created', 'desc']] }).toArray()
    ).map(item => ({
        ...item,
        _id: item._id.toJSON(),
    })) as unknown as Job[];

    return <JobList jobs={jobs} />;
}
