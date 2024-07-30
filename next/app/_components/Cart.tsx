import React from "react";
import Image from "next/image";

import SubmitButton from "./SubmitButton";
import CartOrderSwitch from "./CartOrderSwitch";

import { MealCartItem } from "@/types/global";
import { useAppDispatch, useAppSelector } from "../_lib/store/hooks";
import { addMeal, deleteMeal } from "../_lib/store/features/cart/cartSlice";

function Cart() {
    const { meals, total } = useAppSelector((state) => state.cart);
    return (
        <form className="flex flex-col gap-4 bg-darkBg w-full p-4 rounded-2xl">
            <h1 className="text-l font-bold">Cart</h1>
            <CartOrderSwitch />
            <CartMealsList meals={meals} />
            <div className="mt-5">
                <div className="flex justify-between font-bold text-md">
                    <p>Total:</p>
                    <p>${total}</p>
                </div>
            </div>
            <SubmitButton>Order</SubmitButton>
        </form>
    );
}

interface CartMealsProps {
    meals: MealCartItem[];
}

function CartMealsList({ meals }: CartMealsProps) {
    const dispatch = useAppDispatch();
    return (
        <div className="flex flex-col gap-10 h-[200px] overflow-y-auto pr-5">
            {meals.map((meal) => {
                return (
                    <div key={meal.id} className="flex gap-4">
                        <Image
                            src={meal.image}
                            width={75}
                            height={75}
                            alt={meal.name}
                        />
                        <div className="flex flex-col gap-1 w-full">
                            <div className="flex justify-between items-center">
                                <p className="font-medium">{meal.name}</p>
                                <p
                                    onClick={() =>
                                        dispatch(deleteMeal(meal.id))
                                    }
                                    className="font-bold text-md text-zinc-600 cursor-pointer"
                                >
                                    x
                                </p>
                            </div>
                            <p className="text-xs font-light text-zinc-400 pr-10">
                                {meal.vegtables
                                    .map((vegtable) => `${vegtable.name}, `)
                                    .slice(0, 6)}
                            </p>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-[2px]">
                                    <p
                                        onClick={() => dispatch(addMeal(meal))}
                                        className="rounded-sm px-2 text-sm font-bold bg-zinc-800"
                                    >
                                        +
                                    </p>
                                    <p className="rounded-sm px-2 text-sm font-bold bg-zinc-800">
                                        {meal.quantity}
                                    </p>
                                    <p
                                        onClick={() =>
                                            dispatch(deleteMeal(meal.id))
                                        }
                                        className="rounded-sm px-2 text-sm font-bold bg-zinc-800 text-zinc-600"
                                    >
                                        -
                                    </p>
                                </div>
                                <p>${meal.price}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Cart;
