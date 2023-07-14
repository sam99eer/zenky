import { ApiClient } from 'src/api/ApiClient';
import { ILoginModel, ISuccessDataResponse } from 'src/models/screens/Login';
import { Endpoints } from 'src/utils/Endpoints';

export const LoginUser = async (data: ILoginModel) => {
    const apiCall = await ApiClient.post(Endpoints.LOGIN, data);
    const apiData: ISuccessDataResponse = apiCall.data;
    return apiData;
};
