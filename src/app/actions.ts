'use server';
import { MongoClient, ObjectId } from 'mongodb';
import type { Job } from '../lib/job';

const connectToDatabase = async () => {
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db('job_hunter');
    return db;
};

export async function findJobsForBoard() {
    const collection = (await connectToDatabase()).collection('jobs');

    return (await collection.find({ hidden: { $not: { $eq: true } } }, { sort: [['created', 'desc']] }).toArray()).map(
        item => ({
            ...item,
            _id: item._id.toJSON(),
        }),
    ) as unknown as Job[];
}

export async function dismissJob(job: Job) {
    const collection = (await connectToDatabase()).collection('jobs');

    await collection.updateOne(
        { _id: new ObjectId(job._id) },
        { $set: { dismissed: true, hidden: true, updated: new Date() } },
    );
}

export async function applyToJob(job: Job) {
    const collection = (await connectToDatabase()).collection('jobs');

    await collection.updateOne(
        { _id: new ObjectId(job._id) },
        { $set: { applied: true, hidden: true, updated: new Date() } },
    );
}

export async function fetchStats() {
    const collection = (await connectToDatabase()).collection('jobs');

    const result = (
        await (
            await collection.aggregate([
                {
                    $match: {
                        applied: {
                            $eq: true,
                        },
                    },
                },
                {
                    $group: {
                        _id: {
                            $dateToString: { format: '%Y-%m-%d', date: '$updated' },
                        },
                        count: {
                            $count: {},
                        },
                    },
                },
                {
                    $sort: {
                        _id: 1,
                    },
                },
            ])
        ).toArray()
    ).map(item => ({
        date: item._id,
        count: item.count,
    }));

    return result;
}
