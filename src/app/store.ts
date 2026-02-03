import { configureStore } from '@reduxjs/toolkit';
import { dishesReducer } from '../features/dishesSlice';
import { ordersReducer } from '../features/ordersSlice';

export const store = configureStore({
    reducer: {
        dishes: dishesReducer,
        orders: ordersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
