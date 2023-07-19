import { ApiClient } from 'src/api/ApiClient';
import {
    IPostWishlistPayload,
    IPostWishlistResponse,
} from 'src/models/api/WishlistModel';
import { Endpoints } from 'src/utils/Endpoints';

export const PostWishlist = async (data: IPostWishlistPayload) => {
    const apiCall = await ApiClient.put(
        Endpoints.WISHLIST,
        {
            productId: data.productId,
        },
        {
            headers: {
                Authorization: data.token,
            },
        }
    );
    const apiData: IPostWishlistResponse = apiCall.data;

    return apiData;
};
