import { Meal } from "@/types/global";
import Image from "next/image";
import Link from "next/link";

interface Props {
    meal: Meal;
}

function MealCard({ meal }: Props) {
    return (
        <div className="bg-darkBg relative rounded-3xl text-center px-5 py-2">
            <Link href={`/menu/${meal.id}`}>
                <Image
                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 aspect-square"
                    src={meal.image}
                    width={150}
                    height={150}
                    alt={meal.name}
                />
                <p className="mt-20 font-bold">{meal.name}</p>
                <p className="text-sm text-zinc-500">
                    {meal.vegtables.map((vegtable) => `${vegtable.name}, `)}
                </p>
            </Link>
            <div className="flex items-center justify-between">
                <p className="font-bold">🔥 {meal.calories} Kcal</p>
                <p className="font-bold">${meal.price}</p>
                <div className="font-black bg-myGreen rounded-full px-4 py-2">
                    +
                </div>
            </div>
        </div>
    );
}

export default MealCard;
