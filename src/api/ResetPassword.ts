import { ApiClient } from 'src/api/ApiClient';
import { CommonApiResponse } from 'src/models/data/CommonApiResponse';
import { IForgotData } from 'src/models/screens/Forgot';
import { Endpoints } from 'src/utils/Endpoints';

export const ResetPassword = async (data: IForgotData) => {
    const apiCall = await ApiClient.post(Endpoints.RESET_PASSWORD, data);
    const apiData: CommonApiResponse = apiCall.data;
    return apiData;
};
