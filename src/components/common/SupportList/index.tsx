import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SupportList = () => {
    return (
        <div className='support-lists'>
            <ul>
                <li>
                    <a
                        href='https://www.instagram.com/the_zenky_official/'
                        target='_blank'
                    >
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </li>
                <li>
                    <a href='mailto:thezenkyofficial@gmail.com'>
                        <i className='ti-email'></i>
                    </a>
                </li>
                <li>
                    <a href='#' target='_blank'>
                        <FontAwesomeIcon icon={faWhatsapp} />
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default SupportList;
