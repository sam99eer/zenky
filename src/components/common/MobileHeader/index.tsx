import { IToggle } from 'src/models/screens/Home';

const MobileHeader = (props: {
    isVisible: boolean;
    closeHandler: (uid: keyof IToggle) => void;
}) => {
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
                                    <a href='index.html'>Home</a>
                                </li>
                                <li className='menu-item-has-children '>
                                    <a href='shop-fullwide.html'>Shop</a>
                                    <ul className='dropdown'>
                                        <li className='menu-item-has-children'>
                                            <a href='#'>Shop For</a>
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
                                            <a href='#'>Cart</a>
                                            <ul className='dropdown'>
                                                <li>
                                                    <a href='product-details.html'>
                                                        Shopping Cart
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='product-details-2.html'>
                                                        Checkout
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className='menu-item-has-children'>
                                            <a href='#'>Profile</a>
                                            <ul className='dropdown'>
                                                <li>
                                                    <a href='cart.html'>
                                                        My Account
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='checkout.html'>
                                                        Wishlist
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='my-account.html'>
                                                        Order Tracking
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li className='menu-item-has-children'>
                                    <a href='#'>More</a>
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
                                        <li>
                                            <a href='comming-soon.html'>
                                                Comming Soon
                                            </a>
                                        </li>
                                        <li>
                                            <a href='404.html'>Page 404</a>
                                        </li>
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
