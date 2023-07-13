import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from 'src/components/common/Breadcrumb';
import Footer from 'src/components/common/Footer';
import Header from 'src/components/common/Header';
import ScrollToTop from 'src/components/common/ScrollToTop';
import SupportList from 'src/components/common/SupportList';
import Wrapper from 'src/components/common/Wrapper';
import CheckoutData from 'src/components/pages/Checkout/CheckoutData';
import Overlay from 'src/components/pages/Home/Overlay';
import { IStoreModel } from 'src/store';
import { Screens } from 'src/utils/Screens';

const Checkout = () => {
    const cartItemsLength = useSelector(
        (state: IStoreModel) => state.cartReducer.cartItem.length
    );

    const navigate = useNavigate();

    useEffect(() => {
        if (cartItemsLength < 1) {
            navigate(Screens.CART);
        }
    }, [cartItemsLength]);

    return (
        <Wrapper>
            <Overlay />
            <Header />
            <Breadcrumb title='Checkout' />
            <CheckoutData />
            <Footer />
            <SupportList />
            <ScrollToTop />
        </Wrapper>
    );
};

export default Checkout;
