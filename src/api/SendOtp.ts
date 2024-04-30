import { ApiClient } from 'src/api/ApiClient';
import {
    ISendOtpPayloadModel,
    ISendOtpResponse,
} from 'src/models/screens/Login';
import { Endpoints } from 'src/utils/Endpoints';

export const SendOtp = async (data: ISendOtpPayloadModel) => {
    const apiCall = await ApiClient.post(Endpoints.SEND_LOGIN_OTP, data);
    const apiData: ISendOtpResponse = apiCall.data;
    return apiData;
};
