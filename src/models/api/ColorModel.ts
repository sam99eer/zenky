export interface IColorResponse {
    data: IColorData;
    error: string;
    message: string;
    status: number;
}

interface IColorData {
    colors: string[];
}
