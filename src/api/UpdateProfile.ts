import { ApiClient } from 'src/api/ApiClient';
import { IProfilePayload, IProfileResponse } from 'src/models/screens/Profile';
import { Endpoints } from 'src/utils/Endpoints';

export const UpdateProfile = async (data: IProfilePayload) => {
    const apiCall = await ApiClient.post(Endpoints.UPDATE_PROFILE, data.data, {
        headers: {
            Authorization: data.token,
            'Content-Type': 'multipart/form-data',
        },
    });
    const apiData: IProfileResponse = apiCall.data;
    return apiData;
};
