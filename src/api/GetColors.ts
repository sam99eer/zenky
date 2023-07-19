import { ApiClient } from 'src/api/ApiClient';
import { IColorResponse } from 'src/models/api/ColorModel';
import { Endpoints } from 'src/utils/Endpoints';

export const GetColors = async () => {
    const apiCall = await ApiClient.get(Endpoints.COLOR_LIST);
    const apiData: IColorResponse = apiCall.data;
    return apiData;
};
