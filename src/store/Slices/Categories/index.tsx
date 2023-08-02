import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICategoryData } from 'src/models/api/CategoriesModel';
import { ICategorySlice } from 'src/models/store/CategorySliceModel';

const initialState: ICategorySlice = {
    data: {
        MEN: [],
        WOMEN: [],
        KIDS: [],
    },
};

const categoriesSlice = createSlice({
    name: 'categoriesSlice',
    initialState,
    reducers: {
        fillData(state, action: PayloadAction<{ data: ICategoryData }>) {
            state.data = action.payload.data;
        },
    },
});

export default categoriesSlice;
