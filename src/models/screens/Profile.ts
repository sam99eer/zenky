export interface IProfileResponse {
    data: IProfileData;
    error: string;
    message: string;
    status: number;
}

export interface IProfileData {
    _id: string | null;
    email: string | null;
    role: string | null;
    name: string | null;
    image: string | null;
    phoneNumber: string | null;
    countryCode: string | null;
    zipCode: string | null;
    address: string | null;
    country: string | null;
    state: string | null;
    city: string | null;
    isBlocked: boolean | null;
    createdAt: string | null;
    updatedAt: string | null;
}

export type IProfileNeededData = Omit<
    IProfileData,
    | '_id'
    | 'role'
    | 'image'
    | 'countryCode'
    | 'isBlocked'
    | 'createdAt'
    | 'updatedAt'
>;

export interface IProfilePayload {
    data: FormData;
    token: string;
}

export interface IChangePassword {
    oldPassword: string;
    newPassword: string;
}

export interface IChangePasswordPayload {
    data: IChangePassword;
    token: string;
}

export type T_Otp_Form = 'email' | 'mobile' | null;
export interface IOtpForm {
    onSave: (otp: string) => void;
    onClose: () => void;
}

export interface T_Otp_Modal {
    type: T_Otp_Form;
    isVisible: boolean;
}
