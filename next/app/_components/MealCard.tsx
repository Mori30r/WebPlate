"use client";

import { Meal, MealCartItem } from "@/types/global";
import Image from "next/image";
import Link from "next/link";
import { HiCheck } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "../_lib/store/hooks";
import { addMeal, deleteMeal } from "../_lib/store/features/cart/cartSlice";

interface Props {
    meal: Meal;
}

function MealCard({ meal }: Props) {
    const dispatch = useAppDispatch();
    const meals = useAppSelector((state) => state.cart.meals);

    return (
        <div className="flex flex-col bg-darkBg relative rounded-3xl text-center px-5 py-2 gap-4">
            <Link href={`/dashboard/menu/${meal.id}`}>
                <Image
                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 aspect-square"
                    src={meal.image}
                    width={150}
                    height={150}
                    alt={meal.name}
                />
                <p className="mt-20 font-bold">{meal.name}</p>
                <p className="text-sm text-zinc-500">
                    {meal.vegtables.map((vegtable) => `${vegtable.name}, `)}
                </p>
            </Link>
            <div className="flex h-8 items-center justify-between">
                <p className="font-bold">🔥 {meal.calories} Kcal</p>
                <p className="font-bold">${meal.price}</p>
                {meals.filter((currMeal) => currMeal.id == meal.id).length ==
                0 ? (
                    <div
                        onClick={() =>
                            dispatch(addMeal({ ...meal, quantity: 1 }))
                        }
                        className="font-black bg-myGreen rounded-full px-4 py-2 cursor-pointer"
                    >
                        +
                    </div>
                ) : (
                    <div
                        onClick={() => dispatch(deleteMeal(meal.id))}
                        className="font-black bg-myGreen rounded-full px-4 py-2 cursor-pointer"
                    >
                        <HiCheck strokeWidth={3} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default MealCard;
