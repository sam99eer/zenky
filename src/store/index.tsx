import { configureStore } from '@reduxjs/toolkit';
import cartSlice from 'src/store/Slices/Cart';
import homeSlice from 'src/store/Slices/Home';
import personalDetailsSlice from 'src/store/Slices/PersonalDetails';

const store = configureStore({
    reducer: {
        homeReducer: homeSlice.reducer,
        cartReducer: cartSlice.reducer,
        personalDetailsReducer: personalDetailsSlice.reducer,
    },
});

export type IStoreModel = ReturnType<typeof store.getState>;

export default store;
