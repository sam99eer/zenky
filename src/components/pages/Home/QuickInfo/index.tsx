import {
    faFacebookF,
    faInstagram,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IToggle } from 'src/models/screens/Home';
import { Screens } from 'src/utils/Screens';
import PaymentInfo from '/assets/images/payment-info.png';

const QuickInfo = (props: {
    isVisible: boolean;
    closeHandler: (uid: keyof IToggle) => void;
}) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const navigateHandler = () => {
        if (pathname === Screens.HOME) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        navigate(Screens.HOME);
    };

    return (
        <>
            <div
                className={`quickinfo-wrapper-active quickinfo-toggle-left ${
                    props.isVisible
                        ? 'quickinfo-visible , .menu4-visible'
                        : null
                }`}
            >
                <a
                    className='quickinfo-close'
                    onClick={props.closeHandler.bind(this, 'quickInfo')}
                >
                    <i className='ti-close'></i>
                </a>
                <div className='quickinfo-wrap'>
                    <div className='quickinfo-menu'>
                        <nav>
                            <ul>
                                <li>
                                    <a href='about-us.html'>About Us</a>
                                </li>
                                <li>
                                    <a href='#'>Help Center</a>
                                </li>
                                <li>
                                    <a href='#'>Privacy Policy</a>
                                </li>
                                <li>
                                    <Link to={Screens.CONTACT}>Contact Us</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className='quickinfo-address'>
                        <ul>
                            <li>(+612) 2531 5600</li>
                            <li>
                                <a href='#'>info@example.com </a>
                            </li>
                            <li>
                                PO Box 1622 Colins Street West <br />
                                Victoria 8077 Australia
                            </li>
                        </ul>
                    </div>
                    <div className='quickinfo-map-link'>
                        <a href='#'>Google map</a>
                    </div>
                    <div className='quickinfo-social'>
                        <ul>
                            <li>
                                <a
                                    href='https://www.facebook.com/people/The-Zenky/100095030589458/'
                                    target='_blank'
                                >
                                    <FontAwesomeIcon icon={faFacebookF} />
                                </a>
                            </li>
                            <li>
                                <a
                                    href='https://twitter.com/ZenkyOfficial'
                                    target='_blank'
                                >
                                    <FontAwesomeIcon icon={faTwitter} />
                                </a>
                            </li>
                            <li>
                                <a
                                    href='https://www.instagram.com/the_zenky_official/'
                                    target='_blank'
                                >
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='quickinfo-payment'>
                        <img src={PaymentInfo} alt='payment' />
                    </div>
                    <div className='quickinfo-copyright'>
                        <p>
                            © {new Date().getFullYear()}{' '}
                            <a onClick={navigateHandler}>the zenky</a>. All
                            rights reserved
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuickInfo;
