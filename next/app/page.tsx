import Header from "@/app/_components/Header";
import MainBanner from "@/app/_components/MainBanner";
import MealsCardList from "@/app/_components/MealsCardList";
import CategoriesSideBar from "@/app/_components/CategoriesSideBar";
import LastOrdersSideBar from "@/app/_components/LastOrdersSideBar";

export default function Page() {
    return (
        <div className="flex flex-col gap-5">
            <Header />
            <div className="grid grid-cols-[75px_1fr_350px] gap-5">
                <CategoriesSideBar />
                <div className="flex flex-col gap-5">
                    <MainBanner />
                    <MealsCardList />
                </div>
                <LastOrdersSideBar />
            </div>
        </div>
    );
}
