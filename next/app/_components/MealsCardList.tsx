import React from "react";
import MealCard from "@/app/_components/MealCard";
import { MealCartItem } from "@/types/global";

function MealsCardList({ meals }: { meals: MealCartItem[] }) {
    return meals.map((meal) => {
        return <MealCard meal={meal} key={meal.id} />;
    });
}

export default MealsCardList;
