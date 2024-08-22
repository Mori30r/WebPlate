import React, { Suspense } from "react";
import MealsCardList from "@/app/_components/MealsCardList";
import { Category, Meal } from "@/types/global";
import Spinner from "@/app/_components/Spinner";
import { getCategories, getMeals } from "@/app/_lib/data-service";
import Sort from "@/app/_components/Sort";

async function Page({
    searchParams,
}: {
    searchParams: { category: string; sortBy: string };
}) {
    const [mealsRes, categoriesRes] = await Promise.all([
        getMeals(),
        getCategories(),
    ]);
    const allMeals: Meal[] = mealsRes.results;
    const allCategories: Category[] = categoriesRes.results;

    // handle filter by category
    let filteredMeals: Meal[];

    const categoryId = searchParams.category;
    if (!categoryId) filteredMeals = allMeals;
    else {
        filteredMeals = allMeals.filter((meal) => {
            return meal.category === Number(categoryId);
        });
    }
    const category: Category = allCategories.filter((category) => {
        return category.id === Number(categoryId);
    })[0];

    // handle sort
    let sortedMeals = filteredMeals;
    const sortBy = searchParams.sortBy;

    if (sortBy === "rateHighToLow") {
        sortedMeals = filteredMeals.sort((prev, curr) => curr.rate - prev.rate);
    }
    if (sortBy === "rateLowToHigh") {
        sortedMeals = filteredMeals.sort((prev, curr) => prev.rate - curr.rate);
    }
    if (sortBy === "priceLowToHigh") {
        sortedMeals = filteredMeals.sort(
            (prev, curr) => prev.price - curr.price
        );
    }
    if (sortBy === "priceHightToLow") {
        sortedMeals = filteredMeals.sort(
            (prev, curr) => curr.price - prev.price
        );
    }

    return (
        <div className="mb-5">
            <div className="flex justify-between items-center pl-10">
                <h1 className="font-bold text-xl">{category?.name}</h1>
                <Sort />
            </div>
            <Suspense fallback={<Spinner />}>
                <div className="grid grid-cols-4 gap-5 gap-y-24 mt-24">
                    <MealsCardList meals={sortedMeals} />
                </div>
            </Suspense>
        </div>
    );
}

export default Page;
