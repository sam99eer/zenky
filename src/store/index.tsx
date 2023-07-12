import { configureStore } from '@reduxjs/toolkit';
import cartSlice from 'src/store/Slices/Cart';
import homeSlice from 'src/store/Slices/Home';

const store = configureStore({
    reducer: {
        homeReducer: homeSlice.reducer,
        cartReducer: cartSlice.reducer,
    },
});

export type IStoreModel = ReturnType<typeof store.getState>;

export default store;
