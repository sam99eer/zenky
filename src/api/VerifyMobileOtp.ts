import { ApiClient } from 'src/api/ApiClient';
import type { T_Verify_Otp_Payload } from 'src/models/api/OtpModel';
import { CommonApiResponse } from 'src/models/data/CommonApiResponse';
import { Endpoints } from 'src/utils/Endpoints';

export const VerifyMobileOtp = async (data: T_Verify_Otp_Payload) => {
    const apiCall = await ApiClient.post(
        Endpoints.VERIFY_MOBILE_OTP,
        data.data,
        {
            headers: {
                Authorization: data.token,
            },
        }
    );
    const apiData: CommonApiResponse = apiCall.data;
    return apiData;
};
