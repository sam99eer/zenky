export interface IOrderDetailsPayload {
    id: string;
    token: string;
}

export interface IOrderDetailsResponse {
    data: IOrderDetailsData;
    error: string;
    message: string;
    status: number;
}

export interface IOrderDetailsData {
    _id: string;
    userId: string;
    products_details: Productsdetail[];
    delivery_details: Deliverydetails;
    additional_info: string;
    order_id: string;
    shiprocket_order_id: string;
    shiprocket_shipment_id: string;
    payment_id: string;
    total_amount: number;
    order_status: string;
    payment_status: string;
    payment_type: string;
    createdAt: string;
    updatedAt: string;
    trackingData: TrackingData;
}

export interface TrackingData {
    tracking_data: Trackingdata;
}

interface Trackingdata {
    track_status: number;
    error: string;
}

interface Deliverydetails {
    firstName: string;
    lastName: string;
    companyName: string;
    streetAddress1: string;
    streetAddress2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
    email: string;
}

interface Productsdetail {
    product_color_name: string;
    product_color_code: string;
    product_name: string;
    product_price: number;
    quantity: number;
    size: string;
    productId: string;
    colorId: string;
}
