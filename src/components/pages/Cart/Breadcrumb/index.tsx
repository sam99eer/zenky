import { Link } from 'react-router-dom';
import { Screens } from 'src/utils/Screens';

const Breadcrumb = () => {
    return (
        <div className='breadcrumb-area bg-gray-2 section-padding-1 pt-200 pb-120'>
            <div className='container-fluid'>
                <div className='breadcrumb-content text-center'>
                    <div className='breadcrumb-title'>
                        <h2>Cart</h2>
                    </div>
                    <ul>
                        <li>
                            <Link to={Screens.HOME}>Home</Link>
                        </li>
                        <li>
                            <span> &gt; </span>
                        </li>
                        <li className='active'>Cart</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Breadcrumb;
