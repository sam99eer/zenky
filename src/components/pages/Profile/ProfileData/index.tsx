import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { GetProfile } from 'src/api/GetProfile';
import AccountDetailsPane from 'src/components/pages/Profile/AccountDetailsPane';
import AddressPane from 'src/components/pages/Profile/AddressPane';
import DashboardPane from 'src/components/pages/Profile/DashboardPane';
import OrdersPane from 'src/components/pages/Profile/OrdersPane';
import { IStoreModel } from 'src/store';
import { personalDetailsSliceActions } from 'src/store/Actions';
import { Keys } from 'src/utils/Keys';

const ProfileData = () => {
    const personalDetails = useSelector(
        (state: IStoreModel) => state.personalDetailsReducer
    );

    const dispatch = useDispatch();

    const { isLoading } = useQuery(
        Keys.PROFILE,
        GetProfile.bind(this, personalDetails.token!),
        {
            enabled:
                !!personalDetails.token &&
                !!personalDetails.profileData?._id === false,
            onSuccess: (data) => {
                dispatch(
                    personalDetailsSliceActions.fillProfileData({
                        data: data.data,
                    })
                );
            },
        }
    );

    const logoutHandler = () => {
        localStorage.removeItem('access-token');
        dispatch(personalDetailsSliceActions.flushData());
    };

    return (
        <div className='my-account-area pt-100 pb-95'>
            <div className='container'>
                <div className='row flex-row-reverse'>
                    <div className='col-lg-12'>
                        {isLoading ? (
                            <div className='skeleton-1b7fljkf61d'></div>
                        ) : (
                            <>
                                <div
                                    className='myaccount-tab-menu nav'
                                    role='tablist'
                                >
                                    <a
                                        href='#dashboad'
                                        className='active'
                                        data-bs-toggle='tab'
                                    >
                                        Dashboard
                                    </a>
                                    <a href='#orders' data-bs-toggle='tab'>
                                        {' '}
                                        Orders
                                    </a>
                                    <a
                                        href='#address-edit'
                                        data-bs-toggle='tab'
                                    >
                                        {' '}
                                        address
                                    </a>
                                    <a
                                        href='#account-info'
                                        data-bs-toggle='tab'
                                    >
                                        {' '}
                                        Account Details
                                    </a>
                                    <a onClick={logoutHandler}>Logout</a>
                                </div>

                                <div
                                    className='tab-content'
                                    id='myaccountContent'
                                >
                                    <DashboardPane
                                        logoutHandler={logoutHandler}
                                    />
                                    <OrdersPane />
                                    <AddressPane />
                                    <AccountDetailsPane />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileData;
