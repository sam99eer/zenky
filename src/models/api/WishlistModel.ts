export interface IWishlistPayload {
    token: string;
    pageNumber: number;
}

export interface IWishlistResponse {
    data: IWishlistData;
    error: string;
    message: string;
    status: number;
}

export interface IWishlistData {
    items: IWishListItem[];
    totalItems: number;
    pageNumber: string;
    pageSize: string;
}

export interface IWishListItem {
    _id: string;
    userId: string;
    productId: string;
    createdAt: string;
    updatedAt: string;
    product: IWishlistProduct;
}

interface IWishlistProduct {
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
}

export interface IPostWishlistPayload {
    productId: string;
    token: string;
}

export interface IPostWishlistResponse {
    data: WishlistProduct;
    error: string;
    message: string;
    status: number;
}

interface WishlistProduct {
    id: string;
}
