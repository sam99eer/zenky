import { useCallback, useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GetOrders } from 'src/api/GetOrders';
import { IStoreModel } from 'src/store';
import { formatServerTimestamp } from 'src/utils/Helpers';
import { Keys } from 'src/utils/Keys';
import { Screens } from 'src/utils/Screens';

const OrdersPane = (props: { isOrderActive: boolean }) => {
    const token = useSelector(
        (state: IStoreModel) => state.personalDetailsReducer.token
    );

    const {
        data,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isFetching,
    } = useInfiniteQuery(
        Keys.ORDERS,
        ({ pageParam }) =>
            GetOrders({
                pageNumber: pageParam ?? 1,
                token: token!,
            }),
        {
            getNextPageParam: (lastPage) =>
                Math.ceil(lastPage?.totalItems / 20) > +lastPage?.pageNumber
                    ? +lastPage?.pageNumber + 1
                    : undefined,
        }
    );

    const intersectionRef = useRef<HTMLDivElement>(null);

    const orderData = !!data ? data?.pages?.flatMap((item) => item.items) : [];

    const intersectionCallback: IntersectionObserverCallback = useCallback(
        (entries) => {
            const target = entries[0];
            if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        },
        [hasNextPage, isFetchingNextPage]
    );

    useEffect(() => {
        const observer = new IntersectionObserver(intersectionCallback, {
            rootMargin: '0px',
        });

        const { current: lastElement } = intersectionRef;
        if (lastElement) {
            observer.observe(lastElement);
        }

        return () => {
            if (lastElement) {
                observer.unobserve(lastElement);
            }
        };
    }, [intersectionCallback]);

    return (
        <div
            className={`tab-pane fade ${
                props.isOrderActive ? 'active show' : ''
            }`}
            id='orders'
            role='tabpanel'
        >
            <div className='myaccount-content'>
                <div className='myaccount-table table-responsive text-center'>
                    <table className='table table-bordered'>
                        <thead className='thead-light'>
                            <tr>
                                <th>Order</th>
                                <th>Date</th>
                                <th>Payment Status</th>
                                <th>Order Status</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderData?.length > 0 &&
                                orderData?.map((item, index) => (
                                    <tr key={item?._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {formatServerTimestamp(
                                                item?.updatedAt
                                            )}
                                        </td>
                                        <td>{item?.payment_status}</td>
                                        <td>{item?.order_status}</td>
                                        <td>₹{item?.total_amount}</td>
                                        <td>
                                            <Link
                                                to={`${Screens.ORDER_DETAILS}/${item?._id}`}
                                                className='check-btn sqr-btn '
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            {isLoading || isFetching || isFetchingNextPage ? (
                                <>
                                    <tr>
                                        <td>
                                            <span className='grey'></span>
                                        </td>
                                        <td>
                                            <span className='grey'></span>
                                        </td>
                                        <td>
                                            <span className='grey'></span>
                                        </td>
                                        <td>
                                            <span className='grey'></span>
                                        </td>
                                        <td>
                                            <span className='grey'></span>
                                        </td>
                                        <td>
                                            <span className='grey'></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span className='grey'></span>
                                        </td>
                                        <td>
                                            <span className='grey'></span>
                                        </td>
                                        <td>
                                            <span className='grey'></span>
                                        </td>
                                        <td>
                                            <span className='grey'></span>
                                        </td>
                                        <td>
                                            <span className='grey'></span>
                                        </td>
                                        <td>
                                            <span className='grey'></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span className='grey'></span>
                                        </td>
                                        <td>
                                            <span className='grey'></span>
                                        </td>
                                        <td>
                                            <span className='grey'></span>
                                        </td>
                                        <td>
                                            <span className='grey'></span>
                                        </td>
                                        <td>
                                            <span className='grey'></span>
                                        </td>
                                        <td>
                                            <span className='grey'></span>
                                        </td>
                                    </tr>
                                </>
                            ) : null}
                        </tbody>
                    </table>
                    <div ref={intersectionRef} style={{ height: '10px' }} />
                </div>
            </div>
        </div>
    );
};

export default OrdersPane;
