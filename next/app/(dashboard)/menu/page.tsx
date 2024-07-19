import React from "react";
import Dummy from "@/app/dummy.json";
import MealCard from "@/app/_components/MealCard";

function Page() {
    return (
        <div className="mb-5">
            <div className="grid items-center grid-cols-[200px_1fr_300px] pl-10">
                <h1 className="font-bold text-xl">Salads</h1>
                <div className="flex gap-5 font-bold text-sm text-zinc-500">
                    <p className="underline underline-offset-4 text-zinc-300">
                        All
                    </p>
                    <p>with meat</p>
                    <p>with fish</p>
                    <p>vegeterian</p>
                    <p>vegan</p>
                </div>
                <div className="flex gap-5 font-bold text-sm text-zinc-500">
                    <p>Sort by:</p>
                    <select className="bg-transparent text-zinc-300">
                        <option>Price: from lowest to highest</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-5 gap-y-24 mt-24">
                {Dummy.meals.map((meal) => {
                    return <MealCard meal={meal} key={meal.name} />;
                })}
            </div>
        </div>
    );
}

export default Page;
