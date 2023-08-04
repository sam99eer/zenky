import { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import {
    Route,
    BrowserRouter as Router,
    Routes as RoutesContainer,
} from 'react-router-dom';
import Loader from 'src/components/common/Loader';
import ProtectedRoute from 'src/components/common/ProtectedRoute';
import Contact from 'src/pages/Contact';
import Faq from 'src/pages/Faq';
import Forgot from 'src/pages/Forgot';
import Home from 'src/pages/Home';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import ProductDetails from 'src/pages/ProductDetails';
import Shop from 'src/pages/Shop';
import Wishlist from 'src/pages/Wishlist';
import { IStoreModel } from 'src/store';
import { Screens } from 'src/utils/Screens';

const Routes = () => {
    const isLoggedIn = useSelector(
        (state: IStoreModel) => state.personalDetailsReducer.isLoggedIn
    );

    const Checkout = lazy(() => import('src/pages/Checkout'));
    const Cart = lazy(() => import('src/pages/Cart'));
    const Profile = lazy(() => import('src/pages/Profile'));

    return (
        <Router>
            <Suspense fallback={<Loader />}>
                <RoutesContainer>
                    <Route path={Screens.HOME} index element={<Home />} />
                    <Route path={Screens.CART} element={<Cart />} />
                    <Route path={Screens.SHOP} element={<Shop />} />
                    <Route path={Screens.FORGOT} element={<Forgot />} />
                    <Route path={Screens.CONTACT} element={<Contact />} />
                    <Route path={Screens.FAQ} element={<Faq />} />
                    <Route
                        path={`${Screens.PRODUCT_DETAILS}/:productId`}
                        element={<ProductDetails />}
                    />
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
                        <Route path={Screens.WISHLIST} element={<Wishlist />} />
                        <Route path={Screens.PROFILE} element={<Profile />} />
                        <Route path={Screens.CHECKOUT} element={<Checkout />} />
                    </Route>
                    <Route path={Screens.NOT_FOUND} element={<NotFound />} />
                </RoutesContainer>
            </Suspense>
        </Router>
    );
};

export default Routes;
