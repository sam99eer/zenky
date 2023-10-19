import { ApiClient } from 'src/api/ApiClient';
import { IPinResponse } from 'src/models/api/PinModel';
import { Endpoints } from 'src/utils/Endpoints';

export const ValidatePin = async (pincode: string) => {
    const apiCall = await ApiClient.get(`${Endpoints.VALIDATE_PIN}/${pincode}`);
    const apiData: IPinResponse = apiCall.data;

    return apiData;
};
