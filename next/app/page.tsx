"use client";

import PrimaryButton from "@/app/_components/PrimaryButton";
import ImagesGrid from "@/app/_components/ImagesGrid";

export default function Page() {
    return (
        <div className="w-full flex flex-col gap-5">
            <div className="flex flex-col items-center gap-10">
                <h1 className="text-8xl text-grey-0 font-black">WEB PLATE</h1>
                <PrimaryButton onClick={() => {}}>
                    Let&rsquo;s Start
                </PrimaryButton>
            </div>
            <ImagesGrid />
        </div>
    );
}
