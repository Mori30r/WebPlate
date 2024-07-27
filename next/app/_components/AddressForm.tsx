"use client";

import React, { useState } from "react";
import Input from "@/app/_components/Input";
import Radio from "@/app/_components/Radio";
import Select from "@/app/_components/Select";
import SubmitButton from "@/app/_components/SubmitButton";
import { useForm } from "react-hook-form";

function AddressForm() {
    const [address, setAddress] = useState("new");
    const { register, handleSubmit, control } = useForm();
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
                            id="street"
                            placeHolder="Enter street Name..."
                            register={{ ...register("street") }}
                            control={control}
                        />
                        <Input
                            label="House number"
                            type="string"
                            id="house_number"
                            placeHolder="Enter building number..."
                            register={{ ...register("house_number") }}
                            control={control}
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <Input
                            label="Entrance"
                            type="string"
                            id="entrance"
                            placeHolder=""
                            register={{ ...register("entrance") }}
                            control={control}
                        />
                        <Input
                            label="Floor"
                            type="string"
                            id="floor"
                            placeHolder=""
                            register={{ ...register("floor") }}
                            control={control}
                        />
                        <Input
                            label="Flat"
                            type="string"
                            id="flat"
                            placeHolder=""
                            register={{ ...register("flat") }}
                            control={control}
                        />
                        <Input
                            label="Intercome"
                            type="string"
                            id="intercome"
                            placeHolder=""
                            register={{ ...register("intercome") }}
                            control={control}
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
