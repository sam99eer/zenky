import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICartItemPayload, ICartSlice } from 'src/models/store/CartSliceModel';

const initialState: ICartSlice = {
    cartItem: [],
};

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        addItem(
            state,
            action: PayloadAction<{
                data: ICartItemPayload;
            }>
        ) {
            const findItem = state.cartItem?.findIndex(
                (item) =>
                    item?._id === action.payload.data?._id &&
                    item?.size === action.payload?.data?.size &&
                    item?.colorName === action.payload?.data?.colorName
            );

            if (findItem === -1) {
                state.cartItem.push({
                    _id: action.payload.data?._id,
                    image: action.payload.data?.image,
                    name: action.payload.data?.name,
                    price: action.payload.data?.price,
                    quantity: 1,
                    totalPrice: action.payload.data?.price,
                    colorName: action.payload.data?.colorName,
                    size: action.payload.data?.size,
                });
                return;
            }

            state.cartItem[findItem].quantity += 1;
            state.cartItem[findItem].totalPrice +=
                state.cartItem[findItem].price;
        },
        removeItem(
            state,
            action: PayloadAction<{
                _id: string;
                colorName: string;
                size: string;
            }>
        ) {
            const findItem = state.cartItem?.findIndex(
                (item) =>
                    item?._id === action.payload?._id &&
                    item?.colorName === action.payload?.colorName &&
                    item?.size === action.payload?.size
            );

            if (findItem !== -1) {
                if (state.cartItem[findItem].quantity === 1) {
                    state.cartItem.splice(findItem, 1);
                    return;
                }
                state.cartItem[findItem].quantity -= 1;
                state.cartItem[findItem].totalPrice -=
                    state.cartItem[findItem].price;
            }
        },
        deleteItem(
            state,
            action: PayloadAction<{
                _id: string;
                colorName: string;
                size: string;
            }>
        ) {
            const findItem = state.cartItem?.findIndex(
                (item) =>
                    item?._id === action.payload?._id &&
                    item?.colorName === action.payload?.colorName &&
                    item?.size === action.payload?.size
            );

            if (findItem !== -1) {
                state.cartItem.splice(findItem, 1);
            }
        },
        flushCart(state) {
            state.cartItem = [];
        },
    },
});

export default cartSlice;
