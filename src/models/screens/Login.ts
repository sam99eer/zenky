export interface ILoginModel {
    username: string;
    otp: string;
}

export interface ISendOtpPayloadModel {
    phoneNumber: string;
    countryCode: string;
    email: string;
}

export interface ISendAuthOtpPayloadModel extends ISendOtpPayloadModel {
    token: string;
}

export interface IVerifyOtpPayload extends ISendOtpPayloadModel {
    otp: string;
}

export interface IVerifyAuthOtpPayload extends ISendAuthOtpPayloadModel {
    otp: string;
}

export interface ISendOtpResponse {
    data: ISendOtpData;
    error: string;
    message: string;
    status: number;
}

interface ISendOtpData {
    phoneNumber: string;
    countryCode: string;
    email: string;
}

export interface IVerifyOtpResponse {
    data: ILoginData;
    error: string;
    message: string;
    status: number;
}

interface ILoginData {
    token: string;
    isNew: boolean;
    user: User;
}

interface User {
    email?: string;
    role: string;
    otp: null;
    image: string;
    zipCode: string;
    address: string;
    country: string;
    state: string;
    city: string;
    isBlocked: boolean;
    countryCode?: string;
    name?: string;
    phoneNumber?: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
}
