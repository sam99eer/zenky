import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from 'src/components/common/Footer';
import Header from 'src/components/common/Header';
import Breadcrumb from 'src/components/pages/Cart/Breadcrumb';
import CartData from 'src/components/pages/Cart/CartData';
import Overlay from 'src/components/pages/Home/Overlay';
import { IStoreModel } from 'src/store';
import { homeSliceActions } from 'src/store/Actions';

const Cart = () => {
    const isBackdropVisible = useSelector(
        (state: IStoreModel) => state.homeReducer.backdropVisible
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (isBackdropVisible) {
            dispatch(homeSliceActions.turnOffBackdrop());
        }
    }, []);

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
                <CartData />
                <Footer />
            </div>
        </>
    );
};

export default Cart;
