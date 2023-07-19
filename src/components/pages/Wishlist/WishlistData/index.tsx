import { useCallback, useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { GetWishlist } from 'src/api/GetWishlist';
import EmptyWishlist from 'src/assets/EmptyWishlist';
import WishlistItem from 'src/components/pages/Wishlist/WishlistItem';
import { IStoreModel } from 'src/store';
import { Keys } from 'src/utils/Keys';

const WishlistData = () => {
    const token = useSelector(
        (state: IStoreModel) => state.personalDetailsReducer.token
    );

    const intersectionRef = useRef<HTMLDivElement>(null);

    const {
        data,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isFetching,
    } = useInfiniteQuery(
        Keys.WISHLIST,
        ({ pageParam }) =>
            GetWishlist({
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

    const wishlistData = !!data
        ? data?.pages?.flatMap((item) => item.items)
        : [];

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
        <div className='cart-main-area pt-95 pb-100'>
            <div className='container'>
                <div className='row'>
                    <div className='ms-auto me-auto col-lg-8 col-md-12 col-sm-12 col-12'>
                        {isLoading ? (
                            <div className='skeleton-564aqv2gpqj'></div>
                        ) : null}
                        {wishlistData?.length > 0 ? (
                            <>
                                <div className='table-content table-responsive cart-table-content'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th>Product</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {wishlistData?.map((item) => (
                                                <WishlistItem
                                                    key={item?._id}
                                                    data={item}
                                                />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div
                                    ref={intersectionRef}
                                    style={{ height: '10px' }}
                                />
                                {isFetchingNextPage ? (
                                    <div className='skeleton-564aqv2gpqj'></div>
                                ) : null}
                            </>
                        ) : !isLoading || !isFetching ? (
                            <div className='d-flex flex-column justify-content-center align-items-center mx-auto empty-wishlist'>
                                <div className='img-fluid svg-icon'>
                                    <EmptyWishlist />
                                </div>
                                <p className='py-5 fw-bold text-center'>
                                    Nothing here... Please add some items!
                                </p>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WishlistData;
