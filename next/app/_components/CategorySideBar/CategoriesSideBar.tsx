import React, { Suspense } from "react";
import CategorySideBarItem from "./CategorySideBarItem";
import { getCategories } from "@/app/_lib/data-service";
import { Category } from "@/types/global";
import Spinner from "../Spinner";

async function CategoriesSideBar() {
    const res = await getCategories();
    const categories: Category[] = res.results;

    return (
        <div className="rounded-2xl">
            <div className="bg-darkBg flex flex-col items-center gap-10 rounded-2xl p-5">
                <Suspense fallback={<Spinner />}>
                    {categories.map((category) => {
                        return (
                            <CategorySideBarItem
                                category={category}
                                key={category.id}
                            />
                        );
                    })}
                </Suspense>
            </div>
        </div>
    );
}

export default CategoriesSideBar;
