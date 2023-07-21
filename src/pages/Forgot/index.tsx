import Breadcrumb from 'src/components/common/Breadcrumb';
import Footer from 'src/components/common/Footer';
import Header from 'src/components/common/Header';
import ScrollToTop from 'src/components/common/ScrollToTop';
import SupportList from 'src/components/common/SupportList';
import Wrapper from 'src/components/common/Wrapper';
import ForgotData from 'src/components/pages/Forgot/ForgotData';
import Overlay from 'src/components/pages/Home/Overlay';

const Forgot = () => {
    return (
        <Wrapper>
            <Overlay />
            <Header />
            <Breadcrumb title='Forgot Password' />
            <ForgotData />
            <Footer />
            <SupportList />
            <ScrollToTop />
        </Wrapper>
    );
};

export default Forgot;
