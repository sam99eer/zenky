import { ApiClient } from 'src/api/ApiClient';
import { IProductDetailsResponse } from 'src/models/api/GetProductsModel';
import { Endpoints } from 'src/utils/Endpoints';

export const GetProductDetails = async (id: string) => {
    const apiCall = await ApiClient.get(`${Endpoints.PRODUCT}/${id}`);
    const apiData: IProductDetailsResponse = apiCall.data;

    if (apiData.status === 200) {
        return apiData.data;
    }

    throw new Error('Unable to get product details');
};
