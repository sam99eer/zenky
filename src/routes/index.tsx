import { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import {
    Route,
    BrowserRouter as Router,
    Routes as RoutesContainer,
} from 'react-router-dom';
import Loader from 'src/components/common/Loader';
import ProtectedRoute from 'src/components/common/ProtectedRoute';
import About from 'src/pages/About';
import CancellationPolicy from 'src/pages/CancellationPolicy';
import Contact from 'src/pages/Contact';
import Faq from 'src/pages/Faq';
import Help from 'src/pages/Help';
import Home from 'src/pages/Home';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import OrderDetails from 'src/pages/OrderDetails';
import OrderTrack from 'src/pages/OrderTrack';
import PrivacyPolicy from 'src/pages/PrivacyPolicy';
import ProductDetails from 'src/pages/ProductDetails';
import Refunds from 'src/pages/Refunds';
import Shop from 'src/pages/Shop';
import TermsConditions from 'src/pages/TermsConditions';
import Wishlist from 'src/pages/Wishlist';
import { IStoreModel } from 'src/store';
import { Screens } from 'src/utils/Screens';

const Checkout = lazy(() => import('src/pages/Checkout'));
const Cart = lazy(() => import('src/pages/Cart'));
const Profile = lazy(() => import('src/pages/Profile'));
// const Forgot = lazy(() => import('src/pages/Forgot'));

const Routes = () => {
    const isLoggedIn = useSelector(
        (state: IStoreModel) => state.personalDetailsReducer.isLoggedIn
    );

    return (
        <Router>
            <Suspense fallback={<Loader />}>
                <RoutesContainer>
                    <Route path={Screens.HOME} index element={<Home />} />
                    <Route path={Screens.CART} element={<Cart />} />
                    <Route path={Screens.SHOP} element={<Shop />} />
                    {/* <Route path={Screens.FORGOT} element={<Forgot />} /> */}
                    <Route path={Screens.CONTACT} element={<Contact />} />
                    <Route path={Screens.FAQ} element={<Faq />} />
                    <Route path={Screens.ABOUT} element={<About />} />
                    <Route path={Screens.HELP} element={<Help />} />
                    <Route path={Screens.REFUND} element={<Refunds />} />
                    <Route path={Screens.TnC} element={<TermsConditions />} />
                    <Route
                        path={Screens.CANCELLATION_POLICY}
                        element={<CancellationPolicy />}
                    />
                    <Route
                        path={Screens.PRIVACY_POLICY}
                        element={<PrivacyPolicy />}
                    />
                    <Route
                        path={Screens.ORDER_TRACK}
                        element={<OrderTrack />}
                    />
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
                        <Route
                            path={`${Screens.ORDER_DETAILS}/:orderId`}
                            element={<OrderDetails />}
                        />
                    </Route>
                    <Route path={Screens.NOT_FOUND} element={<NotFound />} />
                </RoutesContainer>
            </Suspense>
        </Router>
    );
};

export default Routes;
