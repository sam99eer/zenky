import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IToggle } from 'src/models/screens/Home';
import { IStoreModel } from 'src/store';
import { personalDetailsSliceActions } from 'src/store/Actions';
import { deleteCookie } from 'src/utils/Helpers';
import { Screens } from 'src/utils/Screens';

const MobileHeader = (props: {
    isVisible: boolean;
    closeHandler: (uid: keyof IToggle) => void;
}) => {
    const isLoggedIn = useSelector(
        (state: IStoreModel) => state.personalDetailsReducer.isLoggedIn
    );

    const [search, setSearch] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const navigateHandler = (filter: string) => {
        navigate(Screens.SHOP, { state: { filter } });
    };

    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const formHandler = (event: FormEvent) => {
        event.preventDefault();

        if (search.trim().length < 3) {
            toast.warn('Please enter atleast 3 characters');
            return;
        }

        navigate(Screens.SHOP, { state: { search } });
    };

    const logoutHandler = () => {
        deleteCookie('access-token');
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
                    <form className='search-form' onSubmit={formHandler}>
                        <input
                            type='text'
                            placeholder='Search entire store…'
                            value={search}
                            onChange={searchHandler}
                        />
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
                                                    <a
                                                        onClick={navigateHandler.bind(
                                                            this,
                                                            'MEN'
                                                        )}
                                                    >
                                                        Men
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        onClick={navigateHandler.bind(
                                                            this,
                                                            'WOMEN'
                                                        )}
                                                    >
                                                        Women
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        onClick={navigateHandler.bind(
                                                            this,
                                                            'BOTH'
                                                        )}
                                                    >
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
                                            <Link to={Screens.CONTACT}>
                                                Contact Us
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={Screens.FAQ}>FAQ</Link>
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
