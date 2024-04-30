import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { GetProfile } from 'src/api/GetProfile';
import InfoStrip from 'src/components/common/InfoStrip';
import AccountDetailsPane from 'src/components/pages/Profile/AccountDetailsPane';
import ChangePasswordPane from 'src/components/pages/Profile/ChangePasswordPane';
import DashboardPane from 'src/components/pages/Profile/DashboardPane';
import OrdersPane from 'src/components/pages/Profile/OrdersPane';
import { IStoreModel } from 'src/store';
import {
    cartSliceActions,
    personalDetailsSliceActions,
} from 'src/store/Actions';
import { deleteCookie } from 'src/utils/Helpers';
import { Keys } from 'src/utils/Keys';

const ProfileData = () => {
    const personalDetails = useSelector(
        (state: IStoreModel) => state.personalDetailsReducer
    );

    const {
        state,
    }: {
        state: {
            isOrderActive?: boolean;
        };
    } = useLocation();

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
        deleteCookie('access-token');
        dispatch(personalDetailsSliceActions.flushData());
    };

    useEffect(() => {
        if (!!state?.isOrderActive) {
            dispatch(cartSliceActions.flushCart());
        }
    }, [state?.isOrderActive]);

    return (
        <div className='my-account-area pt-100 pb-95'>
            <div className='container'>
                {!isLoading ? <InfoStrip /> : null}
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
                                        href='#dashboard'
                                        className={
                                            !!state?.isOrderActive
                                                ? ''
                                                : 'active'
                                        }
                                        data-bs-toggle='tab'
                                    >
                                        Dashboard
                                    </a>
                                    <a
                                        href='#orders'
                                        className={
                                            !!state?.isOrderActive
                                                ? 'active'
                                                : ''
                                        }
                                        data-bs-toggle='tab'
                                    >
                                        Orders
                                    </a>
                                    <a
                                        href='#account-info'
                                        data-bs-toggle='tab'
                                    >
                                        Account Details
                                    </a>
                                    <a href='#change-pass' data-bs-toggle='tab'>
                                        change password
                                    </a>
                                    <a onClick={logoutHandler}>Logout</a>
                                </div>

                                <div
                                    className='tab-content'
                                    id='myaccountContent'
                                >
                                    <DashboardPane
                                        logoutHandler={logoutHandler}
                                        isOrderActive={!!state?.isOrderActive}
                                    />
                                    <OrdersPane
                                        isOrderActive={!!state?.isOrderActive}
                                    />
                                    <AccountDetailsPane />
                                    <ChangePasswordPane />
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
