import Slider from 'react-slick';

export interface IProductSlider {
    leftSlider: Slider | null;
    rightSlider: Slider | null;
}

export interface IReviewPayload {
    data: {
        rating: number;
        review: string;
        productId: string;
    };
    token: string;
}

export interface IProductData {
    size: string | null;
    colorId: string | null;
    colorName: string | null;
}
