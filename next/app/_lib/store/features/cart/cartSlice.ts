import { Address, MealCartItem } from "@/types/global";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initStateType {
    meals: MealCartItem[];
    address: Address | null;
    total: GLfloat;
}

const initialState: initStateType = {
    meals: [],
    address: null,
    total: 0,
};

const mySlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        addMeal: (
            state: initStateType,
            action: PayloadAction<MealCartItem>
        ) => {
            const meal = state.meals.find(
                (meal) => meal.id === action.payload.id
            );
            if (meal) {
                meal.quantity += 1;
                mySlice.caseReducers.calcTotal(state);
            } else {
                state.meals.push({ ...action.payload, quantity: 1 });
                mySlice.caseReducers.calcTotal(state);
            }
        },
        deleteMeal: (state: initStateType, action: PayloadAction<number>) => {
            const meal = state.meals.find((meal) => meal.id === action.payload);
            if (meal && meal.quantity > 1) {
                meal.quantity -= 1;
            } else {
                state.meals = state.meals.filter(
                    (meal) => meal.id !== action.payload
                );
            }
            mySlice.caseReducers.calcTotal(state);
        },
        changeAddress: (
            state: initStateType,
            action: PayloadAction<Address>
        ) => {
            state.address = action.payload;
        },
        calcTotal: (state: initStateType) => {
            state.total = state.meals.reduce((ac, curr) => {
                return ac + curr.quantity * curr.price;
            }, 0);
        },
    },
});

export const { addMeal, deleteMeal, changeAddress } = mySlice.actions;

export default mySlice.reducer;
