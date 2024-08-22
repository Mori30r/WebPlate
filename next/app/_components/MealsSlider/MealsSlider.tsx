"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MealSlide from "@/app/_components/MealsSlider/MealSlide";
import { Meal } from "@/types/global";

interface Props {
    meals: Meal[];
    currentMealId: number;
}

function MealsSlider({ meals, currentMealId }: Props) {
    return (
        <div>
            <Swiper centeredSlides initialSlide={3} loop slidesPerView={5}>
                {meals
                    .filter((meal) => {
                        return meal.id !== currentMealId;
                    })
                    .map((meal) => {
                        return (
                            <SwiperSlide key={meal.id}>
                                <MealSlide meal={meal} />
                            </SwiperSlide>
                        );
                    })}
            </Swiper>
        </div>
    );
}

export default MealsSlider;
