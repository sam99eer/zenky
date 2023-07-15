import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { IWishListItem } from 'src/models/api/WishlistModel';
import { cartSliceActions } from 'src/store/Actions';
import { formatServerImagePath } from 'src/utils/Helpers';
import NoImage from '/assets/images/no-image.jpg';

const WishlistItem = (props: { data: IWishListItem }) => {
    const inStock = !!props?.data?.product?.isAvaliable;
    const dispatch = useDispatch();

    const addHandler = () => {
        dispatch(
            cartSliceActions.addItem({
                data: {
                    _id: props?.data?.product?._id,
                    image: props?.data?.product?.image,
                    name: props?.data?.product?.name,
                    price: props?.data?.product?.price,
                },
            })
        );
        toast.success('Added to cart');
    };

    return (
        <tr className='product-wrap'>
            <td className='product-remove'>
                <a href='#'>
                    <i className=' ti-close'></i>
                </a>
            </td>
            <td className='product-img px-0 px-md-2'>
                <a>
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
                </a>
            </td>
            <td className='product-name'>
                <a href='#'>{props?.data?.product?.name}</a>
            </td>
            <td className='product-price'>
                <span className='amount'>₹{props?.data?.product?.price}</span>
            </td>
            <td className='product-wishlist-cart'>
                <a onClick={inStock ? addHandler : undefined}>
                    {inStock ? 'add to cart' : 'stock out'}
                </a>
            </td>
        </tr>
    );
};

export default WishlistItem;
