import { useNavigate, useParams } from 'react-router-dom';
import Footer from 'src/components/common/Footer';
import Header from 'src/components/common/Header';
import ScrollToTop from 'src/components/common/ScrollToTop';
import SupportList from 'src/components/common/SupportList';
import Wrapper from 'src/components/common/Wrapper';
import Overlay from 'src/components/pages/Home/Overlay';
import OrderData from 'src/components/pages/OrderDetails/OrderData';
import { Screens } from 'src/utils/Screens';

const OrderDetails = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();

    if (!!orderId === false) {
        navigate(Screens.DUMMY_NOT_FOUND);
        return;
    }

    return (
        <Wrapper>
            <Overlay />
            <Header />
            <OrderData />
            <Footer />
            <SupportList />
            <ScrollToTop />
        </Wrapper>
    );
};

export default OrderDetails;
