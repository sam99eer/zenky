import { faMobileScreen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Screens } from 'src/utils/Screens';

const HeaderStrip = () => {
    return (
        <div className='nav-strip container-fluid d-flex justify-content-between align-items-center'>
            <div>
                <div className='modal fade app-modal' id='appModal'>
                    <div className='modal-dialog modal-dialog-centered'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title'>Download App</h5>
                                <button
                                    type='button'
                                    className='btn-close'
                                    data-bs-dismiss='modal'
                                ></button>
                            </div>
                            <div className='modal-body'>
                                <h2>
                                    Mobile App Will Be available soon for
                                    Android and Iphone
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
                <a>Offers</a>
                <a
                    href='javascript:void(0)'
                    data-bs-toggle='modal'
                    data-bs-target='#appModal'
                >
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
