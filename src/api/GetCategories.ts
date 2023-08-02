import { ApiClient } from 'src/api/ApiClient';
import { ICategoryResponse } from 'src/models/api/CategoriesModel';
import { Endpoints } from 'src/utils/Endpoints';

export const GetCategories = async () => {
    const apiCall = await ApiClient.get(Endpoints.CATEGORIES);
    const apiData: ICategoryResponse = apiCall.data;
    return apiData;
};
