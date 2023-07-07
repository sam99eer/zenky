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
                                    <ul className='dropdown'>
                                        <li className='menu-item-has-children'>
                                            <a href='#'>Demo Group 01</a>
                                            <ul className='dropdown'>
                                                <li>
                                                    <a href='index.html'>
                                                        Home 01
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='index-2.html'>
                                                        Home 02
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='index-3.html'>
                                                        Home 03
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='index-4.html'>
                                                        Home 04
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='index-5.html'>
                                                        Home 05
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='index-6.html'>
                                                        Home 06
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className='menu-item-has-children'>
                                            <a href='#'>Demo Group 02</a>
                                            <ul className='dropdown'>
                                                <li>
                                                    <a href='index-7.html'>
                                                        Home 07
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='index-8.html'>
                                                        Home 08
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='index-9.html'>
                                                        Home 09
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='index-10.html'>
                                                        Home 10
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='index-11.html'>
                                                        Home 11
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='index-12.html'>
                                                        Home 12
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className='menu-item-has-children'>
                                            <a href='#'>Demo Group 03</a>
                                            <ul className='dropdown'>
                                                <li>
                                                    <a href='index-13.html'>
                                                        Home 13
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='index-14.html'>
                                                        Home 14
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='index-15.html'>
                                                        Home 15
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='index-16.html'>
                                                        Home 16
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='index-17.html'>
                                                        Home 17
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='index-18.html'>
                                                        Home 18
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='index-19.html'>
                                                        Home 19
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li className='menu-item-has-children '>
                                    <a href='shop-fullwide.html'>shop</a>
                                    <ul className='dropdown'>
                                        <li className='menu-item-has-children'>
                                            <a href='#'>Shop Layout</a>
                                            <ul className='dropdown'>
                                                <li>
                                                    <a href='shop-fullwide.html'>
                                                        Shop Fullwidth
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='shop-sidebar.html'>
                                                        Shop Sidebar
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='shop-3col.html'>
                                                        Shop 03 Column
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='shop-4col.html'>
                                                        Shop 04 Column
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='shop-masonry.html'>
                                                        Shop Mansory
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='shop-metro.html'>
                                                        Shop Metro Layout
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='shop-instagram.html'>
                                                        Shop Instagram
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='shop-collection-classic.html'>
                                                        Collection Classic
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='shop-collection-modern.html'>
                                                        Collection Modern
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className='menu-item-has-children'>
                                            <a href='#'>Product Layout</a>
                                            <ul className='dropdown'>
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
                                                        Product Carousel
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='product-details-grouped.html'>
                                                        Product Grouped
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='product-details-affiliate.html'>
                                                        Product Affiliate
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='product-details-configurable.html'>
                                                        Product Configurable
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className='menu-item-has-children'>
                                            <a href='#'>Shop Page </a>
                                            <ul className='dropdown'>
                                                <li>
                                                    <a href='cart.html'>
                                                        Shopping Cart
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
                                                        Order Tracking
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li className='menu-item-has-children'>
                                    <a href='#'>Pages</a>
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
                                <li className='menu-item-has-children '>
                                    <a href='blog.html'>Blog</a>
                                    <ul className='dropdown'>
                                        <li>
                                            <a href='blog.html'>Blog Sidebar</a>
                                        </li>
                                        <li>
                                            <a href='blog-no-sidebar.html'>
                                                Blog No Sidebar
                                            </a>
                                        </li>
                                        <li>
                                            <a href='blog-3col.html'>
                                                Blog 03 Columns
                                            </a>
                                        </li>
                                        <li>
                                            <a href='blog-masonry.html'>
                                                Blog Mansory
                                            </a>
                                        </li>
                                        <li className='menu-item-has-children'>
                                            <a href='#'>Single Post</a>
                                            <ul className='dropdown'>
                                                <li>
                                                    <a href='blog-details.html'>
                                                        Single Post 01
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='blog-details-2.html'>
                                                        Single Post 02
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href='contact-us.html'>Contact us</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className='mobile-curr-lang-wrap'>
                    <div className='single-mobile-curr-lang'>
                        <a className='mobile-language-active' href='#'>
                            Language <i className='fa fa-angle-down'></i>
                        </a>
                        <div className='lang-curr-dropdown lang-dropdown-active'>
                            <ul>
                                <li>
                                    <a href='#'>English (US)</a>
                                </li>
                                <li>
                                    <a href='#'>English (UK)</a>
                                </li>
                                <li>
                                    <a href='#'>Spanish</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='single-mobile-curr-lang'>
                        <a className='mobile-currency-active' href='#'>
                            Currency <i className='fa fa-angle-down'></i>
                        </a>
                        <div className='lang-curr-dropdown curr-dropdown-active'>
                            <ul>
                                <li>
                                    <a href='#'>USD</a>
                                </li>
                                <li>
                                    <a href='#'>EUR</a>
                                </li>
                                <li>
                                    <a href='#'>Real</a>
                                </li>
                                <li>
                                    <a href='#'>BDT</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='single-mobile-curr-lang'>
                        <a className='mobile-account-active' href='#'>
                            My Account <i className='fa fa-angle-down'></i>
                        </a>
                        <div className='lang-curr-dropdown account-dropdown-active'>
                            <ul>
                                <li>
                                    <a href='#'>Login</a>
                                </li>
                                <li>
                                    <a href='#'>Creat Account</a>
                                </li>
                                <li>
                                    <a href='my-account.html'>My Account</a>
                                </li>
                            </ul>
                        </div>
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
