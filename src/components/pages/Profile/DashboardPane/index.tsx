import { useSelector } from 'react-redux';
import Avatar from 'src/assets/Avatar';
import { IStoreModel } from 'src/store';
import { CONSTANTS } from 'src/utils/Constants';

const DashboardPane = (props: { logoutHandler: () => void }) => {
    const profileData = useSelector(
        (state: IStoreModel) => state.personalDetailsReducer.profileData
    );

    return (
        <div
            className='tab-pane fade show active'
            id='dashboad'
            role='tabpanel'
        >
            <div className='myaccount-content'>
                <div className='welcome'>
                    {profileData?.image ? (
                        <img
                            className='img-fluid user-image'
                            src={`${CONSTANTS.HOST}${CONSTANTS.IMG_PATH}${profileData?.image}`}
                            alt='User Image'
                        />
                    ) : (
                        <div className='user-image'>
                            <Avatar />
                        </div>
                    )}
                    <p>
                        Hello, <strong>{profileData.name}</strong> (If Not{' '}
                        <strong>{profileData.name} !</strong>
                        <a onClick={props.logoutHandler} className='logout'>
                            {' '}
                            Logout
                        </a>
                        )
                    </p>
                </div>

                <p className='mb-0'>
                    From your account dashboard. you can view your recent
                    orders, manage your shipping and billing addresses and edit
                    your password and account details.
                </p>
            </div>
        </div>
    );
};

export default DashboardPane;
