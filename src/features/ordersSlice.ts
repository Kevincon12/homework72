import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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

const initialState: OrdersState = {
    items: [],
    loading: false,
}

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<Order[]>) => {},
        completeOrder: (state, action: PayloadAction<string>) => {},
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
})

export const ordersReducer = ordersSlice.reducer;
export const { setOrders, completeOrder, setLoading } = ordersSlice.actions;
