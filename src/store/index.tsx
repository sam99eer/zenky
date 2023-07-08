import { configureStore } from '@reduxjs/toolkit';
import homeSlice from 'src/store/Slices/Home';

const store = configureStore({
    reducer: {
        homeReducer: homeSlice.reducer,
    },
});

export type IStoreModel = ReturnType<typeof store.getState>;

export default store;
