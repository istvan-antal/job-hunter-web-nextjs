import { findJobsForBoard } from './actions';
import { JobList } from './components/JobList';

export default async function Home() {
    const jobs = await findJobsForBoard();

    return <JobList jobs={jobs} />;
}
