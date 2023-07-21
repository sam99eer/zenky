import Breadcrumb from 'src/components/common/Breadcrumb';
import Footer from 'src/components/common/Footer';
import Header from 'src/components/common/Header';
import ScrollToTop from 'src/components/common/ScrollToTop';
import SupportList from 'src/components/common/SupportList';
import Wrapper from 'src/components/common/Wrapper';
import FaqData from 'src/components/pages/Faq/FaqData';
import Overlay from 'src/components/pages/Home/Overlay';

const Faq = () => {
    return (
        <Wrapper>
            <Overlay />
            <Header />
            <Breadcrumb title='FAQ' />
            <FaqData />
            <Footer />
            <SupportList />
            <ScrollToTop />
        </Wrapper>
    );
};

export default Faq;
