import { ApiClient } from 'src/api/ApiClient';
import { CommonApiResponse } from 'src/models/data/CommonApiResponse';
import { IVerifyOtpPayload } from 'src/models/screens/Login';
import { Endpoints } from 'src/utils/Endpoints';

export const VerifyAuthOtp = async (data: IVerifyOtpPayload) => {
    const { token, ...payload } = data;
    const apiCall = await ApiClient.post(Endpoints.VERIFY_AUTH_OTP, payload, {
        headers: {
            Authorization: token,
        },
    });
    const apiData: CommonApiResponse = apiCall.data;
    return apiData;
};
