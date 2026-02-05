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

export const getOrdersAsync = createAsyncThunk<
    Order[],
    void
>(
    'orders/fetchOrders',
    async () => {
        const { data } = await axios.get(`${BASE_URL}/orders.json`);

        if (!data) return [];

        return Object.keys(data).map((id) => ({
            id,
            items: data[id],
        }));
    }
);

export const deleteOrderAsync = createAsyncThunk<string, string>(
    'orders/completeOrder',
    async (orderId) => {
        await axios.delete(`${BASE_URL}/orders/${orderId}.json`);
        return orderId;
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
            })
            .addCase(getOrdersAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOrdersAsync.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(getOrdersAsync.rejected, (state) => {
                state.loading = false;
            })
            .addCase(deleteOrderAsync.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (order) => order.id !== action.payload
                );
            });
    },
});

export const ordersReducer = ordersSlice.reducer;
export const { setLoading } = ordersSlice.actions;
