import { Link } from 'react-router-dom';
import { Screens } from 'src/utils/Screens';

const NotFoundData = () => {
    return (
        <div className='error-area'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='error-content text-center'>
                            <h2>404</h2>
                            <h3>Page not found!</h3>
                            <p>
                                It looks like nothing was found at this
                                location.
                            </p>
                            <div className='call-to-action-wrap text-center'>
                                <Link to={Screens.HOME}>
                                    <div className='call-to-action-normal call-to-action-common hover-tm-color error-btn'>
                                        <span>Back to home</span>
                                    </div>
                                    <div className='call-to-action-hover call-to-action-common hover-tm-color error-btn'>
                                        <span>Back to home</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundData;
