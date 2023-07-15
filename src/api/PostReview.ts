// IReviewPayload

import { ApiClient } from 'src/api/ApiClient';
import { IReviewResponse } from 'src/models/api/GetProductsModel';
import { IReviewPayload } from 'src/models/screens/ProductDetails';
import { Endpoints } from 'src/utils/Endpoints';

export const PostReview = async (data: IReviewPayload) => {
    const apiCall = await ApiClient.post(Endpoints.POST_REVIEW, data.data, {
        headers: {
            Authorization: data.token,
        },
    });
    const apiData: IReviewResponse = apiCall.data;

    return apiData;
};
