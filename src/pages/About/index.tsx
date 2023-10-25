import Breadcrumb from 'src/components/common/Breadcrumb';
import Footer from 'src/components/common/Footer';
import Header from 'src/components/common/Header';
import ScrollToTop from 'src/components/common/ScrollToTop';
import SupportList from 'src/components/common/SupportList';
import Wrapper from 'src/components/common/Wrapper';
import AboutData from 'src/components/pages/About/AboutData';
import Overlay from 'src/components/pages/Home/Overlay';

const About = () => {
    return (
        <Wrapper>
            <Overlay />
            <Header />
            <Breadcrumb title='About' />
            <AboutData />
            <Footer />
            <SupportList />
            <ScrollToTop />
        </Wrapper>
    );
};

export default About;
