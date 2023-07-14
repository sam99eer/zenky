import { ApiClient } from 'src/api/ApiClient';
import {
    IWishlistPayload,
    IWishlistResponse,
} from 'src/models/api/WishlistModel';
import { Endpoints } from 'src/utils/Endpoints';

export const GetWishlist = async (data: IWishlistPayload) => {
    const apiCall = await ApiClient.get(
        `${Endpoints.WISHLIST}?pageNumber=${data.pageNumber}`,
        {
            headers: {
                Authorization: data.token,
            },
        }
    );
    const apiData: IWishlistResponse = apiCall.data;

    return apiData.data;
};
