import {
    Route,
    BrowserRouter as Router,
    Routes as RoutesContainer,
} from 'react-router-dom';
import ProtectedRoute from 'src/components/common/ProtectedRoute';
import Cart from 'src/pages/Cart';
import Checkout from 'src/pages/Checkout';
import Home from 'src/pages/Home';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import Wishlist from 'src/pages/Wishlist';
import { Screens } from 'src/utils/Screens';

const Routes = () => {
    return (
        <Router>
            <RoutesContainer>
                <Route path={Screens.HOME} index element={<Home />} />
                <Route path={Screens.CART} element={<Cart />} />
                <Route path={Screens.CHECKOUT} element={<Checkout />} />
                <Route path={Screens.WISHLIST} element={<Wishlist />} />
                <Route
                    element={
                        <ProtectedRoute
                            isRouteAccessible
                            redirectRoute={Screens.PROFILE}
                        />
                    }
                >
                    <Route path={Screens.LOGIN} element={<Login />} />
                </Route>
                <Route path={Screens.NOT_FOUND} element={<NotFound />} />
            </RoutesContainer>
        </Router>
    );
};

export default Routes;
