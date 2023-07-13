import Breadcrumb from 'src/components/common/Breadcrumb';
import Footer from 'src/components/common/Footer';
import Header from 'src/components/common/Header';
import Wrapper from 'src/components/common/Wrapper';
import Overlay from 'src/components/pages/Home/Overlay';

const Wishlist = () => {
    return (
        <Wrapper>
            <Overlay />
            <Header />
            <Breadcrumb title='Wishlist' />
            <Footer />
        </Wrapper>
    );
};

export default Wishlist;
