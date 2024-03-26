export type T_Send_Otp_Response = {
    data: T_Phone_Data;
    error: string;
    message: string;
    status: number;
};

export type T_Phone_Data = {
    phoneNumber: string;
    countryCode: string;
};

export type T_Send_Otp_Payload = {
    data: T_Phone_Data;
    token: string;
};

export type T_Verify_Otp_Payload = {
    data: T_Phone_Data & {
        otp: string;
    };
    token: string;
};
