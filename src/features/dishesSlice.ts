import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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

const BASE_URL = 'https://iliahomework72-default-rtdb.europe-west1.firebasedatabase.app';

export const fetchDishes = createAsyncThunk(
    'dishes/fetchDishes',
    async () => {
        const response = await axios.get(`${BASE_URL}/dishes.json`);
        if (!response.data) return [];
        return Object.keys(response.data).map(key => ({
            id: key,
            ...response.data[key],
        }));
    }
);

export const dishesSlice = createSlice({
    name: 'dishes',
    initialState,
    reducers: {
        editDish: (state, action: PayloadAction<Dish>) => {},
        addDish: (state, action: PayloadAction<Dish>) => {
            state.items.push(action.payload);
        },
        deleteDish: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(d => d.id !== action.payload);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDishes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDishes.fulfilled, (state, action: PayloadAction<Dish[]>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchDishes.rejected, (state) => {
                state.loading = false;
            });
    }
});

export const { addDish, editDish, deleteDish, setLoading } = dishesSlice.actions;
export const dishesReducer = dishesSlice.reducer;
