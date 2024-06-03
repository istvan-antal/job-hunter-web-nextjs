'use client';
import Image from 'next/image';
import { useState } from 'react';
import type { Job } from '../../lib/job';
import JobCard from './JobCard';

export const JobList = ({ jobs: incomingJobs }: { jobs: Job[] }) => {
    const [allJobs, setJobs] = useState(incomingJobs);
    const [contractOnly, setContractOnly] = useState(false);

    const jobs = contractOnly ? allJobs.filter(job => job.pay_rate.type === 'daily') : allJobs;

    return (
        <>
            <header className="fixed flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 dark:bg-neutral-800">
                <nav className="w-full mx-auto px-4 md:px-6 lg:px-8" aria-label="Global">
                    <div className="relative sm:flex sm:items-center">
                        <div className="flex grow items-center gap-4">
                            <a className="flex-none text-xl font-semibold dark:text-white" href="#">
                                Job Hunter
                            </a>
                            <div className="flex">
                                <input
                                    type="checkbox"
                                    className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                    id="hs-default-checkbox"
                                    checked={contractOnly}
                                    onChange={() => {
                                        setContractOnly(value => !value);
                                    }}
                                />
                                <label
                                    htmlFor="hs-default-checkbox"
                                    className="text-sm text-gray-500 ms-3 dark:text-neutral-400"
                                >
                                    Contract only
                                </label>
                            </div>
                        </div>
                        <div>New jobs: {jobs.length}</div>
                    </div>
                </nav>
            </header>
            <main className="flex flex-col gap-5 p-8 pt-20">
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
