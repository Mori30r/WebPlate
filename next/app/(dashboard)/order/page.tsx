import React from "react";
import Cart from "@/app/_components/Cart";
import AddressForm from "@/app/_components/AddressForm";

function Page() {
    return (
        <div className="grid grid-cols-[1.5fr_1fr] gap-5 justify-between">
            <form className="flex flex-col gap-3 w-full">
                <h1 className="font-black text-xl">PLACING AN ORDER</h1>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm text-zinc-400">
                        <p>Delivery</p>
                        <p>1/2</p>
                    </div>
                    <div className="bg-zinc-900 w-full rounded-full h-2">
                        <div className="bg-myGreen w-1/2 rounded-full h-2"></div>
                    </div>
                </div>
                <AddressForm />
            </form>
            <Cart />
        </div>
    );
}

export default Page;
