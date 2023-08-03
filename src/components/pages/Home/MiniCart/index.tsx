import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import EmptyCart from 'src/assets/EmptyCart';
import { IToggle } from 'src/models/screens/Home';
import { IStoreModel } from 'src/store';
import { cartSliceActions } from 'src/store/Actions';
import { formatServerImagePath } from 'src/utils/Helpers';
import { Screens } from 'src/utils/Screens';
import NoImage from '/assets/images/no-image.jpg';

const MiniCart = (props: {
    isVisible: boolean;
    closeHandler: (uid: keyof IToggle) => void;
}) => {
    const cartItems = useSelector(
        (state: IStoreModel) => state.cartReducer.cartItem
    );

    const dispatch = useDispatch();

    const removeHandler = (id: string, colorId: string, size: string) => {
        dispatch(cartSliceActions.deleteItem({ _id: id, colorId, size }));
    };

    const subTotal = useMemo(
        () =>
            cartItems.length > 0
                ? cartItems.reduce((acc, curVal) => acc + curVal?.totalPrice, 0)
                : 0,
        [cartItems]
    );

    return (
        <div
            className={`sidebar-cart-active ${props.isVisible ? 'inside' : ''}`}
        >
            <div className='sidebar-cart-all'>
                <a
                    className='cart-close'
                    onClick={props.closeHandler.bind(this, 'cart')}
                >
                    <i className=' ti-close'></i>
                </a>
                <div className='cart-content'>
                    <h3>Shopping Cart</h3>
                    {cartItems.length > 0 ? (
                        <>
                            <ul>
                                {cartItems.map((item) => (
                                    <li
                                        key={`cart_${item?._id}_${item?.colorName}_${item?.size}`}
                                        className='single-product-cart'
                                    >
                                        <div className='cart-img'>
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
                                                />
                                            </a>
                                        </div>
                                        <div className='cart-title'>
                                            <h4>
                                                <a>{item?.name}</a>
                                            </h4>
                                            <span>
                                                {item?.quantity} × ₹
                                                {item?.price}
                                            </span>
                                            <p>Color - {item?.colorName}</p>
                                            <p>Size - {item?.size}</p>
                                        </div>
                                        <div
                                            className='cart-delete'
                                            onClick={removeHandler.bind(
                                                this,
                                                item?._id,
                                                item?.colorId,
                                                item?.size
                                            )}
                                        >
                                            <a>×</a>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className='cart-total'>
                                <h4>
                                    Subtotal:{' '}
                                    <span>₹{subTotal?.toFixed(2)}</span>
                                </h4>
                            </div>
                            <div className='cart-checkout-btn'>
                                <Link
                                    className='btn-hover cart-btn-style'
                                    to={Screens.CART}
                                >
                                    view cart
                                </Link>
                                <Link
                                    className='no-mrg btn-hover cart-btn-style'
                                    to={Screens.CHECKOUT}
                                >
                                    checkout
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className='d-flex align-items-center flex-column'>
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
    );
};

export default MiniCart;
