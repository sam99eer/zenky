import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { GetOrderDetails } from 'src/api/GetOrderDetails';
import FeatureSkeleton from 'src/components/common/FeatureSkeleton';
import OrderInfo from 'src/components/pages/OrderDetails/OrderInfo';
import TrackingInfo from 'src/components/pages/OrderDetails/TrackingInfo';
import { IStoreModel } from 'src/store';
import { Keys } from 'src/utils/Keys';
import { Screens } from 'src/utils/Screens';

const OrderData = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const token = useSelector(
        (state: IStoreModel) => state.personalDetailsReducer.token
    );
    const { data, isLoading } = useQuery(
        [Keys.GET_ORDER_DETAILS, orderId],
        GetOrderDetails.bind(this, {
            id: orderId!,
            token: token!,
        }),
        {
            onError: () => {
                navigate(Screens.DUMMY_NOT_FOUND);
            },
        }
    );

    return (
        <div className='faq-area pt-90 pb-45'>
            <div className='custom-container-8'>
                {isLoading ? (
                    <FeatureSkeleton />
                ) : (
                    <div className='row'>
                        <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                            <OrderInfo data={data} />
                            <TrackingInfo data={data?.trackingData} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderData;
