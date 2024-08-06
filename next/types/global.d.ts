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

export interface MealCartItem extends Meal {
    quantity: number;
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

export interface Address {
    name: string;
    detail: string;
    latitude: float;
    longitude: float;
}

export interface Profile {
    first_name: string;
    last_name: string;
    image: string;
    phone_number: string;
    addresses: [];
}

export interface User {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    profile: Profile;
    accessToken: string;
}

export interface UserSignup {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password2: string;
}

export interface UserLogin {
    email: string;
    password: string;
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

export interface UserLoginResponse {
    refresh: string;
    access: string;
    user: User;
}
