'use client';
import Image from 'next/image';
import { useState } from 'react';
import type { Job } from '../../lib/job';
import JobCard from './JobCard';

export const JobList = ({ jobs: incomingJobs }: { jobs: Job[] }) => {
    const [jobs, setJobs] = useState(incomingJobs);
    console.log('jobs', jobs.length);
    return (
        <>
            <div className="fixed top-5 right-5 backdrop-blur">New jobs: {jobs.length}</div>
            <main className="flex flex-col gap-5 p-8">
                {jobs.map(job => (
                    <JobCard
                        key={job._id as unknown as string}
                        job={job}
                        onRemove={job => {
                            console.log('onRemove', job);
                            setJobs(jobs.filter(current => current !== job));
                        }}
                    />
                ))}
                <Image
                    className="relative dark:invert"
                    src="/next.svg"
                    alt="Next.js Logo"
                    width={90}
                    height={18.5}
                    priority
                />
            </main>
        </>
    );
};
