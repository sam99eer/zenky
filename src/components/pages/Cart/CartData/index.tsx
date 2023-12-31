import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import EmptyCart from 'src/assets/EmptyCart';
import { ICartItem } from 'src/models/store/CartSliceModel';
import { IStoreModel } from 'src/store';
import { cartSliceActions } from 'src/store/Actions';
import { formatServerImagePath } from 'src/utils/Helpers';
import { Screens } from 'src/utils/Screens';
import NoImage from '/assets/images/no-image.jpg';

const CartData = () => {
    const cartItems = useSelector(
        (state: IStoreModel) => state.cartReducer.cartItem
    );

    const dispatch = useDispatch();

    const removeHandler = (
        uid: 'remove' | 'delete',
        id: string,
        colorId: string,
        size: string
    ) => {
        if (uid === 'remove') {
            dispatch(cartSliceActions.removeItem({ _id: id, colorId, size }));
            return;
        }

        if (uid === 'delete') {
            dispatch(cartSliceActions.deleteItem({ _id: id, colorId, size }));
            return;
        }
    };

    const increaseHandler = (item: ICartItem) => {
        dispatch(cartSliceActions.addItem({ data: item }));
    };

    const clearCartHandler = () => {
        dispatch(cartSliceActions.flushCart());
    };

    const subTotal = useMemo(
        () =>
            cartItems.length > 0
                ? cartItems.reduce((acc, curVal) => acc + curVal?.totalPrice, 0)
                : 0,
        [cartItems]
    );

    return (
        <div className='cart-main-area pt-95 pb-100'>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                        {cartItems.length > 0 ? (
                            <>
                                <div className='row'>
                                    <div className='col-lg-8'>
                                        <div className='table-content table-responsive cart-table-content'>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th></th>
                                                        <th>Product</th>
                                                        <th>Price</th>
                                                        <th>Quantity</th>
                                                        <th>total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cartItems?.map((item) => (
                                                        <tr
                                                            className='product-wrap'
                                                            key={`cart_item_${item?._id}_${item?.colorName}_${item?.size}`}
                                                        >
                                                            <td className='product-remove'>
                                                                <a
                                                                    onClick={removeHandler.bind(
                                                                        this,
                                                                        'delete',
                                                                        item?._id,
                                                                        item?.colorName,
                                                                        item?.size
                                                                    )}
                                                                >
                                                                    <i className=' ti-close'></i>
                                                                </a>
                                                            </td>
                                                            <td className='product-img'>
                                                                <a>
                                                                    <img
                                                                        src={
                                                                            !!item?.image
                                                                                ? formatServerImagePath(
                                                                                      item?.image
                                                                                  )
                                                                                : NoImage
                                                                        }
                                                                        alt='Product Image'
                                                                        className='px-2'
                                                                    />
                                                                </a>
                                                            </td>
                                                            <td className='product-name'>
                                                                <Link
                                                                    to={`${Screens.PRODUCT_DETAILS}/${item?._id}`}
                                                                >
                                                                    {item?.name}
                                                                </Link>
                                                                <p>
                                                                    Color -{' '}
                                                                    {
                                                                        item?.colorName
                                                                    }
                                                                </p>
                                                                <p>
                                                                    Size -{' '}
                                                                    {item?.size}
                                                                </p>
                                                            </td>
                                                            <td className='product-price'>
                                                                <span className='amount'>
                                                                    ₹
                                                                    {
                                                                        item?.price
                                                                    }
                                                                </span>
                                                            </td>
                                                            <td className='cart-quality'>
                                                                <div className='quickview-quality quality-height-dec2'>
                                                                    <div className='cart-plus-minus d-flex justify-content-center align-items-center'>
                                                                        <div
                                                                            className='dec qtybutton'
                                                                            onClick={removeHandler.bind(
                                                                                this,
                                                                                'remove',
                                                                                item?._id,
                                                                                item?.colorId,
                                                                                item?.size
                                                                            )}
                                                                        >
                                                                            -
                                                                        </div>
                                                                        <span>
                                                                            {
                                                                                item?.quantity
                                                                            }
                                                                        </span>
                                                                        <div
                                                                            className='inc qtybutton'
                                                                            onClick={increaseHandler.bind(
                                                                                this,
                                                                                item
                                                                            )}
                                                                        >
                                                                            +
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className='product-total'>
                                                                <span>
                                                                    ₹
                                                                    {
                                                                        item?.totalPrice
                                                                    }
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className='cart-shiping-update-wrapper'>
                                            {/* <div className='discount-code'>
                                                <input
                                                    type='text'
                                                    name='name'
                                                    placeholder='Coupon code'
                                                />
                                                <button
                                                    className='coupon-btn'
                                                    type='submit'
                                                >
                                                    Apply coupon
                                                </button>
                                            </div> */}
                                            <div className='cart-clear ms-auto'>
                                                <a onClick={clearCartHandler}>
                                                    Clear Cart
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-4'>
                                        <div className='grand-total-wrap'>
                                            <h4>Cart total</h4>
                                            <div className='grand-total-content'>
                                                <ul>
                                                    <li>
                                                        Subtotal{' '}
                                                        <span>
                                                            {' '}
                                                            ₹
                                                            {subTotal?.toFixed(
                                                                2
                                                            )}
                                                        </span>
                                                    </li>
                                                    <li>
                                                        Total{' '}
                                                        <span>
                                                            ₹
                                                            {subTotal?.toFixed(
                                                                2
                                                            )}
                                                        </span>{' '}
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className='grand-btn'>
                                                <Link to={Screens.CHECKOUT}>
                                                    Proceed to checkout
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className='d-flex flex-column justify-content-center align-items-center'>
                                <div className='img-fluid svg-icon'>
                                    <EmptyCart />
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

export default CartData;
