import React from "react";
import Image from "next/image";

import SubmitButton from "./SubmitButton";
import CartOrderSwitch from "./CartOrderSwitch";

import { Meal } from "@/types/global";
import Dummy from "@/app/dummy.json";

function Cart() {
    const melas: Meal[] = Dummy.orders[0].meals;
    return (
        <form className="flex flex-col gap-4 bg-darkBg w-full p-4 rounded-2xl">
            <h1 className="text-l font-bold">Cart</h1>
            <CartOrderSwitch />
            <CartMealsList meals={melas} />
            <div className="mt-5">
                <div className="flex justify-between font-bold text-md">
                    <p>Total:</p>
                    <p>
                        $
                        {melas.reduce((ac, curr) => {
                            return ac + curr.price;
                        }, 0)}
                    </p>
                </div>
            </div>
            <SubmitButton>Order</SubmitButton>
        </form>
    );
}

interface CartMealsProps {
    meals: Meal[];
}

function CartMealsList({ meals }: CartMealsProps) {
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
                                <p className="font-bold text-md text-zinc-600">
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
                                    <p className="rounded-sm px-2 text-sm font-bold bg-zinc-800">
                                        +
                                    </p>
                                    <p className="rounded-sm px-2 text-sm font-bold bg-zinc-800">
                                        1
                                    </p>
                                    <p className="rounded-sm px-2 text-sm font-bold bg-zinc-800 text-zinc-600">
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
