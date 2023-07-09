import axios from 'axios';
import { CONSTANTS } from 'src/utils/Constants';

export const ApiClient = axios.create({
    baseURL: CONSTANTS.HOST + CONSTANTS.API_VERSION,
    timeout: 25000,
});
