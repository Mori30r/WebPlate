"use client";

import React, { useState } from "react";
import SubmitButton from "@/app/_components/SubmitButton";
import { Address } from "@/types/global";
import Radio from "./Radio";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Modal from "./Modal";
import Map from "@/app/_components/Map/Map";
import { createAddress } from "../_lib/actions";

function AddressForm({ addressList }: { addressList: Address[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");

    function handleChangeAddress(e: React.ChangeEvent<HTMLSelectElement>) {
        const changedAddress = e.target.value;
        setIsModalOpen(changedAddress == "new");
        const params = new URLSearchParams(searchParams);
        params.set("address", changedAddress);
        router.replace(`${pathname}?${params.toString()}`);
    }

    async function handleSubmitCreateAddress(userInput: FormData) {
        await createAddress(userInput);
        const params = new URLSearchParams(searchParams);
        params.delete("latitude");
        params.delete("longitude");
        router.replace(`${pathname}?${params.toString()}`);
        setIsModalOpen(false);
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                {addressList.map((address: Address, i: number) => {
                    return (
                        <Radio
                            onChange={handleChangeAddress}
                            id={String(address.id)}
                            value={String(address.id)}
                            key={String(address.id)}
                            name="address"
                        >
                            {address.name + ": " + address.detail}
                        </Radio>
                    );
                })}
                <Radio
                    onChange={handleChangeAddress}
                    id="new"
                    value="new"
                    name="address"
                >
                    New address
                </Radio>

                <Modal isOpen={isModalOpen}>
                    <form
                        action={handleSubmitCreateAddress}
                        className="grid grid-cols-2 gap-5 h-full"
                    >
                        <div className="flex flex-col justify-between">
                            <div className="flex flex-col gap-2 font-medium">
                                <p className="font-sm">
                                    Click on the Map to use Your Location
                                </p>
                                <label className="text-xs" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    name="name"
                                    type="string"
                                    id="name"
                                    placeholder="Enter Address Name..."
                                    className={`rounded-md text-xs bg-zinc-800 p-3 placeholder-zinc-500 border-0 focus:outline-none`}
                                />
                                <label className="text-xs" htmlFor="detail">
                                    Detail
                                </label>
                                <textarea
                                    name="detail"
                                    id="detail"
                                    placeholder="Enter Address Details..."
                                    className={`rounded-md text-xs bg-zinc-800 p-3 placeholder-zinc-500 border-0 focus:outline-none resize-none`}
                                />
                                <input
                                    type="hidden"
                                    value={String(latitude)}
                                    name="latitude"
                                />
                                <input
                                    type="hidden"
                                    value={String(longitude)}
                                    name="longitude"
                                />
                            </div>
                            <SubmitButton className="self-start">
                                Create new Address
                            </SubmitButton>
                        </div>
                        <div className="h-full">
                            <Map />
                        </div>
                    </form>
                </Modal>
            </div>
        </>
    );
}

export default AddressForm;
