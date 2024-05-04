import { ApiClient } from 'src/api/ApiClient';
import {
    ISendAuthOtpPayloadModel,
    ISendOtpResponse,
} from 'src/models/screens/Login';
import { Endpoints } from 'src/utils/Endpoints';

export const SendAuthOtp = async (data: ISendAuthOtpPayloadModel) => {
    const { token, ...payload } = data;
    const apiCall = await ApiClient.post(Endpoints.SEND_MOBILE_OTP, payload, {
        headers: {
            Authorization: token,
        },
    });
    const apiData: ISendOtpResponse = apiCall.data;
    return apiData;
};
