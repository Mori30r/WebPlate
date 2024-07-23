"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Dummy from "@/app/dummy.json";
import { useRouter, useSearchParams } from "next/navigation";

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
    const router = useRouter();
    const searchParams = useSearchParams();

    function handleClick() {
        const params = new URLSearchParams(searchParams);
        params.set("category", name);

        router.replace(`/menu?${params.toString()}`, { scroll: false });
    }

    return (
        <div onClick={handleClick} className="cursor-pointer">
            <Image src={emoji} width={25} height={25} alt={name} />
        </div>
    );
}

export default CategoriesSideBar;
