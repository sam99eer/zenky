import { useNavigate, useParams } from 'react-router-dom';
import Footer from 'src/components/common/Footer';
import Header from 'src/components/common/Header';
import ScrollToTop from 'src/components/common/ScrollToTop';
import SupportList from 'src/components/common/SupportList';
import Wrapper from 'src/components/common/Wrapper';
import Overlay from 'src/components/pages/Home/Overlay';
import ProductData from 'src/components/pages/ProductDetails/ProductData';
import { Screens } from 'src/utils/Screens';

const ProductDetails = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    if (!!productId === false) {
        navigate(Screens.DUMMY_NOT_FOUND);
        return;
    }

    return (
        <Wrapper>
            <Overlay />
            <Header />
            <ProductData />
            <Footer />
            <SupportList />
            <ScrollToTop />
        </Wrapper>
    );
};

export default ProductDetails;
