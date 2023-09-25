import { Link } from 'react-router-dom';
import { IOrderDetailsData } from 'src/models/api/OrderDetailsModel';
import {
    formatServerImagePath,
    formatServerTimestamp,
} from 'src/utils/Helpers';
import { Screens } from 'src/utils/Screens';
import NoImage from '/assets/images/no-image.jpg';

const OrderInfo = (props: { data?: IOrderDetailsData }) => {
    return (
        <div className='faq-wrap'>
            <h2>Order Details</h2>
            <div className='row'>
                <div className='col-lg-6 col-md-6'>
                    <div className='single-faq-wrap mb-50'>
                        <h3>Order Information</h3>
                        <h4>
                            Order Date -{' '}
                            {formatServerTimestamp(props?.data?.createdAt!)}
                        </h4>
                        {props?.data?.products_details?.map((item) => (
                            <div
                                key={`${item?.productId}_${item?.colorId}_${item?.size}`}
                                className='order-item'
                            >
                                <Link
                                    to={`${Screens.PRODUCT_DETAILS}/${item?.productId}`}
                                >
                                    <img
                                        src={
                                            !!item?.product_image
                                                ? formatServerImagePath(
                                                      item?.product_image
                                                  )
                                                : NoImage
                                        }
                                        alt={item?.product_name}
                                    />
                                </Link>
                                <div>
                                    <h4>
                                        {item?.quantity} x {item?.product_name}
                                    </h4>
                                    <h4 className='d-flex align-items-center gap-2'>
                                        Color - {item?.product_color_name}{' '}
                                        <span
                                            data-bs-toggle='tooltip'
                                            data-bs-placement='top'
                                            title={item?.product_color_code}
                                            style={{
                                                backgroundColor:
                                                    item?.product_color_code,
                                            }}
                                        ></span>
                                    </h4>
                                    <h4>Cost - ₹{item?.product_price}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='col-lg-6 col-md-6'>
                    <div className='single-faq-wrap mb-50'>
                        <h3>Delivery Details</h3>
                        <h4>{`${props?.data?.delivery_details?.firstName} ${props?.data?.delivery_details?.lastName}`}</h4>
                        <h4>{props?.data?.delivery_details?.streetAddress1}</h4>
                        {!!props?.data?.delivery_details?.streetAddress2 ? (
                            <h4>
                                {props?.data?.delivery_details?.streetAddress2}
                            </h4>
                        ) : null}
                        <h4>{props?.data?.delivery_details?.city}</h4>
                        <h4>
                            {props?.data?.delivery_details?.state} -{' '}
                            {props?.data?.delivery_details?.zip}
                        </h4>
                        <h4>{props?.data?.delivery_details?.country}</h4>
                        <h4>{props?.data?.delivery_details?.phone}</h4>
                    </div>
                </div>
                <div className='col-lg-6 col-md-6'>
                    <div className='single-faq-wrap mb-50'>
                        <h3>Payment Details</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Total Amount</td>
                                    <td>₹{props?.data?.total_amount}</td>
                                </tr>
                                <tr>
                                    <td>Payment Status</td>
                                    <td>{props?.data?.payment_status}</td>
                                </tr>
                                <tr>
                                    <td>Payment Type</td>
                                    <td>{props?.data?.payment_type}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderInfo;
