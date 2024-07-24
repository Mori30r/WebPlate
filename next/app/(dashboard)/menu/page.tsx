"use client";

import React from "react";
import Dummy from "@/app/dummy.json";
import MealsCardList from "@/app/_components/MealsCardList";
import { useSearchParams, useRouter } from "next/navigation";
import { Category, Meal, SortBy } from "@/types/global";

function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // handle filter by category
    let filteredMeals: Meal[];

    const categoryId = searchParams.get("category");
    if (!categoryId) filteredMeals = Dummy.meals;
    else {
        filteredMeals = Dummy.meals.filter((meal) => {
            return meal.categoryId === Number(categoryId);
        });
    }
    const category: Category = Dummy.categories.filter((category) => {
        return category.id === Number(categoryId);
    })[0];

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

    // handle sort
    let sortedMeals = filteredMeals;

    if (searchParams.get("sortBy") === "rateHighToLow") {
        sortedMeals = filteredMeals.sort((prev, curr) => curr.rate - prev.rate);
    }
    if (searchParams.get("sortBy") === "rateLowToHigh") {
        sortedMeals = filteredMeals.sort((prev, curr) => prev.rate - curr.rate);
    }
    if (searchParams.get("sortBy") === "priceLowToHigh") {
        sortedMeals = filteredMeals.sort(
            (prev, curr) => prev.price - curr.price
        );
    }
    if (searchParams.get("sortBy") === "priceHightToLow") {
        sortedMeals = filteredMeals.sort(
            (prev, curr) => curr.price - prev.price
        );
    }

    return (
        <div className="mb-5">
            <div className="flex justify-between items-center pl-10">
                <h1 className="font-bold text-xl">{category?.name}</h1>
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
            </div>
            <div className="grid grid-cols-4 gap-5 gap-y-24 mt-24">
                <MealsCardList meals={sortedMeals} />
            </div>
        </div>
    );
}

export default Page;
