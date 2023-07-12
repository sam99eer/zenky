import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from 'src/components/common/Footer';
import Header from 'src/components/common/Header';
import Breadcrumb from 'src/components/pages/Checkout/Breadcrumb';
import CheckoutData from 'src/components/pages/Checkout/CheckoutData';
import Overlay from 'src/components/pages/Home/Overlay';
import { IStoreModel } from 'src/store';
import { homeSliceActions } from 'src/store/Actions';
import { Screens } from 'src/utils/Screens';

const Checkout = () => {
    const isBackdropVisible = useSelector(
        (state: IStoreModel) => state.homeReducer.backdropVisible
    );
    const cartItemsLength = useSelector(
        (state: IStoreModel) => state.cartReducer.cartItem.length
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isBackdropVisible) {
            dispatch(homeSliceActions.turnOffBackdrop());
        }
    }, []);

    useEffect(() => {
        if (cartItemsLength < 1) {
            navigate(Screens.CART);
        }
    }, [cartItemsLength]);

    return (
        <>
            <div
                className={`main-wrapper main-wrapper-2 ${
                    isBackdropVisible ? 'overlay-active' : ''
                }`}
            >
                <Overlay />
                <Header />
                <Breadcrumb />
                <CheckoutData />
                <Footer />
            </div>
        </>
    );
};

export default Checkout;
