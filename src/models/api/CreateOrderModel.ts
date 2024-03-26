import { ICheckoutForm } from 'src/models/screens/Checkout';

type ICreateOrder = Omit<ICheckoutForm, 'notes' | 'otp'>;

interface IOrderCart {
    size: string;
    quantity: number;
    colorId: string;
    productId: string;
}

export interface IOrderData {
    payment_type: 'ONLINE' | 'COD';
    delivery_details: ICreateOrder;
    additional_info: string;
    products_details: IOrderCart[];
}

export interface ICreateOrderPayload {
    data: IOrderData;
    token: string;
}

export interface ICreateOrderResponse {
    data: ICreateOrderData;
    error: string;
    message: string;
    status: number;
}

interface ICreateOrderData {
    order_id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: string;
    offer_id?: any;
    status: string;
    attempts: number;
    notes: string;
    created_at: number;
}
