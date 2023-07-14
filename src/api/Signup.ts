import { ApiClient } from 'src/api/ApiClient';
import { IRegisterModel, ISuccessDataResponse } from 'src/models/screens/Login';
import { Endpoints } from 'src/utils/Endpoints';

export const Signup = async (data: IRegisterModel) => {
    const apiCall = await ApiClient.post(Endpoints.REGISTER, data);
    const apiData: ISuccessDataResponse = apiCall.data;
    return apiData;
};
