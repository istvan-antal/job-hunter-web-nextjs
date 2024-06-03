import Image from 'next/image';

export default function Loading() {
    return (
        <div className="flex min-h-screen justify-center items-center">
            <Image className="" src="/loading.svg" alt="Loading..." width={100} height={100} priority />
        </div>
    );
}
