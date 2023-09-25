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
    tracking_data: ISuccessTrack | IFailTrack;
}

interface IFailTrack {
    track_status: 0;
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
    product_image?: string;
}

interface ISuccessTrack {
    track_status: 1;
    shipment_status: number;
    shipment_track: Shipmenttrack[];
    shipment_track_activities: Shipmenttrackactivity[];
    track_url: string;
    etd: string;
    qc_response: Qcresponse;
}

interface Qcresponse {
    qc_image: string;
    qc_failed_reason: string;
}

interface Shipmenttrackactivity {
    date: string;
    status: string;
    activity: string;
    location: string;
    'sr-status': number | string;
}

interface Shipmenttrack {
    id: number;
    awb_code: string;
    courier_company_id: number;
    shipment_id: number;
    order_id: number;
    pickup_date?: any;
    delivered_date?: any;
    weight: string;
    packages: number;
    current_status: string;
    delivered_to: string;
    destination: string;
    consignee_name: string;
    origin: string;
    courier_agent_details?: any;
    courier_name: string;
    edd: string;
    pod: string;
    pod_status: string;
    rto_delivered_date: string;
}
