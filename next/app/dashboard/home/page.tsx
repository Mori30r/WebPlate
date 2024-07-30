import MainBanner from "@/app/_components/MainBanner";
import LastOrdersSideBar from "@/app/_components/LastOrdersSideBar";
import PrimaryButton from "@/app/_components/PrimaryButton";
import Dummy from "@/app/dummy.json";
import MealCard from "@/app/_components/MealCard";

export default function Page() {
    return (
        <div className="grid grid-cols-[1fr_350px] gap-5">
            <div className="flex flex-col gap-5">
                <MainBanner />
                <div className="mb-4">
                    <div className="flex flex-col px-2 gap-5">
                        <div className="flex justify-between items-center">
                            <p className="text-3xl font-bold">For you</p>
                            <PrimaryButton href="/dashboard">
                                See More &gt;&gt;
                            </PrimaryButton>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-2 gap-y-24 mt-20">
                            {Dummy.meals.map((meal) => {
                                return (
                                    <MealCard
                                        key={meal.name}
                                        meal={{ ...meal, quantity: 1 }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <LastOrdersSideBar />
        </div>
    );
}
