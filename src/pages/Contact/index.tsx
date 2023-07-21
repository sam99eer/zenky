import Breadcrumb from 'src/components/common/Breadcrumb';
import Footer from 'src/components/common/Footer';
import Header from 'src/components/common/Header';
import ScrollToTop from 'src/components/common/ScrollToTop';
import SupportList from 'src/components/common/SupportList';
import Wrapper from 'src/components/common/Wrapper';
import ContactData from 'src/components/pages/Contact/ContactData';
import Overlay from 'src/components/pages/Home/Overlay';

const Contact = () => {
    return (
        <Wrapper>
            <Overlay />
            <Header />
            <Breadcrumb title='Contact Us' />
            <ContactData />
            <Footer />
            <SupportList />
            <ScrollToTop />
        </Wrapper>
    );
};

export default Contact;
