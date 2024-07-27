import PrimaryButton from "@/app/_components/PrimaryButton";
import ImagesGrid from "@/app/_components/ImagesGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Welcome to WebPlate",
    description: "Order WebPlate Food Fast and Easy",
};

export default function Page() {
    return (
        <div className="w-full flex flex-col py-5 gap-5">
            <div className="flex flex-col items-center gap-3">
                <h1 className="text-8xl text-grey-0 font-black">WEB PLATE</h1>
                <PrimaryButton href="/dashboard/home">
                    Let&rsquo;s Start
                </PrimaryButton>
            </div>
            <ImagesGrid />
        </div>
    );
}
