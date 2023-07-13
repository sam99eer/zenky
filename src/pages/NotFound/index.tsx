import Header from 'src/components/common/Header';
import ScrollToTop from 'src/components/common/ScrollToTop';
import SupportList from 'src/components/common/SupportList';
import Wrapper from 'src/components/common/Wrapper';
import NotFoundData from 'src/components/pages/NotFound/NotFoundData';

const NotFound = () => {
    return (
        <Wrapper>
            <Header />
            <NotFoundData />
            <SupportList />
            <ScrollToTop />
        </Wrapper>
    );
};

export default NotFound;
