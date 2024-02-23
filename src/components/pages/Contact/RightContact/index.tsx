import {
    faFacebookF,
    faInstagram,
    faTwitter,
    faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RightContact = () => {
    return (
        <div className='col-xl-3 col-lg-4 col-md-5'>
            <div className='contact-info-area'>
                <h2>Get Info</h2>
				<p>You may contact us using the information below:</p>
                <div className='contact-info-top'>
                    <div className='sin-contact-info-wrap'>
						<p><b>Merchant Legal entity name:</b></p>
                        <div className='contact-address'>
                            <i className='ti-home'></i>
                            <span>the zenky</span>
                        </div>
                    </div>
					 <div className='sin-contact-info-wrap'>
						<p><b>Registered Address:</b></p>
                        <div className='contact-address'>
                            <i className='ti-location-pin'></i>
                            <span>EG 852, Mohalla Gobind Garh Jalandhar PUNJAB 144001</span>
                        </div>
                    </div>
                </div>
                <div className='contact-info-bottom'>
                    <ul>
                        <li>
                            <i className=' ti-email '></i>
                            help@thezenky.com
                        </li>
                        <li>
                            <i className=' ti-email '></i>
                            thezenkyofficial@gmail.com
                        </li>
                    </ul>
                    <div className='contact-info-social'>
                        <a
                            href='https://www.facebook.com/people/The-Zenky/100095030589458/'
                            target='_blank'
                        >
                            <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                        <a
                            href='https://twitter.com/ZenkyOfficial'
                            target='_blank'
                        >
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a
                            href='https://www.instagram.com/the_zenky_official/'
                            target='_blank'
                        >
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href='https://wa.me/7341122603' target='_blank'>
                            <FontAwesomeIcon icon={faWhatsapp} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightContact;
