import Breadcrumb from 'src/components/common/Breadcrumb';
import Footer from 'src/components/common/Footer';
import Header from 'src/components/common/Header';
import ScrollToTop from 'src/components/common/ScrollToTop';
import SupportList from 'src/components/common/SupportList';
import Wrapper from 'src/components/common/Wrapper';
import HelpData from 'src/components/pages/Help/HelpData';
import Overlay from 'src/components/pages/Home/Overlay';

const Help = () => {
    return (
        <Wrapper>
            <Overlay />
            <Header />
            <Breadcrumb title='Help' />
            <HelpData />
            <Footer />
            <SupportList />
            <ScrollToTop />
        </Wrapper>
    );
};

export default Help;
