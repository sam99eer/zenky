import { ApiClient } from 'src/api/ApiClient';
import type {
    T_Send_Otp_Payload,
    T_Send_Otp_Response,
} from 'src/models/api/OtpModel';
import { Endpoints } from 'src/utils/Endpoints';

export const SendMobileOtp = async (data: T_Send_Otp_Payload) => {
    const apiCall = await ApiClient.post(Endpoints.SEND_MOBILE_OTP, data.data, {
        headers: {
            Authorization: data.token,
        },
    });
    const apiData: T_Send_Otp_Response = apiCall.data;
    return apiData;
};
