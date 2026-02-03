import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Dish {
    id: string;
    title: string;
    price: number;
    image: string;
}

export interface DishesState {
    items: Dish[];
    loading: boolean;
}

const initialState: DishesState = {
    items: [],
    loading: false,
}

export const dishesSlice = createSlice({
    name: 'dishes',
    initialState,
    reducers: {
        addDish: (state, action: PayloadAction<Dish>) => {},
        editDish: (state, action: PayloadAction<Dish>) => {},
        deleteDish: (state, action: PayloadAction<string>) => {},
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
})

export const dishesReducer = dishesSlice.reducer;
export const { addDish, editDish, deleteDish, setLoading } = dishesSlice.actions;
