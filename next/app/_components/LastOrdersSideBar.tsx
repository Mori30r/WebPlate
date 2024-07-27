import React from "react";
import Image from "next/image";
import PrimaryButton from "./PrimaryButton";
import Dummy from "@/app/dummy.json";

function LastOrdersSideBar() {
    return (
        <div className="rounded-2xl flex flex-col p-5 bg-zinc-900 gap-5 mb-4">
            <div className="flex justify-between items-center">
                <p className="font-semibold text-2xl">Last Orders</p>
                <PrimaryButton
                    paddingX="px-6"
                    radius="rounded-full"
                    href="/dashboard"
                >
                    See all
                </PrimaryButton>
            </div>
            {Dummy.orders.map((order) => {
                return <LastOrdersSideBarItem key={order.date} order={order} />;
            })}
        </div>
    );
}

interface LastOrdersSideBarItemPropTypes {
    order: {
        date: string;
        meals: { name: string; image: string; weight: number; price: number }[];
    };
}

function LastOrdersSideBarItem({ order }: LastOrdersSideBarItemPropTypes) {
    return (
        <div
            key={order.date}
            className="flex flex-col bg-zinc-800 rounded-2xl p-2 gap-2"
        >
            {order.meals.map((meal) => {
                return <LastOrderSideBarItemMeal key={meal.name} meal={meal} />;
            })}
            <div className="flex px-2 mt-2 justify-between items-center">
                <p className="text-zinc-400 text-sm">{order.date}</p>
                <PrimaryButton
                    bgColor="bg-zinc-100"
                    textColor="text-zinc-800"
                    radius="rounded-full"
                    href="/dashboard"
                >
                    Repeat
                </PrimaryButton>
            </div>
        </div>
    );
}

interface LastOrderSideBarItemMealPropTypes {
    meal: { name: string; image: string; weight: number; price: number };
}

function LastOrderSideBarItemMeal({ meal }: LastOrderSideBarItemMealPropTypes) {
    return (
        <div className="flex items-center gap-3">
            <Image width={70} height={40} src={meal.image} alt={meal.name} />
            <div className="flex flex-col text-sm font-semibold">
                <p>{meal.name}</p>
                <p className="font-light text-zinc-400">{meal.weight} g</p>
                <p>${meal.price}</p>
            </div>
        </div>
    );
}

export default LastOrdersSideBar;
