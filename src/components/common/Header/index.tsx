import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
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

    const navigate = useNavigate();

    const cartItems = useSelector(
        (state: IStoreModel) => state.cartReducer.cartItem.length
    );

    const isLoggedIn = useSelector(
        (state: IStoreModel) => state.personalDetailsReducer.isLoggedIn
    );

    const categoryData = useSelector(
        (state: IStoreModel) => state.categoryReducer.data
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

    const filterHandler = (filter: string) => {
        navigate(Screens.SHOP, { state: { filter } });
    };

    const shopHandler = () => {
        navigate(Screens.SHOP);
    };

    const filterCategoryHandler = (category: string, filter: string) => {
        navigate(Screens.SHOP, { state: { category, filter } });
    };

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
                                                            onClick={filterHandler.bind(
                                                                this,
                                                                'MEN'
                                                            )}
                                                        >
                                                            Men
                                                        </a>
                                                        <ul>
                                                            {categoryData?.MEN?.map(
                                                                (item) => (
                                                                    <li
                                                                        key={
                                                                            item?._id
                                                                        }
                                                                    >
                                                                        <a
                                                                            onClick={filterCategoryHandler.bind(
                                                                                this,
                                                                                item?.name,
                                                                                'MEN'
                                                                            )}
                                                                        >
                                                                            {
                                                                                item?.name
                                                                            }
                                                                        </a>
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </li>
                                                    <li className='mega-menu-sub-width20'>
                                                        <a
                                                            className='menu-title'
                                                            onClick={filterHandler.bind(
                                                                this,
                                                                'WOMEN'
                                                            )}
                                                        >
                                                            Women
                                                        </a>
                                                        <ul>
                                                            {categoryData?.WOMEN?.map(
                                                                (item) => (
                                                                    <li
                                                                        key={
                                                                            item?._id
                                                                        }
                                                                    >
                                                                        <a
                                                                            onClick={filterCategoryHandler.bind(
                                                                                this,
                                                                                item?.name,
                                                                                'WOMEN'
                                                                            )}
                                                                        >
                                                                            {
                                                                                item?.name
                                                                            }
                                                                        </a>
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </li>
                                                    <li className='mega-menu-sub-width20'>
                                                        <a
                                                            className='menu-title'
                                                            onClick={filterHandler.bind(
                                                                this,
                                                                'KIDS'
                                                            )}
                                                        >
                                                            Kids
                                                        </a>
                                                        <ul>
                                                            {categoryData?.KIDS?.map(
                                                                (item) => (
                                                                    <li
                                                                        key={
                                                                            item?._id
                                                                        }
                                                                    >
                                                                        <a
                                                                            onClick={filterCategoryHandler.bind(
                                                                                this,
                                                                                item?.name,
                                                                                'KIDS'
                                                                            )}
                                                                        >
                                                                            {
                                                                                item?.name
                                                                            }
                                                                        </a>
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </li>
                                                    <li className='mega-menu-sub-width37'>
                                                        <div className='banner-menu-content-wrap default-overlay'>
                                                            <a
                                                                onClick={
                                                                    shopHandler
                                                                }
                                                            >
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
                                                        <Link
                                                            to={
                                                                Screens.ORDER_TRACK
                                                            }
                                                        >
                                                            Order Tracking
                                                        </Link>
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
