import {
    Route,
    BrowserRouter as Router,
    Routes as RoutesContainer,
} from 'react-router-dom';
import Cart from 'src/pages/Cart';
import Checkout from 'src/pages/Checkout';
import Home from 'src/pages/Home';
import { Screens } from 'src/utils/Screens';

const Routes = () => {
    return (
        <Router>
            <RoutesContainer>
                <Route path={Screens.HOME} index element={<Home />} />
                <Route path={Screens.CART} element={<Cart />} />
                <Route path={Screens.CHECKOUT} element={<Checkout />} />
            </RoutesContainer>
        </Router>
    );
};

export default Routes;
