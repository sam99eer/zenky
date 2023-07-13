import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IProfileData } from 'src/models/screens/Profile';
import { IPersonalDetails } from 'src/models/store/PersonalDetailsSliceModel';

const initialState: IPersonalDetails = {
    isLoggedIn: false,
    token: null,
    profileData: {
        _id: null,
        email: null,
        role: null,
        name: null,
        image: null,
        phoneNumber: null,
        countryCode: null,
        zipCode: null,
        address: null,
        country: null,
        state: null,
        city: null,
        isBlocked: null,
        createdAt: null,
        updatedAt: null,
    },
};

const personalDetailsSlice = createSlice({
    name: 'personalDetailsSlice',
    initialState,
    reducers: {
        setCredentials(
            state,
            action: PayloadAction<{
                token: string;
            }>
        ) {
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        fillProfileData(state, action: PayloadAction<{ data: IProfileData }>) {
            state.profileData = action.payload.data;
        },
        flushData(state) {
            state.profileData = {
                _id: null,
                email: null,
                role: null,
                name: null,
                image: null,
                phoneNumber: null,
                countryCode: null,
                zipCode: null,
                address: null,
                country: null,
                state: null,
                city: null,
                isBlocked: null,
                createdAt: null,
                updatedAt: null,
            };
            state.token = null;
            state.isLoggedIn = false;
        },
    },
});

export default personalDetailsSlice;
