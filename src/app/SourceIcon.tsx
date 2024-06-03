'use client';
export const SourceIcon = ({ source }: { source: string }) => {
    switch (source) {
        case 'linkedin':
            return <img src="/sources/linkedin.svg" alt="Linkedin" width={24} height={24} />;
        case 'upwork':
            return <img src="/sources/upwork.svg" alt="UpWork" width={24} height={24} />;
        default:
            return (
                <div className="size-[24px] flex items-center overflow-hidden bg-sky-400 rounded-md border-2 border-blue-700 b">
                    {source}
                </div>
            );
    }
};
