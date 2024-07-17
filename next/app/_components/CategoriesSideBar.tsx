import Image from "next/image";
import Link from "next/link";
import React from "react";
import Dummy from "@/app/dummy.json";

function CategoriesSideBar() {
    return (
        <div className="rounded-2xl">
            <div className="bg-darkBg flex flex-col items-center gap-10 rounded-2xl p-5">
                {Dummy.categories.map((category) => {
                    return (
                        <CategorySideBarItem
                            emoji={category.emoji}
                            name={category.name}
                            key={category.name}
                        />
                    );
                })}
            </div>
        </div>
    );
}

interface CategorySideBarItemPropTypes {
    emoji: string;
    name: string;
}

function CategorySideBarItem({ emoji, name }: CategorySideBarItemPropTypes) {
    return (
        <Link href={`./categories/${name}`}>
            <Image src={emoji} width={25} height={25} alt={name} />
        </Link>
    );
}

export default CategoriesSideBar;
