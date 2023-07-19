import { ApiClient } from 'src/api/ApiClient';
import { IGetProductsResponse } from 'src/models/api/GetProductsModel';
import { IFilterPayload } from 'src/models/data/FilterModel';
import { Endpoints } from 'src/utils/Endpoints';

export const GetFilteredProducts = async (data: IFilterPayload) => {
    const urlData = new URLSearchParams();

    if (data.filters.color) {
        urlData.append('color', data.filters.color);
    }

    if (data.filters.filter) {
        urlData.append('filter', data.filters.filter);
    }

    if (data.filters.minPrice) {
        urlData.append('minPrice', data.filters.minPrice.toString());
    }

    if (data.filters.maxPrice) {
        urlData.append('maxPrice', data.filters.maxPrice.toString());
    }

    if (data.filters.sizes.length > 0) {
        urlData.append('sizes', data.filters.sizes.toString());
    }

    if (data.filters.isAvaliable) {
        urlData.append('isAvaliable', data.filters.isAvaliable.toString());
    }

    if (data.filters.sortColumn) {
        urlData.append('sortColumn', data.filters.sortColumn);
    }

    if (data.filters.sortBy) {
        urlData.append('sortBy', data.filters.sortBy.toString());
    }

    const queryString = urlData.toString();

    const apiCall = await ApiClient.get(
        `${Endpoints.GET_PRODUCTS}?pageNumber=${data.pageNumber}${
            !!queryString ? '&' + queryString : ''
        }`
    );
    const apiData: IGetProductsResponse = apiCall.data;

    if (apiData.status === 200) {
        return apiData.data;
    }

    throw new Error('Unable to get products');
};
