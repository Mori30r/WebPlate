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
}

export interface Order {
    id: number;
    date: string;
    meals: Meal[];
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
