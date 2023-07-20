import { useLocation, useNavigate } from 'react-router-dom';
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
                                        <a href='#'>Help</a>
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
                                    <li>
                                        <a href='#'>Affiliate</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='footer-column footer-width-16'></div>
                    <div className='footer-column footer-width-22'>
                        <div className='footer-widget mb-40'>
                            <div className='footer-about'>
                                <div className='footer-info footer-info-mrg-none'>
                                    <ul>
                                        <li>
                                            <a href='#'> info@example.com </a>
                                        </li>
                                        <li> +54.854.854.6666 </li>
                                        <li> 035 Virginia Plaza Suite 331 </li>
                                    </ul>
                                </div>
                                <div className='footer-social footer-social-dec'>
                                    <ul>
                                        <li>
                                            <a className='facebook' href='#'>
                                                <i className='fa fa-facebook'></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a className='twitter' href='#'>
                                                <i className='fa fa-twitter'></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a className='youtube' href='#'>
                                                <i className='fa fa-youtube'></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a className='dribbble' href='#'>
                                                <i className='fa fa-dribbble'></i>
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
