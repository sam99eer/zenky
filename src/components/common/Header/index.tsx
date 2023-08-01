import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import HeaderStrip from 'src/components/common/HeaderStrip';
import MobileHeader from 'src/components/common/MobileHeader';
import MiniCart from 'src/components/pages/Home/MiniCart';
import QuickInfo from 'src/components/pages/Home/QuickInfo';
import SearchModal from 'src/components/pages/Home/SearchModal';
import { IToggle } from 'src/models/screens/Home';
import { IStoreModel } from 'src/store';
import {
    homeSliceActions,
    personalDetailsSliceActions,
} from 'src/store/Actions';
import { deleteCookie } from 'src/utils/Helpers';
import { Screens } from 'src/utils/Screens';
import Logo from '/assets/icons/logo.png';

const Header = () => {
    const [show, setShow] = useState<IToggle>({
        quickInfo: false,
        cart: false,
        mobileNav: false,
        search: false,
    });

    const { pathname } = useLocation();

    // const navigate = useNavigate();

    const cartItems = useSelector(
        (state: IStoreModel) => state.cartReducer.cartItem.length
    );

    const isLoggedIn = useSelector(
        (state: IStoreModel) => state.personalDetailsReducer.isLoggedIn
    );

    const dispatch = useDispatch();

    const toggleHandler = (uid: keyof IToggle) => {
        if (uid === 'cart' || uid === 'mobileNav') {
            dispatch(homeSliceActions.toggleBackdrop());
        }
        setShow((oldState) => ({
            ...oldState,
            [uid]: !oldState[uid],
        }));
    };

    // const navigateHandler = (filter: string) => {
    //     navigate(Screens.SHOP, { state: { filter } });
    // };

    const logoutHandler = () => {
        deleteCookie('access-token');
        dispatch(personalDetailsSliceActions.flushData());
    };

    return (
        <>
            <header className='header-area header-padding-1'>
                <HeaderStrip />
                <div className='main-header-wrap'>
                    <div className='container-fluid'>
                        <div className='row align-items-center'>
                            <div className='col-lg-3'>
                                <div className='logo-header-about-wrap'>
                                    <div className='logo logo-width'>
                                        <Link to={Screens.HOME}>
                                            <img src={Logo} alt='logo' />
                                        </Link>
                                    </div>
                                    <div className='header-about-icon ml-35'>
                                        <a
                                            className='quickinfo-button-active'
                                            onClick={toggleHandler.bind(
                                                this,
                                                'quickInfo'
                                            )}
                                        >
                                            <i className='ti-align-left'></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-6 d-flex justify-content-center'>
                                <div className='main-menu menu-lh-1'>
                                    <nav>
                                        <ul>
                                            <li>
                                                <NavLink
                                                    to={Screens.HOME}
                                                    className={({ isActive }) =>
                                                        isActive ? 'active' : ''
                                                    }
                                                >
                                                    Home
                                                </NavLink>
                                            </li>
                                            <li>
                                                <a>
                                                    Shop{' '}
                                                    <FontAwesomeIcon
                                                        icon={faAngleDown}
                                                    />
                                                </a>
                                                <ul className='mega-menu mega-menu-width2 menu-negative-mrg2'>
                                                    <li className='mega-menu-sub-width20'>
                                                        <a
                                                            className='menu-title'
                                                            href='#'
                                                        >
                                                            Shop Layout
                                                        </a>
                                                        <ul>
                                                            <li>
                                                                <a href='shop-fullwide.html'>
                                                                    Shop
                                                                    Fullwidth
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href='shop-sidebar.html'>
                                                                    Shop Sidebar
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href='shop-3col.html'>
                                                                    Shop 03
                                                                    Column
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href='shop-4col.html'>
                                                                    Shop 04
                                                                    Column
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href='shop-masonry.html'>
                                                                    Shop Mansory
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href='shop-metro.html'>
                                                                    Shop Metro
                                                                    Layout
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href='shop-instagram.html'>
                                                                    Shop
                                                                    Instagram
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href='shop-collection-classic.html'>
                                                                    Collection
                                                                    Classic
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href='shop-collection-modern.html'>
                                                                    Collection
                                                                    Modern
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li className='mega-menu-sub-width20'>
                                                        <a
                                                            className='menu-title'
                                                            href='#'
                                                        >
                                                            Product Layout
                                                        </a>
                                                        <ul>
                                                            <li>
                                                                <a href='product-details.html'>
                                                                    Simple 01
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href='product-details-2.html'>
                                                                    Simple 02
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href='product-details-3.html'>
                                                                    Simple 03
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href='product-details-carousel.html'>
                                                                    Product
                                                                    Carousel
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href='product-details-grouped.html'>
                                                                    Product
                                                                    Grouped
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href='product-details-affiliate.html'>
                                                                    Product
                                                                    Affiliate
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href='product-details-configurable.html'>
                                                                    Product
                                                                    Configurable
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li className='mega-menu-sub-width20'>
                                                        <a
                                                            className='menu-title'
                                                            href='#'
                                                        >
                                                            Shop Page
                                                        </a>
                                                        <ul>
                                                            <li>
                                                                <a href='cart.html'>
                                                                    Shopping
                                                                    Cart
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href='checkout.html'>
                                                                    Check Out
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href='my-account.html'>
                                                                    My Account
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href='wishlist.html'>
                                                                    Wishlist
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href='compare.html'>
                                                                    Compare
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href='order-tracking.html'>
                                                                    Order
                                                                    Tracking
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li className='mega-menu-sub-width37'>
                                                        <div className='banner-menu-content-wrap default-overlay'>
                                                            <a href='product-details.html'>
                                                                <img
                                                                    src='/assets/images/new-collection.jpg'
                                                                    alt='banner'
                                                                />
                                                            </a>
                                                            <div className='banner-menu-content'>
                                                                <span>
                                                                    Hello{' '}
                                                                    {new Date().getFullYear()}
                                                                </span>
                                                                <h2>
                                                                    New <br />
                                                                    arrival
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a>
                                                    Profile{' '}
                                                    <FontAwesomeIcon
                                                        icon={faAngleDown}
                                                    />
                                                </a>
                                                <ul className='sub-menu-width'>
                                                    <li>
                                                        <Link
                                                            to={Screens.PROFILE}
                                                        >
                                                            My Account
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            to={
                                                                Screens.WISHLIST
                                                            }
                                                        >
                                                            Wishlist
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <a href='order-tracking.html'>
                                                            Order Tracking
                                                        </a>
                                                    </li>
                                                    {isLoggedIn ? (
                                                        <li>
                                                            <a
                                                                onClick={
                                                                    logoutHandler
                                                                }
                                                            >
                                                                Logout
                                                            </a>
                                                        </li>
                                                    ) : null}
                                                </ul>
                                            </li>
                                            <li>
                                                <a>
                                                    More{' '}
                                                    <FontAwesomeIcon
                                                        icon={faAngleDown}
                                                    />
                                                </a>
                                                <ul className='sub-menu-width'>
                                                    <li>
                                                        <a href='about-us.html'>
                                                            About Us
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            to={Screens.CONTACT}
                                                        >
                                                            Contact Us
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to={Screens.FAQ}>
                                                            FAQ
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className='col-lg-3'>
                                <div className='lang-cart-search-wrap'>
                                    {pathname === Screens.SHOP ? null : (
                                        <div className='same-style header-search'>
                                            <a
                                                className='search-active'
                                                onClick={toggleHandler.bind(
                                                    this,
                                                    'search'
                                                )}
                                            >
                                                <i className='ti-search'></i>
                                            </a>
                                        </div>
                                    )}
                                    <div className='same-style cart-wrap ml-20'>
                                        <a
                                            onClick={toggleHandler.bind(
                                                this,
                                                'cart'
                                            )}
                                            className='cart-active'
                                        >
                                            <i className=' ti-shopping-cart '></i>
                                            <span className='count-style'>
                                                {cartItems}
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='header-small-mobile header-small-mobile-ptb'>
                    <div className='container'>
                        <div className='row align-items-center'>
                            <div className='col-6'>
                                <div className='mobile-logo logo-width'>
                                    <Link to={Screens.HOME}>
                                        <img alt='Logo' src={Logo} />
                                    </Link>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='mobile-header-right-wrap'>
                                    <div className='same-style cart-wrap'>
                                        <a
                                            onClick={toggleHandler.bind(
                                                this,
                                                'cart'
                                            )}
                                            className='cart-active'
                                        >
                                            <i className=' ti-shopping-cart '></i>
                                            <span className='count-style'>
                                                {cartItems}
                                            </span>
                                        </a>
                                    </div>
                                    <div className='mobile-off-canvas'>
                                        <a
                                            className='mobile-aside-button'
                                            onClick={toggleHandler.bind(
                                                this,
                                                'mobileNav'
                                            )}
                                        >
                                            <i className=' ti-align-left '></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <QuickInfo
                isVisible={show.quickInfo}
                closeHandler={toggleHandler}
            />
            <SearchModal isVisible={show.search} closeHandler={toggleHandler} />
            <MiniCart isVisible={show.cart} closeHandler={toggleHandler} />
            <MobileHeader
                isVisible={show.mobileNav}
                closeHandler={toggleHandler}
            />
        </>
    );
};

export default Header;
