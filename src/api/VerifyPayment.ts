import { ApiClient } from 'src/api/ApiClient';
import {
    IVerifyPaymentPayload,
    IVerifyPaymentResponse,
} from 'src/models/api/VerifyPaymentModel';
import { Endpoints } from 'src/utils/Endpoints';

export const VerifyPayment = async (data: IVerifyPaymentPayload) => {
    const apiCall = await ApiClient.post(Endpoints.VERIFY_PAYMENT, data.data, {
        headers: {
            Authorization: data.token,
        },
    });
    const apiData: IVerifyPaymentResponse = apiCall.data;

    return apiData;
};
