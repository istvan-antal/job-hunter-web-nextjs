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
