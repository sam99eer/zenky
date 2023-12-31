import { useEffect, useId, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { PostWishlist } from 'src/api/PostWishlist';
import { IError } from 'src/models/api/ErrorModel';
import { IGetProductItem } from 'src/models/api/GetProductsModel';
import { IWishListItem } from 'src/models/api/WishlistModel';
import { IStoreModel } from 'src/store';
import { isWishlistRemoveValid } from 'src/utils/CacheValidators';
import { WISHLIST_MSG } from 'src/utils/Constants';
import { Keys } from 'src/utils/Keys';

let timer: NodeJS.Timeout | null = null;

const CardWishlistButton = (props: {
    productData: IGetProductItem;
    hideTitle?: boolean;
}) => {
    const { isLoggedIn, token } = useSelector(
        (state: IStoreModel) => state.personalDetailsReducer
    );

    const id = useId();

    const queryClient = useQueryClient();

    const { mutateAsync } = useMutation(Keys.TOGGLE_WISHLIST, PostWishlist);

    const [selected, setSelected] = useState(false);

    const wishlistHandler = () => {
        if (!isLoggedIn) {
            toast.warn('Please login to add this product in your Wishlist');
            return;
        }

        if (!!timer) clearTimeout(timer);

        setSelected((oldState) => !oldState);

        timer = setTimeout(() => {
            mutateAsync({
                productId: props?.productData?._id,
                token: token!,
            })
                .then(async (res) => {
                    const queryData = await queryClient.getQueryData(
                        Keys.WISHLIST
                    );

                    if (res.message === WISHLIST_MSG.ADDED) {
                        if (isWishlistRemoveValid(queryData)) {
                            const data: IWishListItem = {
                                _id: 'favorite' + id + 'item',
                                userId: 'user' + id + 'item',
                                createdAt: new Date().toISOString(),
                                updatedAt: new Date().toISOString(),
                                productId: props?.productData?._id,
                                product: props?.productData,
                            };

                            queryData.pages?.[0]?.items?.unshift(data);
                            queryClient.setQueryData(Keys.WISHLIST, queryData);
                        }
                        setSelected(true);
                    } else if (res.message === WISHLIST_MSG.REMOVED) {
                        if (isWishlistRemoveValid(queryData)) {
                            for (let i = 0; i < queryData?.pages?.length; i++) {
                                const findIndex = queryData?.pages?.[
                                    i
                                ].items?.findIndex(
                                    (item) =>
                                        item?.productId ===
                                        props.productData?._id
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
                        setSelected(false);
                    }
                })
                .catch((err: IError) =>
                    toast.error(
                        err.response?.data?.error
                            ? err.response?.data?.error
                            : 'Unable to add to favorite right now!'
                    )
                );
        }, 1200);
    };

    useEffect(() => {
        async function checkWishlist() {
            const getWishlistData = await queryClient.getQueryData(
                Keys.WISHLIST
            );
            if (isWishlistRemoveValid(getWishlistData)) {
                for (let i = 0; i < getWishlistData?.pages?.length; i++) {
                    const findIndex = getWishlistData?.pages?.[
                        i
                    ].items?.findIndex(
                        (item) => item?.productId === props?.productData?._id
                    );
                    if (findIndex !== -1) {
                        setSelected(true);
                        break;
                    }
                }
            }
        }
        checkWishlist();

        return () => {
            if (!!timer) {
                clearTimeout(timer);
            }
        };
    }, []);

    return (
        <a
            className={selected ? 'active' : ''}
            title='Wishlist'
            onClick={wishlistHandler}
        >
            <i className='ti-heart'></i>
            {!!props?.hideTitle ? null : (
                <span>
                    {selected ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </span>
            )}
        </a>
    );
};

export default CardWishlistButton;
