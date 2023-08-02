export interface IFeaturedResponse {
    data: IFeaturedData[];
    error: string;
    message: string;
    status: number;
}

interface IFeaturedData {
    _id: string;
    productId: string;
    image: string;
    image_alignment: string;
    label: string;
    createdAt: string;
    updatedAt: string;
    product: Product;
}

interface Product {
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
