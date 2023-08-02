import { ApiClient } from 'src/api/ApiClient';
import { IFeaturedResponse } from 'src/models/api/FeaturedProductModel';
import { Endpoints } from 'src/utils/Endpoints';

export const GetFeaturedProduct = async () => {
    const apiCall = await ApiClient.get(Endpoints.FEATURED_PRODUCT);
    const apiData: IFeaturedResponse = apiCall.data;
    return apiData;
};
