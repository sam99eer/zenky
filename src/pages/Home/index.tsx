import Footer from 'src/components/common/Footer';
import Header from 'src/components/common/Header';
import PromoStrip from 'src/components/common/PromoStrip';
import ScrollToTop from 'src/components/common/ScrollToTop';
import SupportList from 'src/components/common/SupportList';
import Wrapper from 'src/components/common/Wrapper';
import About from 'src/components/pages/Home/About';
import Brands from 'src/components/pages/Home/Brands';
import HeroSlider from 'src/components/pages/Home/HeroSlider';
import NewProducts from 'src/components/pages/Home/NewProducts';
import Overlay from 'src/components/pages/Home/Overlay';
import Subscribe from 'src/components/pages/Home/Subscribe';
import Testimonials from 'src/components/pages/Home/Testimonials';

const Home = () => {
    return (
        <Wrapper>
            <Overlay />
            <Header />
            <PromoStrip />
            <HeroSlider />
            <NewProducts />
            <About />
            <Subscribe />
            <Testimonials />
            <Brands />
            <Footer />
            <SupportList />
            <ScrollToTop />
        </Wrapper>
    );
};

export default Home;
