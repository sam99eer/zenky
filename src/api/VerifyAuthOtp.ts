import { ApiClient } from 'src/api/ApiClient';
import { CommonApiResponse } from 'src/models/data/CommonApiResponse';
import { IVerifyAuthOtpPayload } from 'src/models/screens/Login';
import { Endpoints } from 'src/utils/Endpoints';

export const VerifyAuthOtp = async (data: IVerifyAuthOtpPayload) => {
    const { token, ...payload } = data;
    const apiCall = await ApiClient.post(Endpoints.VERIFY_AUTH_OTP, payload, {
        headers: {
            Authorization: token,
        },
    });
    const apiData: CommonApiResponse = apiCall.data;
    return apiData;
};
