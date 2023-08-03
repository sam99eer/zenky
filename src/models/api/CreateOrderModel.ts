import { ICheckoutForm } from 'src/models/screens/Checkout';

type ICreateOrder = Omit<ICheckoutForm, 'notes'>;

interface IOrderCart {
    size: string;
    quantity: number;
    colorId: string;
    productId: string;
}

export interface IOrderData {
    delivery_details: ICreateOrder;
    additional_info: string;
    products_details: IOrderCart[];
}

export interface ICreateOrderPayload {
    data: IOrderData;
    token: string;
}
