import { ApiClient } from 'src/api/ApiClient';
import { CommonApiResponse } from 'src/models/data/CommonApiResponse';
import { IContactForm } from 'src/models/screens/Contact';
import { Endpoints } from 'src/utils/Endpoints';

export const SendMessage = async (data: IContactForm) => {
    const apiCall = await ApiClient.post(Endpoints.SEND_MESSAGE, data);
    const apiData: CommonApiResponse = apiCall.data;
    return apiData;
};
