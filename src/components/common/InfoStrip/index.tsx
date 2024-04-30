import { useSelector } from 'react-redux';
import InfoSvg from 'src/assets/InfoSvg';
import { IStoreModel } from 'src/store';

const InfoStrip = () => {
    const personalDetails = useSelector(
        (store: IStoreModel) => store.personalDetailsReducer.profileData
    );
    const isValidEmail = !!personalDetails.email;
    const isValidPhone = !!personalDetails.phoneNumber;

    return (
        <>
            {isValidPhone && isValidEmail ? null : (
                <div
                    className='alert alert-primary d-flex align-items-center alert-dismissible fade show'
                    role='alert'
                >
                    <InfoSvg
                        className='bi flex-shrink-0 me-2'
                        width='24'
                        height='24'
                        role='img'
                        aria-label='Info:'
                    />
                    <div>
                        Your
                        <strong>
                            {isValidEmail
                                ? ' Mobile Number '
                                : ' Email Address '}
                        </strong>
                        is either not linked or not verified! Please verify it
                        from <strong>Account Details</strong> tab.
                    </div>
                    <button
                        type='button'
                        className='btn-close'
                        data-bs-dismiss='alert'
                        aria-label='Close'
                    ></button>
                </div>
            )}
        </>
    );
};

export default InfoStrip;
