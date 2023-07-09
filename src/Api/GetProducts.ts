import { ApiClient } from 'src/Api/ApiClient';
import {
    IGetProductsPayload,
    IGetProductsResponse,
} from 'src/models/api/GetProductsModel';
import { Endpoints } from 'src/utils/Endpoints';

export const GetProducts = async (data: IGetProductsPayload) => {
    const apiCall = await ApiClient.get(
        `${Endpoints.GET_PRODUCTS}?pageNumber=${data.pageNumber}${
            data?.pageSize ? `&pageSize=${data.pageSize}` : ''
        }`
    );
    const apiData: IGetProductsResponse = apiCall.data;

    if (apiData.status === 200) {
        return apiData.data;
    }

    throw new Error('Unable to get products');
};
