export interface ICartItemPayload {
    _id: string;
    name: string;
    image: string;
    price: number;
}

export interface ICartItem extends ICartItemPayload {
    totalPrice: number;
    quantity: number;
}

export interface ICartSlice {
    cartItem: ICartItem[];
}
