import { IProductDetails } from 'src/models/api/GetProductsModel';

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
