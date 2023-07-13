import { ApiClient } from 'src/api/ApiClient';
import { IProfileResponse } from 'src/models/screens/Profile';
import { Endpoints } from 'src/utils/Endpoints';

export const GetProfile = async (token: string) => {
    const apiCall = await ApiClient.get(Endpoints.PROFILE, {
        headers: {
            Authorization: token,
        },
    });
    const apiData: IProfileResponse = apiCall.data;

    return apiData;
};
