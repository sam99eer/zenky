import { ApiClient } from 'src/api/ApiClient';
import { IHomeProductsResponse } from 'src/models/api/GetProductsModel';
import { Endpoints } from 'src/utils/Endpoints';

export const GetProducts = async () => {
    const apiCall = await ApiClient.get(Endpoints.HOME_PRODUCTS);

    const apiData: IHomeProductsResponse = apiCall.data;

    if (apiData.status === 200) {
        return apiData.data;
    }

    throw new Error('Unable to get products');
};
