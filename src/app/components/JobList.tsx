'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { Job } from '../../lib/job';
import { findJobsForBoard } from '../actions';
import JobCard from './JobCard';

export const JobList = ({ jobs: incomingJobs }: { jobs: Job[] }) => {
    const [allJobs, setAllJobs] = useState(incomingJobs);
    const [contractOnly, setContractOnly] = useState(false);

    const updateId = useRef(0);

    const canNotify = useRef(false);
    const isDocumentVisible = useRef(true);

    const currentNotification = useRef<Notification | undefined>(undefined);

    useEffect(() => {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission().then(result => {
                canNotify.current = result === 'granted';
            });
        }
    });

    useEffect(() => {
        document.addEventListener('visibilitychange', () => {
            isDocumentVisible.current = document.visibilityState === 'visible';
            if (isDocumentVisible.current) {
                //The tab has become visible so clear the now-stale Notification.
                currentNotification.current?.close();
                currentNotification.current = undefined;
            }
        });
    }, []);

    useEffect(() => {
        if (canNotify.current && !isDocumentVisible.current) {
            const notification = new Notification('New jobs!');
            currentNotification.current = notification;
        }
        document.body.title = allJobs.length ? `(${allJobs.length}) Job Hunter Web Next` : 'Job Hunter Web Next';
    }, [allJobs.length]);

    useEffect(() => {
        let mounted = true;

        function refresh() {
            const currentUpdateId = Date.now();
            updateId.current = currentUpdateId;

            if (mounted) {
                findJobsForBoard()
                    .then(jobs => {
                        if (updateId.current === currentUpdateId) {
                            setAllJobs(jobs);
                        }
                    })
                    .catch(error => {
                        throw error;
                    })
                    .finally(() => {
                        setTimeout(refresh, 10_000);
                    });
            }
        }
        const refreshHandle = setTimeout(refresh, 10_000);

        return () => {
            mounted = false;
            clearTimeout(refreshHandle);
        };
    }, []);

    const sources = Array.from(new Set(allJobs.map(job => job.source)));

    const sourceStats = new Map(sources.map(source => [source, 0]));

    for (const job of allJobs) {
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        sourceStats.set(job.source, sourceStats.get(job.source)! + 1);
    }

    const [selectedSource, setSelectedSource] = useState('');

    const jobs =
        contractOnly || selectedSource
            ? allJobs.filter(job => {
                  let result = true;

                  if (contractOnly) {
                      result = job.pay_rate.type === 'daily';
                  }

                  if (selectedSource) {
                      result = result && job.source === selectedSource;
                  }

                  return result;
              })
            : allJobs;

    return (
        <>
            <header className="fixed flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 dark:bg-neutral-800">
                <nav className="w-full mx-auto px-4 md:px-6 lg:px-8" aria-label="Global">
                    <div className="relative sm:flex sm:items-center">
                        <div className="flex grow items-center gap-4">
                            <a className="flex-none text-xl font-semibold dark:text-white" href="#">
                                Job Hunter
                            </a>
                            <Image
                                className="relative dark:invert"
                                src="/next.svg"
                                alt="Next.js Logo"
                                width={45}
                                height={9.25}
                                priority
                            />
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
                            <div>
                                <select
                                    value={selectedSource}
                                    onChange={event => {
                                        setSelectedSource(event.target.value);
                                    }}
                                    className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                >
                                    <option value="">Source</option>
                                    {sources.map(value => (
                                        <option key={value} value={value}>
                                            {value} ({sourceStats.get(value)})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>New jobs: {jobs.length}</div>
                    </div>
                </nav>
            </header>
            <main className="flex flex-col gap-5 p-8 pt-24">
                {jobs.map(job => (
                    <JobCard
                        key={job._id as unknown as string}
                        job={job}
                        onRemove={job => {
                            updateId.current = 0;
                            setAllJobs(allJobs.filter(current => current !== job));
                        }}
                    />
                ))}
            </main>
        </>
    );
};
