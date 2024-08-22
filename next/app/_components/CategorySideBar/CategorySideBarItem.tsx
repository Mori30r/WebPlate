"use client";

import { Category } from "@/types/global";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

function CategorySideBarItem({ category }: { category: Category }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    function handleClick() {
        const params = new URLSearchParams(searchParams);
        params.set("category", String(category.id));

        router.replace(`/dashboard/menu?${params.toString()}`, {
            scroll: false,
        });
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

export default CategorySideBarItem;
