import { IToggle } from 'src/models/screens/Home';
import PaymentInfo from '/assets/images/payment-info.png';

const QuickInfo = (props: {
    isVisible: boolean;
    closeHandler: (uid: keyof IToggle) => void;
}) => {
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
                                    <a href='#'>Contact Us</a>
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
                                <a href='#'>
                                    <i className='fa fa-facebook'></i>
                                </a>
                            </li>
                            <li>
                                <a href='#'>
                                    <i className='fa fa-twitter'></i>
                                </a>
                            </li>
                            <li>
                                <a href='#'>
                                    <i className='fa fa-google-plus'></i>
                                </a>
                            </li>
                            <li>
                                <a href='#'>
                                    <i className='fa fa-behance'></i>
                                </a>
                            </li>
                            <li>
                                <a href='#'>
                                    <i className='fa fa-instagram'></i>
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
                            <a href='#'>the zenky</a>. All rights reserved
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuickInfo;
