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

    const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
        useInfiniteQuery(
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

    return (
        <div className='cart-main-area pt-95 pb-100'>
            <div className='container'>
                <div className='row'>
                    <div className='ms-auto me-auto col-lg-8 col-md-12 col-sm-12 col-12'>
                        <form action='#'>
                            <div className='table-content table-responsive cart-table-content'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th></th>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Add To Cart</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <WishlistItem />
                                        <WishlistItem />
                                        <WishlistItem />
                                    </tbody>
                                </table>
                            </div>
                        </form>
                        {false && (
                            <div className='d-flex flex-column justify-content-center align-items-center'>
                                <div className='img-fluid svg-icon'>
                                    <EmptyWishlist />
                                </div>
                                <p className='py-5 fw-bold text-center'>
                                    Nothing here... Please add some items!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WishlistData;
