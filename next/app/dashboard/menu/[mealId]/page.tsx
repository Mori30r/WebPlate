"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { useParams } from "next/navigation";
import Dummy from "@/app/dummy.json";
import PrimaryButton from "@/app/_components/PrimaryButton";
import DetailSlide from "@/app/_components/MealCardSlider";
import "swiper/css";

import { Meal } from "@/types/global";

function Page() {
    const mealId = Number(useParams().mealId);
    const meal: Meal = Dummy.meals.filter(
        (el): el is Meal => el !== undefined && el.id === mealId
    )[0];

    return (
        <div className="flex flex-col gap-10 overflow-hidden justify-between relative">
            <div className="relative mx-auto bg-zinc-900 rounded-[3rem]">
                <Image
                    src={meal.image}
                    width={280}
                    height={280}
                    alt={meal.name}
                    className="absolute -left-28"
                />
                <div className="flex flex-col justify-between py-5 pl-44 pr-12 gap-2">
                    <div className="flex justify-between">
                        <p className="text-l font-bold text-zinc-200">
                            {meal.name}
                        </p>
                        <p>♥</p>
                    </div>
                    <div className="flex flex-col justify-between gap-3 pr-10">
                        <div className="flex justify-between text-sm">
                            <p>⭐ 4.8</p>
                            <p>⏳ 4.8</p>
                            <p>🔥 {meal.calories}</p>
                            <p>⚖ {meal.weight}</p>
                        </div>
                        <div className="flex justify-between">
                            {meal.vegtables.slice(0, 6).map((vegtable) => {
                                return (
                                    <div
                                        className="bg-zinc-800 p-2 rounded-md"
                                        key={vegtable.name}
                                    >
                                        <Image
                                            src={vegtable.emoji}
                                            width={20}
                                            height={20}
                                            alt={vegtable.name}
                                        />
                                    </div>
                                );
                            })}
                            {meal.vegtables.length > 6 && (
                                <div className="bg-zinc-200 p-2 rounded-md text-zinc-800 font-bold">
                                    +{meal.vegtables.length - 6}
                                </div>
                            )}
                        </div>
                        <p className="text-l font-bold text-zinc-200">
                            ${meal.price}
                        </p>
                        <div className="flex gap-4">
                            <PrimaryButton href="/dashboard" paddingX="px-10">
                                Order now
                            </PrimaryButton>
                            <PrimaryButton href="/dashboard" disabled>
                                Edit ingridients
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Swiper centeredSlides initialSlide={3} loop slidesPerView={5}>
                    {Dummy.meals
                        .filter((meal) => {
                            return meal.id !== mealId;
                        })
                        .map((meal) => {
                            return (
                                <SwiperSlide key={meal.id}>
                                    <DetailSlide meal={meal} />
                                </SwiperSlide>
                            );
                        })}
                </Swiper>
            </div>
        </div>
    );
}

export default Page;
