import { useSelector } from 'react-redux';
import Avatar from 'src/assets/Avatar';
import { IStoreModel } from 'src/store';
import { formatServerImagePath } from 'src/utils/Helpers';

const DashboardPane = (props: {
    logoutHandler: () => void;
    isOrderActive: boolean;
}) => {
    const profileData = useSelector(
        (state: IStoreModel) => state.personalDetailsReducer.profileData
    );

    return (
        <div
            className={`tab-pane fade ${
                props.isOrderActive ? '' : 'show active'
            }`}
            id='dashboard'
            role='tabpanel'
        >
            <div className='myaccount-content'>
                <div className='welcome'>
                    {profileData?.image ? (
                        <img
                            className='img-fluid user-image'
                            src={formatServerImagePath(profileData?.image)}
                            alt='User Image'
                        />
                    ) : (
                        <div className='user-image'>
                            <Avatar />
                        </div>
                    )}
                    <p>
                        Hello, <strong>{profileData.name}</strong> (If Not{' '}
                        <strong>
                            {profileData.email ?? profileData.phoneNumber} !
                        </strong>
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
