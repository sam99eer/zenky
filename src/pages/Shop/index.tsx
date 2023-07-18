import Breadcrumb from 'src/components/common/Breadcrumb';
import Footer from 'src/components/common/Footer';
import Header from 'src/components/common/Header';
import ScrollToTop from 'src/components/common/ScrollToTop';
import SupportList from 'src/components/common/SupportList';
import Wrapper from 'src/components/common/Wrapper';
import Overlay from 'src/components/pages/Home/Overlay';
import ShopData from 'src/components/pages/Shop/ShopData';

const Shop = () => {
    return (
        <Wrapper>
            <Overlay />
            <Header />
            <Breadcrumb title='Shop' />
            <ShopData />
            <Footer />
            <SupportList />
            <ScrollToTop />
        </Wrapper>
    );
};

export default Shop;
