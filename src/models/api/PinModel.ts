export interface IPinResponse {
    data: IPinData;
    error: string;
    message: string;
    status: number;
}

interface IPinData {
    pincode: string;
    is_deliverable: boolean;
}
