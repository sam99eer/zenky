import { InfiniteData } from 'react-query';
import { IProductDetails } from 'src/models/api/GetProductsModel';
import { IWishlistData } from 'src/models/api/WishlistModel';

export const isReviewDataValid = (data: unknown): data is IProductDetails => {
    if (
        !!data &&
        typeof data === 'object' &&
        'reviews' in data &&
        Array.isArray(data.reviews)
    ) {
        return true;
    }
    return false;
};

export const isWishlistRemoveValid = (
    data: unknown
): data is InfiniteData<IWishlistData> => {
    if (
        !!data &&
        typeof data === 'object' &&
        'pages' in data &&
        Array.isArray(data.pages)
    ) {
        return true;
    }
    return false;
};
