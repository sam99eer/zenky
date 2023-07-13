import { useSelector } from 'react-redux';
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
import Profile from 'src/pages/Profile';
import Wishlist from 'src/pages/Wishlist';
import { IStoreModel } from 'src/store';
import { Screens } from 'src/utils/Screens';

const Routes = () => {
    const isLoggedIn = useSelector(
        (state: IStoreModel) => state.personalDetailsReducer.isLoggedIn
    );

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
                            isRouteAccessible={!isLoggedIn}
                            redirectRoute={Screens.PROFILE}
                        />
                    }
                >
                    <Route path={Screens.LOGIN} element={<Login />} />
                </Route>
                <Route
                    element={
                        <ProtectedRoute
                            isRouteAccessible={isLoggedIn}
                            redirectRoute={Screens.LOGIN}
                        />
                    }
                >
                    <Route path={Screens.PROFILE} element={<Profile />} />
                </Route>
                <Route path={Screens.NOT_FOUND} element={<NotFound />} />
            </RoutesContainer>
        </Router>
    );
};

export default Routes;
