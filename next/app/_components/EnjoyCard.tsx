import React from "react";
import Image, { StaticImageData } from "next/image";
import Image1 from "@/public/images/7.jpg";
import Image2 from "@/public/images/4.jpg";
import Salad from "@/public/images/salad.png";

function EnjoyCard() {
    return (
        <>
            <Image
                src={Image1}
                className="absolute top-0 left-0 translate-x-[50%] translate-y-[8%] h-[350px] w-[350px] rounded-3xl rotate-[-5deg]"
                alt="hey"
            />
            <Image
                src={Image2}
                className="absolute top-0 left-0 h-[350px] w-[350px] rounded-3xl translate-x-[50%] translate-y-[23%] rotate-[5deg]"
                alt="hey"
            />
            <div className="absolute top-0 left-0 bg-gradient-to-r from-myRed to-rose-600 h-[350px] w-[350px] rounded-3xl translate-x-[50%] translate-y-[45%] rotate-[-20deg] flex flex-col justify-center items-center font-black text-7xl text-center gap-3">
                ENJOY
                <span className="text-4xl">WEB PLATE</span>
                <Image
                    className="h-[120px] w-[120px] -translate-y-5"
                    src={Salad}
                    alt="salad"
                />
            </div>
        </>
    );
}

export default EnjoyCard;
