import { faMobileScreen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HeaderStrip = () => {
    return (
        <div className='nav-strip container-fluid d-flex justify-content-between align-items-center'>
            <div>
                <a>Offers</a>
                <a>
                    <FontAwesomeIcon className='mx-1' icon={faMobileScreen} />
                    Download App
                </a>
                <a>COD Available</a>
            </div>
            <div>
                <a>Track Order</a>
            </div>
        </div>
    );
};

export default HeaderStrip;
