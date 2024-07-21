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
