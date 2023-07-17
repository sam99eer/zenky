export interface IGetProductsPayload {
    pageNumber: number;
    pageSize?: number;
}

export interface IGetProductsResponse {
    data: IGetProductsData;
    error: string;
    message: string;
    status: number;
}

interface IGetProductsData {
    items: IGetProductItem[];
    totalItems: number;
    pageNumber: string;
    pageSize: string;
}

export interface IGetProductItem {
    _id: string;
    for: string;
    name: string;
    image: string;
    price: number;
    description: string;
    sizes: string[];
    isAvaliable: boolean;
    createdAt: string;
    updatedAt: string;
    colors: Color[];
    rating?: number;
    ratedBy: number;
}

interface Color {
    _id: string;
    name: string;
    color_code: string;
    productId: string;
    image1?: string;
    image2?: string;
    image3?: string;
    isAvaliable: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IProductDetails extends IGetProductItem {
    reviews: IReview[];
}

export interface IProductDetailsResponse {
    data: IProductDetails;
    error: string;
    message: string;
    status: number;
}
export interface IReview {
    _id: string;
    rating: number;
    review: string;
    reviewDate: string;
    reviewUser: ReviewUser;
}

interface ReviewUser {
    email: string;
    name: string;
    image: string;
}

export interface IReviewResponse {
    data: IReviewUpdateResponse;
    error: string;
    message: string;
    status: number;
}

export interface IReviewUpdateResponse extends IReview {
    updatedAt: string;
}
