export interface ICategoryResponse {
    data: ICategoryData;
    error: string;
    message: string;
    status: number;
}

export interface ICategoryData {
    MEN: ICategoryItem[];
    WOMEN: ICategoryItem[];
    KIDS: ICategoryItem[];
}

interface ICategoryItem {
    _id: string;
    name: string;
    for: string;
    createdAt: string;
    updatedAt: string;
}
