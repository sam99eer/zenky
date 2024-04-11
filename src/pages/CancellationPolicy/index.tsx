import Breadcrumb from 'src/components/common/Breadcrumb';
import Footer from 'src/components/common/Footer';
import Header from 'src/components/common/Header';
import ScrollToTop from 'src/components/common/ScrollToTop';
import SupportList from 'src/components/common/SupportList';
import Wrapper from 'src/components/common/Wrapper';
import CancellationPolicyData from 'src/components/pages/CancellationPolicy/CancellationPolicyData';
import Overlay from 'src/components/pages/Home/Overlay';

const CancellationPolicy = () => {
    return (
        <Wrapper>
            <Overlay />
            <Header />
            <Breadcrumb title='Cancellation Policy' />
            <CancellationPolicyData />
            <Footer />
            <SupportList />
            <ScrollToTop />
        </Wrapper>
    );
};

export default CancellationPolicy;
