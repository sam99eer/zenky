import { ApiClient } from 'src/api/ApiClient';
import { CommonApiResponse } from 'src/models/data/CommonApiResponse';
import { IChangePasswordPayload } from 'src/models/screens/Profile';
import { Endpoints } from 'src/utils/Endpoints';

export const ChangeUserPassword = async (data: IChangePasswordPayload) => {
    const apiCall = await ApiClient.post(Endpoints.CHANGE_PASSWORD, data.data, {
        headers: {
            Authorization: data.token,
        },
    });
    const apiData: CommonApiResponse = apiCall.data;
    return apiData;
};
