import { useSelector } from 'react-redux';
import Footer from 'src/components/common/Footer';
import Header from 'src/components/common/Header';
import ScrollToTop from 'src/components/common/ScrollToTop';
import SupportList from 'src/components/common/SupportList';
import About from 'src/components/pages/Home/About';
import NewProducts from 'src/components/pages/Home/NewProducts';
import Overlay from 'src/components/pages/Home/Overlay';
import Subscribe from 'src/components/pages/Home/Subscribe';
import Testimonials from 'src/components/pages/Home/Testimonials';
import { IStoreModel } from 'src/store';

const Home = () => {
    const isBackdropVisible = useSelector(
        (state: IStoreModel) => state.homeReducer.backdropVisible
    );

    return (
        <>
            <div
                className={`main-wrapper main-wrapper-2 ${
                    isBackdropVisible ? 'overlay-active' : ''
                }`}
            >
                <Overlay />
                <Header />
                <About />
                <NewProducts />
                <Subscribe />
                <Testimonials />
                <Footer />
                <SupportList />
                <ScrollToTop />
            </div>
        </>
    );
};

export default Home;
