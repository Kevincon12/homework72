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
            clientId: response.data[key].id,
            title: response.data[key].title,
            price: response.data[key].price,
            image: response.data[key].image
        }));
    }
);

export const addDishAsync = createAsyncThunk(
    'dishes/addDishAsync',
    async (dish: Dish) => {
        const response = await axios.post(`${BASE_URL}/dishes.json`, dish);
        return { ...dish, id: response.data.name };
    }
);

export const editDishAsync = createAsyncThunk(
    'dishes/editDishAsync',
    async (dish: Dish) => {
        await axios.put(`${BASE_URL}/dishes/${dish.id}.json`, dish);
        return dish;
    }
);

export const deleteDishAsync = createAsyncThunk(
    'dishes/deleteDishAsync',
    async (id: string) => {
        console.log('Deleting:', `${BASE_URL}/dishes/${id}.json`);
        await axios.delete(`${BASE_URL}/dishes/${id}.json`);
        return id;
    }
);

export const dishesSlice = createSlice({
    name: 'dishes',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDishes.pending, (state) => { state.loading = true; })
            .addCase(fetchDishes.fulfilled, (state, action: PayloadAction<Dish[]>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchDishes.rejected, (state) => { state.loading = false; })

            .addCase(addDishAsync.pending, (state) => { state.loading = true; })
            .addCase(addDishAsync.fulfilled, (state, action: PayloadAction<Dish>) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(addDishAsync.rejected, (state) => { state.loading = false; })

            .addCase(editDishAsync.pending, (state) => { state.loading = true; })
            .addCase(editDishAsync.fulfilled, (state, action: PayloadAction<Dish>) => {
                state.loading = false;
                const index = state.items.findIndex(d => d.id === action.payload.id);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(editDishAsync.rejected, (state) => { state.loading = false; })

            .addCase(deleteDishAsync.pending, (state) => { state.loading = true; })
            .addCase(deleteDishAsync.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.items = state.items.filter(d => d.id !== action.payload);
            })
            .addCase(deleteDishAsync.rejected, (state) => { state.loading = false; });
    }
});

export const { setLoading } = dishesSlice.actions;
export const dishesReducer = dishesSlice.reducer;
