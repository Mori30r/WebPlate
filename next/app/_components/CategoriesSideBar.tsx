"use client";

import Image from "next/image";
import React from "react";
import Dummy from "@/app/dummy.json";
import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "@/types/global";

function CategoriesSideBar() {
    return (
        <div className="rounded-2xl">
            <div className="bg-darkBg flex flex-col items-center gap-10 rounded-2xl p-5">
                {Dummy.categories.map((category) => {
                    return (
                        <CategorySideBarItem
                            category={category}
                            key={category.id}
                        />
                    );
                })}
            </div>
        </div>
    );
}

function CategorySideBarItem({ category }: { category: Category }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    function handleClick() {
        const params = new URLSearchParams(searchParams);
        params.set("category", String(category.id));

        router.replace(`/menu?${params.toString()}`, { scroll: false });
    }

    return (
        <div onClick={handleClick} className="cursor-pointer">
            <Image
                src={category.emoji}
                width={25}
                height={25}
                alt={category.name}
            />
        </div>
    );
}

export default CategoriesSideBar;
