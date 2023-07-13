import Breadcrumb from 'src/components/common/Breadcrumb';
import Footer from 'src/components/common/Footer';
import Header from 'src/components/common/Header';
import Wrapper from 'src/components/common/Wrapper';
import CartData from 'src/components/pages/Cart/CartData';
import Overlay from 'src/components/pages/Home/Overlay';

const Cart = () => {
    return (
        <Wrapper>
            <Overlay />
            <Header />
            <Breadcrumb title='Cart' />
            <CartData />
            <Footer />
        </Wrapper>
    );
};

export default Cart;
