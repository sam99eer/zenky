import { ApiClient } from 'src/api/ApiClient';
import { IOrderPayload, IOrdersResponse } from 'src/models/api/OrdersModel';
import { Endpoints } from 'src/utils/Endpoints';

export const GetOrders = async (data: IOrderPayload) => {
    const apiCall = await ApiClient.get(
        `${Endpoints.ORDERS}?pageNumber=${data.pageNumber}`,
        {
            headers: {
                Authorization: data.token,
            },
        }
    );
    const apiData: IOrdersResponse = apiCall.data;
    if (apiData.status === 200) return apiData.data;
    throw new Error(apiData?.error || 'Unable to get orders');
};
