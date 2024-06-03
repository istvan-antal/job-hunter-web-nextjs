import { findJobsForBoard } from './actions';
import { JobList } from './job-list';

export default async function Home() {
    const jobs = await findJobsForBoard();

    return <JobList jobs={jobs} />;
}
