import { faMobileScreen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Screens } from 'src/utils/Screens';

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
                <Link to={Screens.ORDER_TRACK}>Track Order</Link>
            </div>
        </div>
    );
};

export default HeaderStrip;
