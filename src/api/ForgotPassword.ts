import { ApiClient } from 'src/api/ApiClient';
import { CommonApiResponse } from 'src/models/data/CommonApiResponse';
import { Endpoints } from 'src/utils/Endpoints';

export const ForgotPassword = async (email: string) => {
    const apiCall = await ApiClient.post(Endpoints.SEND_OTP, { email });
    const apiData: CommonApiResponse = apiCall.data;
    return apiData;
};
