import { useState } from 'react';
import MiniCart from 'src/components/pages/Home/MiniCart';
import QuickInfo from 'src/components/pages/Home/QuickInfo';
import SearchModal from 'src/components/pages/Home/SearchModal';
import { IToggle } from 'src/models/screens/Home';
import MobileHeader from '../MobileHeader';
import Logo from '/assets/icons/logo.png';

const Header = () => {
    const [show, setShow] = useState<IToggle>({
        quickInfo: false,
        cart: false,
        mobileNav: false,
        search: false,
    });

    const toggleHandler = (uid: keyof IToggle) => {
        setShow((oldState) => ({
            ...oldState,
            [uid]: !oldState[uid],
        }));
    };

    return (
        <>
            <header className='header-area header-padding-1'>
                <div className='main-header-wrap'>
                    <div className='container-fluid'>
                        <div className='row align-items-center'>
                            <div className='col-lg-3'>
                                <div className='logo-header-about-wrap'>
                                    <div className='logo logo-width'>
                                        <a href='index.html'>
                                            <img src={Logo} alt='logo' />
                                        </a>
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
                                                <a
                                                    className='active'
                                                    href='index.html'
                                                >
                                                    Home
                                                </a>
                                            </li>
                                            <li>
                                                <a href='#'>
                                                    Shop{' '}
                                                    <i className='fa fa-angle-down'></i>
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
                                                </ul>
                                            </li>
                                            <li>
                                                <a href='shop-fullwide.html'>
                                                    Collections{' '}
                                                </a>
                                            </li>
                                            <li>
                                                <a href='#'>
                                                    More{' '}
                                                    <i className='fa fa-angle-down'></i>
                                                </a>
                                                <ul className='sub-menu-width'>
                                                    <li>
                                                        <a href='about-us.html'>
                                                            About Us
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href='contact-us.html'>
                                                            Contact Us
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href='faq.html'>
                                                            FAQ
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href='comming-soon.html'>
                                                            Comming Soon
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href='404.html'>
                                                            Page 404
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className='col-lg-3'>
                                <div className='lang-cart-search-wrap'>
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
                                                2
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
                                    <a href='index.html'>
                                        <img alt='Logo' src={Logo} />
                                    </a>
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
                                                2
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
