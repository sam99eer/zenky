import { ApiClient } from 'src/api/ApiClient';
import {
    ICreateOrderPayload,
    ICreateOrderResponse,
} from 'src/models/api/CreateOrderModel';
import { Endpoints } from 'src/utils/Endpoints';

export const CreateOrder = async (data: ICreateOrderPayload) => {
    const apiCall = await ApiClient.post(Endpoints.CREATE_ORDER, data.data, {
        headers: {
            Authorization: data.token,
        },
    });
    const apiData: ICreateOrderResponse = apiCall.data;

    return apiData;
};
