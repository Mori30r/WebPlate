export interface Vegtables {
    name: string;
    emoji: string;
}

export interface Meal {
    id: number;
    name: string;
    price: number;
    weight: number;
    vegtables: Vegtables[];
    image: string;
    calories: number;
    rate: float;
    categoryId: number;
}

export interface Order {
    id: number;
    date: string;
    meals: Meal[];
}

export interface Category {
    id: number;
    name: string;
    emoji: string;
}

export interface User {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password2: string;
}

export interface HeaderLinkPropTypes {
    children: string;
    href: string;
}

export interface HeaderToolbarPropTypes {
    children: React.ReactElement;
    color: string;
    isProfile?: boolean;
    href: string;
}

export type SortBy =
    | "rateHighToLow"
    | "rateLowToHigh"
    | "priceLowToHigh"
    | "priceHightToLow";
