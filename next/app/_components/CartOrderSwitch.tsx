"use client";

import React from "react";
import PrimaryButton from "./PrimaryButton";
import { useSearchParams } from "next/navigation";

function OrderSwitch() {
    const params = useSearchParams();

    // delivery or pickup
    const orderType = params.get("orderType") ?? "delivery";

    return (
        <div className="flex justify-between bg-zinc-800 py-2 px-4 rounded-md mx-auto gap-4">
            <PrimaryButton
                disabled={orderType !== "pickup"}
                bgColor={orderType === "pickup" ? "bg-zinc-100" : "transparent"}
                textColor={
                    orderType === "pickup" ? "text-zinc-800" : "text-zinc-100"
                }
                href="?orderType=pickup"
                paddingX="px-10"
            >
                Pick-up
            </PrimaryButton>
            <PrimaryButton
                disabled={orderType !== "delivery"}
                bgColor={
                    orderType === "delivery" ? "bg-zinc-100" : "transparent"
                }
                textColor={
                    orderType === "delivery" ? "text-zinc-800" : "text-zinc-100"
                }
                href="?orderType=delivery"
                paddingX="px-10"
            >
                Delivery
            </PrimaryButton>
        </div>
    );
}

export default OrderSwitch;
