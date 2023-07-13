import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IToggle } from 'src/models/screens/Home';
import { IStoreModel } from 'src/store';
import { personalDetailsSliceActions } from 'src/store/Actions';
import { Screens } from 'src/utils/Screens';

const MobileHeader = (props: {
    isVisible: boolean;
    closeHandler: (uid: keyof IToggle) => void;
}) => {
    const isLoggedIn = useSelector(
        (state: IStoreModel) => state.personalDetailsReducer.isLoggedIn
    );
    const dispatch = useDispatch();

    const logoutHandler = () => {
        localStorage.removeItem('access-token');
        dispatch(personalDetailsSliceActions.flushData());
    };

    return (
        <div
            className={`mobile-off-canvas-active ${
                props.isVisible ? 'inside' : ''
            }`}
        >
            <a
                className='mobile-aside-close'
                onClick={props.closeHandler.bind(this, 'mobileNav')}
            >
                <i className='ti-close'></i>
            </a>
            <div className='header-mobile-aside-wrap'>
                <div className='mobile-search'>
                    <form className='search-form' action='#'>
                        <input type='text' placeholder='Search entire store…' />
                        <button className='button-search'>
                            <i className='ti-search'></i>
                        </button>
                    </form>
                </div>
                <div className='mobile-menu-wrap'>
                    <div className='mobile-navigation'>
                        <nav>
                            <ul className='mobile-menu'>
                                <li className='menu-item-has-children'>
                                    <Link to={Screens.HOME}>Home</Link>
                                </li>
                                <li className='menu-item-has-children '>
                                    <a>Shop</a>
                                    <ul className='dropdown'>
                                        <li className='menu-item-has-children'>
                                            <a>Shop For</a>
                                            <ul className='dropdown'>
                                                <li>
                                                    <a href='shop-fullwide.html'>
                                                        Men
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='shop-sidebar.html'>
                                                        Women
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='shop-3col.html'>
                                                        Both
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className='menu-item-has-children'>
                                            <a>Cart</a>
                                            <ul className='dropdown'>
                                                <li>
                                                    <Link to={Screens.CART}>
                                                        Shopping Cart
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to={Screens.CHECKOUT}>
                                                        Checkout
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className='menu-item-has-children'>
                                            <a>Profile</a>
                                            <ul className='dropdown'>
                                                <li>
                                                    <Link to={Screens.PROFILE}>
                                                        My Account
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to={Screens.WISHLIST}>
                                                        Wishlist
                                                    </Link>
                                                </li>
                                                <li>
                                                    <a href='#'>
                                                        Order Tracking
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li className='menu-item-has-children'>
                                    <a>More</a>
                                    <ul className='dropdown'>
                                        <li>
                                            <a href='about-us.html'>About Us</a>
                                        </li>
                                        <li>
                                            <a href='contact-us.html'>
                                                Contact Us
                                            </a>
                                        </li>
                                        <li>
                                            <a href='faq.html'>FAQ</a>
                                        </li>
                                        {isLoggedIn ? (
                                            <li>
                                                <a onClick={logoutHandler}>
                                                    Logout
                                                </a>
                                            </li>
                                        ) : null}
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className='mobile-social-wrap'>
                    <a className='facebook' href='#'>
                        <i className='ti-facebook'></i>
                    </a>
                    <a className='twitter' href='#'>
                        <i className='ti-twitter-alt'></i>
                    </a>
                    <a className='pinterest' href='#'>
                        <i className='ti-pinterest'></i>
                    </a>
                    <a className='instagram' href='#'>
                        <i className='ti-instagram'></i>
                    </a>
                    <a className='google' href='#'>
                        <i className='ti-google'></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MobileHeader;
