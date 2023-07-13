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
