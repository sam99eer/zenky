import { createSlice } from '@reduxjs/toolkit';
import { IHomeSlice } from 'src/models/store/HomeSliceModel';

const initialState: IHomeSlice = {
    backdropVisible: false,
};

const homeSlice = createSlice({
    name: 'homeSlice',
    initialState,
    reducers: {
        toggleBackdrop(state) {
            state.backdropVisible = !state.backdropVisible;
        },
    },
});

export default homeSlice;
