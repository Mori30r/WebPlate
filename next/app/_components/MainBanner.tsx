import React from "react";
import Bowl1 from "@/public/images/bowl1.png";
import Bowl2 from "@/public/images/bowl2.png";
import PrimaryButton from "./PrimaryButton";
import Image from "next/image";

function MainBanner() {
    return (
        <div className="max-h-[300px]">
            <div className="bg-myRed rounded-2xl flex flex-col gap-4 justify-center items-center relative py-6  ">
                <div className="text-center text-3xl font-bold">
                    ENJOY OUR SERVICE <br /> In 80 AREAS
                </div>
                <PrimaryButton paddingX="px-10" href="/dashboard">
                    Choose Your City
                </PrimaryButton>
                <Image
                    className="absolute right-0 -top-14"
                    src={Bowl1}
                    width={230}
                    alt="salad"
                />
                <Image
                    className="absolute left-10 bottom-0"
                    src={Bowl2}
                    width={120}
                    alt="salad"
                />
            </div>
        </div>
    );
}

export default MainBanner;
