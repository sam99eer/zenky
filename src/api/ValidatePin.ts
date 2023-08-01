import { ApiClient } from 'src/api/ApiClient';
import { CommonApiResponse } from 'src/models/data/CommonApiResponse';
import { Endpoints } from 'src/utils/Endpoints';

export const ValidatePin = async (pincode: string) => {
    const apiCall = await ApiClient.post(Endpoints.VALIDATE_PIN, {
        PINCode: pincode,
    });
    const apiData: CommonApiResponse = apiCall.data;

    return apiData;
};
