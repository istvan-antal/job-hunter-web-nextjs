'use client';
export const ElapsedTime = ({ time }: { time: Date }) => {
    const hoursElapsed = (Date.now() - time.getTime()) / 1000 / 3600;

    if (hoursElapsed < 1) {
        return <div>less than an hour</div>;
    }

    if (hoursElapsed > 24) {
        return <div>{Math.round(hoursElapsed / 24)} days ago</div>;
    }

    return <div>{Math.round(hoursElapsed)} hours ago</div>;
};
