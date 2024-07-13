import React from "react";
import TileImageColumn from "./TileImageColumn";

import Image1 from "@/public/images/1.jpg";
import Image2 from "@/public/images/2.jpg";
import Image3 from "@/public/images/3.jpg";
import Image4 from "@/public/images/4.jpg";
import Image5 from "@/public/images/5.jpg";
import Image6 from "@/public/images/6.jpg";
import Image7 from "@/public/images/7.jpg";
import Image8 from "@/public/images/8.jpg";

export default function ImagesGrid() {
    return (
        <div className="flex max-w-6xl mx-auto w-full gap-4">
            <TileImageColumn src1={Image1} src2={Image2} alt1="1" alt2="2" />
            <TileImageColumn src1={Image3} src2={Image4} alt1="3" alt2="4" />
            <TileImageColumn src1={Image5} src2={Image6} alt1="5" alt2="6" />
            <TileImageColumn src1={Image7} src2={Image8} alt1="7" alt2="8" />
        </div>
    );
}
