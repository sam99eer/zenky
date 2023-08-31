import { ApiClient } from 'src/api/ApiClient';
import {
    IOrderDetailsPayload,
    IOrderDetailsResponse,
} from 'src/models/api/OrderDetailsModel';
import { Endpoints } from 'src/utils/Endpoints';

export const GetOrderDetails = async (data: IOrderDetailsPayload) => {
    const apiCall = await ApiClient.get(`${Endpoints.ORDER}/${data.id}`, {
        headers: {
            Authorization: data.token,
        },
    });
    const apiData: IOrderDetailsResponse = apiCall.data;

    if (apiData.status === 200) {
        return apiData.data;
    }

    throw new Error('Unable to get order details');
};
