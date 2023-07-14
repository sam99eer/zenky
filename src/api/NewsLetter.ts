import { ApiClient } from 'src/api/ApiClient';
import { INewsletterResponse } from 'src/models/api/NewsletterModel';
import { Endpoints } from 'src/utils/Endpoints';

export const NewsLetter = async (email: string) => {
    const apiCall = await ApiClient.post(Endpoints.NEWSLETTER, {
        email,
    });
    const apiData: INewsletterResponse = apiCall.data;

    return apiData;
};
