import ReviewPane from 'src/components/pages/ProductDetails/ReviewPane';
import ShippingPane from 'src/components/pages/ProductDetails/ShippingPane';
import { IProductDetails } from 'src/models/api/GetProductsModel';

const ReviewSection = (props: {
    isLoading: boolean;
    data: IProductDetails | undefined;
}) => {
    return (
        <div className='description-review-area pb-100'>
            <div className='custom-container-6'>
                <div className='row'>
                    <div className='col-lg-12 col-md-12'>
                        {props?.isLoading ? (
                            <div className='skeleton-2r3nin5n6xw'></div>
                        ) : (
                            <div className='description-review-wrapper'>
                                <div className='description-review-topbar nav'>
                                    <a
                                        className='active'
                                        data-bs-toggle='tab'
                                        href='#review-tab'
                                    >
                                        Reviews ({props?.data?.reviews?.length})
                                    </a>
                                    <a
                                        data-bs-toggle='tab'
                                        href='#shipping-tab'
                                    >
                                        Shipping & Delivery
                                    </a>
                                </div>
                                <div className='tab-content description-review-bottom'>
                                    <ReviewPane
                                        data={props.data?.reviews || []}
                                    />
                                    <ShippingPane />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewSection;
