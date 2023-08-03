export interface IPinResponse {
    data: IPinData;
    error: string;
    message: string;
    status: number;
}

interface IPinData {
    _id: string;
    District: string;
    Name: string;
    PINCode: number;
    State: string;
    isEnabled: boolean;
    Country: string;
    createdAt: string;
    updatedAt: string;
}
