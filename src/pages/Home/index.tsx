import { useSelector } from 'react-redux';
import Header from 'src/components/common/Header';
import Overlay from 'src/components/pages/Home/Overlay';
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
            </div>
        </>
    );
};

export default Home;
