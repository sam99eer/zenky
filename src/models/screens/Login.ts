export interface ILoginModel {
    email: string;
    password: string;
}

export interface IRegisterModel extends ILoginModel {
    name: string;
}

export interface ISuccessDataResponse {
    data: {
        token: string;
    };
    error: string;
    message: string;
    status: number;
}
