'use client';
import clsx from 'clsx';
import { useState } from 'react';
import type { Job } from '../../lib/job';
import { applyToJob, dismissJob } from '../actions';
import { PayRateView } from './PayRateView';
import { SourceIcon } from './SourceIcon';

enum JobState {
    Default = 0,
    Dismissing = 1,
    Dismissed = 2,
}

const JobRow = ({ job, onRemove }: { job: Job; onRemove: (job: Job) => void }) => {
    const [jobState, setJobState] = useState(JobState.Default);

    return (
        <div
            className={clsx(
                'flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70',
                {
                    'opacity-50': jobState === JobState.Dismissing,
                    'opacity-10': jobState === JobState.Dismissed,
                },
            )}
        >
            <div
                className={clsx('flex gap-5', {
                    'opacity-50': jobState === JobState.Dismissing,
                    'opacity-10': jobState === JobState.Dismissed,
                })}
            >
                <div className="shrink-0">
                    <div className="flex flex-col items-start gap-2">
                        <PayRateView job={job} />
                        <div className="flex gap-3">
                            <button
                                className="flex items-center"
                                onClick={() => {
                                    setJobState(JobState.Dismissing);

                                    applyToJob(job)
                                        .then(() => {
                                            setJobState(JobState.Dismissed);
                                            onRemove(job);
                                        })
                                        .catch(error => {
                                            throw error;
                                        });
                                }}
                            >
                                <img src="/apply.svg" alt="apply" />
                            </button>
                            <button
                                className="flex items-center"
                                onClick={() => {
                                    setJobState(JobState.Dismissing);

                                    dismissJob(job)
                                        .then(() => {
                                            setJobState(JobState.Dismissed);
                                            onRemove(job);
                                        })
                                        .catch(error => {
                                            throw error;
                                        });
                                }}
                            >
                                <img src="/dismiss.svg" alt="dismiss" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start gap-2">
                    <div className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-white">
                        <SourceIcon source={job.source} />
                        <a href={job.url} target="_blank">
                            {job.title}
                        </a>
                    </div>
                    <div
                        className="text-gray-500 dark:text-neutral-400"
                        dangerouslySetInnerHTML={{ __html: job.description }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default JobRow;
