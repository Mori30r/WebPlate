import Cart from "@/app/_components/Cart";
import Input from "@/app/_components/Input";
import Radio from "@/app/_components/Radio";
import Select from "@/app/_components/Select";
import SubmitButton from "@/app/_components/SubmitButton";
import React from "react";
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
                <Radio id="1" name="address" value="1">
                    Address 1
                </Radio>
                <Radio id="2" name="address" value="2">
                    Address 2
                </Radio>
                <Radio id="new" name="address" value="new">
                    New address
                </Radio>
                <Select label="City">
                    <Select.Option>Tehran</Select.Option>
                    <Select.Option>Karaj</Select.Option>
                </Select>
                <div className="grid grid-cols-[2fr_1fr] gap-4">
                    <Input
                        label="Street"
                        type="string"
                        name="street"
                        placeHolder="Enter street name..."
                    />
                    <Input
                        label="House number"
                        type="string"
                        name="house_number"
                        placeHolder="Enter building number..."
                    />
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <Input
                        label="Entrance"
                        type="string"
                        name="entrance"
                        placeHolder=""
                    />
                    <Input
                        label="Floor"
                        type="string"
                        name="floor"
                        placeHolder=""
                    />
                    <Input
                        label="Flat"
                        type="string"
                        name="flat"
                        placeHolder=""
                    />
                    <Input
                        label="Intercome"
                        type="string"
                        name="intercome"
                        placeHolder=""
                    />
                </div>
                <SubmitButton className="self-start">
                    Continue to payment
                </SubmitButton>
            </form>
            <Cart />
        </div>
    );
}

export default Page;
