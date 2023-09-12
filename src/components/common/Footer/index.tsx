import {
    faFacebookF,
    faInstagram,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Screens } from 'src/utils/Screens';
import Logo from '/assets/icons/logo.png';

const Footer = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const clickHandler = () => {
        if (pathname === Screens.HOME) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        navigate(Screens.HOME);
    };

    return (
        <footer className='footer-area section-padding-1 bg-black pt-70'>
            <div className='container'>
                <div className='row'>
                    <div className='footer-column footer-width-45 footer-about-center'>
                        <div className='footer-widget mb-40'>
                            <div className='footer-about'>
                                <div className='footer-logo'>
                                    <a onClick={clickHandler}>
                                        <img src={Logo} alt='logo' />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='footer-column footer-width-16'>
                        <div className='footer-widget mb-40'>
                            <div className='footer-list'>
                                <ul>
                                    <li>
                                        <Link to={Screens.ORDER_TRACK}>
                                            Track Order
                                        </Link>
                                    </li>
                                    <li>
                                        <a href='#'>Return Order</a>
                                    </li>
                                    <li>
                                        <a href='#'>Cancel Order</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='footer-column footer-width-16'>
                        <div className='footer-widget mb-40'>
                            <div className='footer-list'>
                                <ul>
                                    <li>
                                        <Link to={Screens.FAQ}>FAQ</Link>
                                    </li>
                                    <li>
                                        <a href='#'>Returns</a>
                                    </li>
                                    <li>
                                        <a href='about-us.html'>About Us</a>
                                    </li>
                                    <li>
                                        <a href='#'>Terms & Conditions</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='footer-column footer-width-22'>
                        <div className='footer-widget mb-40'>
                            <div className='footer-about'>
                                <div className='footer-info footer-info-mrg-none'>
                                    <ul>
                                        <li>
                                            <a href='mailto:help@thezenky.com'>
                                                help@thezenky.com
                                            </a>
                                        </li>
                                        <li>
                                            <a href='mailto:thezenkyofficial@gmail.com'>
                                                thezenkyofficial@gmail.com
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className='footer-social footer-social-dec'>
                                    <ul>
                                        <li>
                                            <a
                                                className='facebook'
                                                href='https://www.facebook.com/people/The-Zenky/100095030589458/'
                                                target='_blank'
                                            >
                                                <FontAwesomeIcon
                                                    icon={faFacebookF}
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className='twitter'
                                                href='https://twitter.com/ZenkyOfficial'
                                                target='_blank'
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTwitter}
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className='instagram'
                                                href='https://www.instagram.com/the_zenky_official/'
                                                target='_blank'
                                            >
                                                <FontAwesomeIcon
                                                    icon={faInstagram}
                                                />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='copyright text-center pt-25 pb-10'>
                    <p>
                        ©{new Date().getFullYear()} the zenky - All rights
                        reserved{' '}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
