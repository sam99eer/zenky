export interface ICartItemPayload {
    _id: string;
    name: string;
    image: string;
    price: number;
    colorName: string;
    size: string;
}

export interface ICartItem extends ICartItemPayload {
    totalPrice: number;
    quantity: number;
    colorName: string;
    size: string;
}

export interface ICartSlice {
    cartItem: ICartItem[];
}
