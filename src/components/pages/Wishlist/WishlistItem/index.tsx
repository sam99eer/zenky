import { Link } from 'react-router-dom';
import { IWishListItem } from 'src/models/api/WishlistModel';
import { formatServerImagePath } from 'src/utils/Helpers';
import { Screens } from 'src/utils/Screens';
import NoImage from '/assets/images/no-image.jpg';

const WishlistItem = (props: { data: IWishListItem }) => {
    return (
        <tr className='product-wrap'>
            <td className='product-remove'>
                <a href='#'>
                    <i className=' ti-close'></i>
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
