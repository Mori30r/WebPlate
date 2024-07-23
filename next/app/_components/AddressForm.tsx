"use client";

import React, { useState } from "react";
import Input from "@/app/_components/Input";
import Radio from "@/app/_components/Radio";
import Select from "@/app/_components/Select";
import SubmitButton from "@/app/_components/SubmitButton";

function AddressForm() {
    const [address, setAddress] = useState("new");
    return (
        <>
            <Radio
                onChange={() => setAddress("1")}
                id="1"
                name="address"
                value="1"
            >
                Address 1
            </Radio>
            <Radio
                onChange={() => setAddress("2")}
                id="2"
                name="address"
                value="2"
            >
                Address 2
            </Radio>
            <Radio
                onChange={() => setAddress("new")}
                id="new"
                name="address"
                value="new"
            >
                New address
            </Radio>

            {address === "new" && (
                <>
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
                </>
            )}
            <SubmitButton className="self-start">
                Continue to payment
            </SubmitButton>
        </>
    );
}

export default AddressForm;
