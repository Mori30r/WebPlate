import Image from "next/image";
import PrimaryButton from "@/app/_components/PrimaryButton";
import "swiper/css";

import { Meal } from "@/types/global";
import { getMeal, getMeals } from "@/app/_lib/data-service";
import MealsSlider from "@/app/_components/MealsSlider/MealsSlider";

async function Page({ params }: any) {
    const mealId = Number(params.mealId);
    const meal: Meal = await getMeal(mealId);
    const res = await getMeals();
    const meals: Meal[] = res.results;

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
                            {meal.ingredients.slice(0, 6).map((ingredient) => {
                                return (
                                    <div
                                        className="bg-zinc-800 p-2 rounded-md"
                                        key={ingredient.name}
                                    >
                                        <Image
                                            src={ingredient.emoji}
                                            width={20}
                                            height={20}
                                            alt={ingredient.name}
                                        />
                                    </div>
                                );
                            })}
                            {meal.ingredients.length > 6 && (
                                <div className="bg-zinc-200 p-2 rounded-md text-zinc-800 font-bold">
                                    +{meal.ingredients.length - 6}
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
            <MealsSlider meals={meals} currentMealId={mealId} />
        </div>
    );
}

export default Page;
