import { ApiClient } from 'src/api/ApiClient';
import { ICreateOrderPayload } from 'src/models/api/CreateOrderModel';
import { CommonApiResponse } from 'src/models/data/CommonApiResponse';
import { Endpoints } from 'src/utils/Endpoints';

export const CreateOrder = async (data: ICreateOrderPayload) => {
    const apiCall = await ApiClient.post(Endpoints.CREATE_ORDER, data.data, {
        headers: {
            Authorization: data.token,
        },
    });
    const apiData: CommonApiResponse = apiCall.data;

    return apiData;
};
