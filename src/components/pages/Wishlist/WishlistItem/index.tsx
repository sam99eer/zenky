import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PostWishlist } from 'src/api/PostWishlist';
import { IError } from 'src/models/api/ErrorModel';
import { IWishListItem } from 'src/models/api/WishlistModel';
import { IStoreModel } from 'src/store';
import { isWishlistRemoveValid } from 'src/utils/CacheValidators';
import { formatServerImagePath } from 'src/utils/Helpers';
import { Keys } from 'src/utils/Keys';
import { Screens } from 'src/utils/Screens';
import NoImage from '/assets/images/no-image.jpg';

const WishlistItem = (props: { data: IWishListItem }) => {
    const queryClient = useQueryClient();

    const { isLoading, mutateAsync } = useMutation(
        Keys.TOGGLE_WISHLIST,
        PostWishlist
    );

    const token = useSelector(
        (state: IStoreModel) => state.personalDetailsReducer.token
    );

    const removeHandler = () => {
        mutateAsync({
            productId: props.data?.productId,
            token: token!,
        })
            .then(async (res) => {
                if (res.status === 200) {
                    const queryData = await queryClient.getQueryData(
                        Keys.WISHLIST
                    );

                    if (isWishlistRemoveValid(queryData)) {
                        for (let i = 0; i < queryData?.pages?.length; i++) {
                            const findIndex = queryData?.pages?.[
                                i
                            ].items?.findIndex(
                                (item) =>
                                    item?.productId === props.data?.productId
                            );
                            if (findIndex !== -1) {
                                queryData?.pages?.[i].items?.splice(
                                    findIndex,
                                    1
                                );
                                break;
                            }
                        }
                        queryClient.setQueryData(Keys.WISHLIST, queryData);
                    }
                    toast.success(res?.message);
                }
            })
            .catch((err: IError) =>
                toast.error(
                    err.response?.data?.error
                        ? err.response?.data?.error
                        : 'Unable to subscribe right now!'
                )
            );
    };

    return (
        <tr className='product-wrap'>
            <td className='product-remove'>
                <a onClick={isLoading ? undefined : removeHandler}>
                    <i className={isLoading ? 'ti-reload' : ' ti-close'}></i>
                </a>
            </td>
            <td className='product-img px-0 px-md-2'>
                <Link
                    to={`${Screens.PRODUCT_DETAILS}/${props?.data?.productId}`}
                >
                    <img
                        src={
                            !!props?.data?.product?.image
                                ? formatServerImagePath(
                                      props?.data?.product?.image
                                  )
                                : NoImage
                        }
                        alt='Product Image'
                    />
                </Link>
            </td>
            <td className='product-name'>
                <Link
                    to={`${Screens.PRODUCT_DETAILS}/${props?.data?.productId}`}
                >
                    {props?.data?.product?.name}
                </Link>
            </td>
            <td className='product-price'>
                <span className='amount'>₹{props?.data?.product?.price}</span>
            </td>
        </tr>
    );
};

export default WishlistItem;
