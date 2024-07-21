import React from "react";
import PrimaryButton from "./PrimaryButton";
import Dummy from "@/app/dummy.json";
import Image from "next/image";
import { Order } from "@/types/global";
import SubmitButton from "./SubmitButton";

function Cart() {
    const order: Order = Dummy.orders[0];
    return (
        <div className="flex flex-col gap-4 bg-darkBg w-full p-4 rounded-2xl">
            <h1 className="text-l font-bold">Cart</h1>
            <div className="flex justify-between bg-zinc-800 py-2 px-4 rounded-md mx-auto">
                <PrimaryButton disabled href="" paddingX="px-10">
                    Pick-up
                </PrimaryButton>
                <PrimaryButton
                    href=""
                    paddingX="px-10"
                    bgColor="bg-zinc-100"
                    textColor="text-zinc-800"
                >
                    Delivery
                </PrimaryButton>
            </div>
            <div className="flex flex-col gap-10 h-[200px] overflow-y-auto pr-5">
                {order.meals.map((meal) => {
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
            <div className="mt-5">
                <div className="flex justify-between font-bold text-md">
                    <p>Total:</p>
                    <p>
                        $
                        {order.meals.reduce((ac, curr) => {
                            return ac + curr.price;
                        }, 0)}
                    </p>
                </div>
            </div>
            <SubmitButton>Order</SubmitButton>
        </div>
    );
}

export default Cart;
