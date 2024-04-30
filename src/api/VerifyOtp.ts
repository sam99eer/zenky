import { ApiClient } from 'src/api/ApiClient';
import {
    IVerifyOtpPayload,
    IVerifyOtpResponse,
} from 'src/models/screens/Login';
import { Endpoints } from 'src/utils/Endpoints';

export const VerifyOtp = async (data: IVerifyOtpPayload) => {
    const apiCall = await ApiClient.post(Endpoints.VERIFY_OTP, data);
    const apiData: IVerifyOtpResponse = apiCall.data;
    return apiData;
};
