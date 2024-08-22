"use client";

import { SortBy } from "@/types/global";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
function Sort() {
    const router = useRouter();
    const searchParams = useSearchParams();

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const sortBy = e.target.value as SortBy;
        const params = new URLSearchParams(searchParams);

        if (!sortBy) {
            params.delete("sortBy", "");
            router.replace(`menu`);
        } else {
            params.set("sortBy", sortBy);
            router.replace(`menu?${params.toString()}`);
        }
    }
    return (
        <div className="flex gap-5 font-bold text-sm text-zinc-500">
            <p>Sort By:</p>
            <select
                onChange={handleChange}
                className="bg-transparent text-zinc-300"
            >
                <option value="">All Foods</option>
                <option value="rateHighToLow">
                    Rating: from highest to lowest
                </option>
                <option value="rateLowToHigh">
                    Rating: from lowest to highest
                </option>
                <option value="priceLowToHigh">
                    Price: from lowest to highest
                </option>
                <option value="priceHightToLow">
                    Price: from highest to lowest
                </option>
            </select>
        </div>
    );
}

export default Sort;
