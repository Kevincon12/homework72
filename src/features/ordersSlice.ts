import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

export interface OrderItem {
    id: string;
    count: number;
}

export interface Order {
    id: string;
    items: Record<string, number>;
}

export interface OrdersState {
    items: Order[];
    loading: boolean;
}

export interface CreateOrderPayload {
    items: Record<string, number>;
}

const initialState: OrdersState = {
    items: [],
    loading: false,
}

const BASE_URL = 'https://iliahomework72-default-rtdb.europe-west1.firebasedatabase.app';

export const createOrderAsync = createAsyncThunk<
    void,
    CreateOrderPayload
>(
    'orders/createOrder',
    async ({ items }) => {
        await axios.post(`${BASE_URL}/orders.json`, items);
    }
);

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrderAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(createOrderAsync.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createOrderAsync.rejected, (state) => {
                state.loading = false;
            });
    },
});


export const ordersReducer = ordersSlice.reducer;
export const { setLoading } = ordersSlice.actions;
