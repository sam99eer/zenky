import { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { SendOtp } from 'src/api/SendOtp';
import { UpdateProfile } from 'src/api/UpdateProfile';
import { VerifyOtp } from 'src/api/VerifyOtp';
import VerifyModal from 'src/components/pages/Profile/VerifyModal';
import { IError } from 'src/models/api/ErrorModel';
import {
    ISendOtpPayloadModel,
    IVerifyOtpPayload,
} from 'src/models/screens/Login';
import {
    IProfileNeededData,
    T_Otp_Form,
    T_Otp_Modal,
} from 'src/models/screens/Profile';
import { IStoreModel } from 'src/store';
import { personalDetailsSliceActions } from 'src/store/Actions';
import { REGEX } from 'src/utils/Constants';
import { Keys } from 'src/utils/Keys';

const AccountDetailsPane = () => {
    const { isLoading, mutateAsync } = useMutation(
        Keys.UPDATE_PROFILE,
        UpdateProfile
    );

    const { isLoading: sendLoading, mutateAsync: sendOtp } = useMutation(
        Keys.SEND_OTP,
        SendOtp
    );

    const {
        data: verifyData,
        isLoading: verifyLoading,
        mutateAsync: verifyOtp,
    } = useMutation(Keys.VERIFY_OTP, VerifyOtp);

    const profileData = useSelector(
        (state: IStoreModel) => state.personalDetailsReducer.profileData
    );

    const token = useSelector(
        (state: IStoreModel) => state.personalDetailsReducer.token
    );

    const dispatch = useDispatch();

    const [data, setData] = useState<IProfileNeededData>({
        name: profileData?.name ?? '',
        address: profileData?.address ?? '',
        city: profileData?.city ?? '',
        country: profileData?.country ?? 'India',
        phoneNumber: profileData?.phoneNumber ?? '',
        state: profileData?.state ?? 'Andhra Pradesh',
        zipCode: profileData?.zipCode ?? '',
        email: profileData?.email ?? '',
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [modal, setModal] = useState<T_Otp_Modal>({
        type: null,
        isVisible: false,
    });

    const fileHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
    };

    const changeHandler = (
        uid: keyof IProfileNeededData,
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setData((oldState) => ({
            ...oldState,
            [uid]: event.target.value,
        }));
    };

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();

        if (isLoading || verifyLoading || sendLoading)
            return toast.warn(
                'Operation already in progress! Please try again.'
            );

        const formData = new FormData();

        if (
            profileData.zipCode !== data.zipCode &&
            data.zipCode?.trim() !== ''
        ) {
            if (!REGEX.ZIP.test(data?.zipCode!)) {
                toast.error('Please enter valid ZIP Code');
                return;
            }
            formData.append('zipCode', data.zipCode!);
        }

        if (
            profileData.phoneNumber !== data.phoneNumber &&
            data.phoneNumber?.trim() !== ''
        ) {
            if (!REGEX.PHONE.test(data?.phoneNumber!)) {
                toast.error('Please enter valid Phone Number');
                return;
            }
            formData.append('phoneNumber', data.phoneNumber!);
        }

        if (profileData.name !== data.name && data.name?.trim() !== '') {
            formData.append('name', data.name!);
        }

        if (
            profileData.address !== data.address &&
            data.address?.trim() !== ''
        ) {
            formData.append('address', data.address!);
        }

        if (profileData.city !== data.city && data.city?.trim() !== '') {
            formData.append('city', data.city!);
        }

        if (profileData.state !== data.state && data.state?.trim() !== '') {
            formData.append('state', data.state!);
        }

        if (
            profileData.country !== data.country &&
            data.country?.trim() !== ''
        ) {
            formData.append('country', data.country!);
        }

        if (!!selectedFile?.size) {
            formData.append('image', selectedFile);
        }

        mutateAsync({
            data: formData,
            token: token!,
        })
            .then((res) => {
                dispatch(
                    personalDetailsSliceActions.fillProfileData({
                        data: res.data,
                    })
                );
                toast.success(res.message);
            })
            .catch((err: IError) =>
                toast.error(
                    err.response?.data?.error
                        ? err.response?.data?.error
                        : 'Unable to update profile right now!'
                )
            );
    };

    const modalHandler = (type: T_Otp_Form, isVisible: boolean) => {
        setModal({
            type,
            isVisible,
        });
    };

    const sendOtpHandler = (type: T_Otp_Form) => {
        if (verifyLoading || sendLoading) return;

        const isEmail = type === 'email';

        if (isEmail && !REGEX.EMAIL.test(`${data.email}`)) {
            return toast.warn('Please enter valid email');
        }

        if (type === 'mobile' && !REGEX.PHONE.test(`${data.phoneNumber}`)) {
            return toast.warn('Please enter valid mobile number');
        }

        const payload: ISendOtpPayloadModel = {
            countryCode: isEmail ? '' : '+91',
            email: isEmail ? `${data.email}` : '',
            phoneNumber: isEmail ? '' : `${data.phoneNumber}`,
        };

        sendOtp(payload)
            .then((res) => {
                if (res.status === 200) {
                    modalHandler(type, true);
                    return;
                }
                throw new Error(res?.error);
            })
            .catch((err: IError) =>
                toast.error(
                    err.response?.data?.error
                        ? err.response?.data?.error
                        : `Unable to send OTP to this ${
                              isEmail ? 'email' : 'mobile'
                          } right now!`
                )
            );
    };

    const verifyOtpHandler = (otp: string) => {
        if (verifyLoading || sendLoading) return;
        const isEmail = modal.type === 'email';

        modalHandler(null, false);

        const payload: IVerifyOtpPayload = {
            countryCode: isEmail ? '' : '+91',
            email: isEmail ? `${data.email}` : '',
            phoneNumber: isEmail ? '' : `${data.phoneNumber}`,
            otp,
        };

        verifyOtp(payload)
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Verified successfully!');
                    return;
                }
                throw new Error(res?.error);
            })
            .catch((err: IError) =>
                toast.error(
                    err.response?.data?.error
                        ? err.response?.data?.error
                        : `Unable to verify this ${
                              isEmail ? 'email' : 'mobile'
                          } right now!`
                )
            );
    };

    return (
        <>
            {modal.isVisible && (
                <VerifyModal
                    onSave={verifyOtpHandler}
                    onClose={modalHandler.bind(this, null, false)}
                />
            )}
            <div className='tab-pane fade' id='account-info' role='tabpanel'>
                <div className='myaccount-content'>
                    <div className='account-details-form'>
                        <form onSubmit={submitHandler}>
                            <div className='single-input-item'>
                                <label htmlFor='display-pic'>
                                    Display Picture{' '}
                                    <small className='form-text text-muted'>
                                        (Recommended Size - 128 x 128)
                                    </small>
                                </label>
                                <div className='file-input'>
                                    <input
                                        type='file'
                                        id='customFileInput'
                                        accept='image/*'
                                        onChange={fileHandler}
                                    />
                                    <label htmlFor='customFileInput'>
                                        <span>
                                            {selectedFile?.name
                                                ? selectedFile?.name
                                                : 'Choose File'}
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div className='single-input-item'>
                                <label htmlFor='full-name'>Full Name</label>
                                <input
                                    type='text'
                                    id='full-name'
                                    value={data.name!}
                                    onChange={changeHandler.bind(this, 'name')}
                                />
                            </div>
                            <div className='single-input-item'>
                                <label htmlFor='address'>Address</label>
                                <input
                                    type='text'
                                    id='address'
                                    value={data.address!}
                                    onChange={changeHandler.bind(
                                        this,
                                        'address'
                                    )}
                                />
                            </div>
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <div className='single-input-item'>
                                        <label htmlFor='city'>City</label>
                                        <input
                                            type='text'
                                            id='city'
                                            value={data.city!}
                                            onChange={changeHandler.bind(
                                                this,
                                                'city'
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='single-input-item'>
                                        <label htmlFor='zip'>ZIP Code</label>
                                        <input
                                            type='text'
                                            id='zip'
                                            value={data.zipCode!}
                                            onChange={changeHandler.bind(
                                                this,
                                                'zipCode'
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <div className='single-input-item'>
                                        <label htmlFor='state'>State</label>
                                        <select
                                            className='select-active'
                                            id='state'
                                            value={data.state!}
                                            onChange={changeHandler.bind(
                                                this,
                                                'state'
                                            )}
                                        >
                                            <option value='Andhra Pradesh'>
                                                Andhra Pradesh
                                            </option>
                                            <option value='Andaman and Nicobar Islands'>
                                                Andaman and Nicobar Islands
                                            </option>
                                            <option value='Arunachal Pradesh'>
                                                Arunachal Pradesh
                                            </option>
                                            <option value='Assam'>Assam</option>
                                            <option value='Bihar'>Bihar</option>
                                            <option value='Chandigarh'>
                                                Chandigarh
                                            </option>
                                            <option value='Chhattisgarh'>
                                                Chhattisgarh
                                            </option>
                                            <option value='Dadar and Nagar Haveli'>
                                                Dadar and Nagar Haveli
                                            </option>
                                            <option value='Daman and Diu'>
                                                Daman and Diu
                                            </option>
                                            <option value='Delhi'>Delhi</option>
                                            <option value='Lakshadweep'>
                                                Lakshadweep
                                            </option>
                                            <option value='Puducherry'>
                                                Puducherry
                                            </option>
                                            <option value='Goa'>Goa</option>
                                            <option value='Gujarat'>
                                                Gujarat
                                            </option>
                                            <option value='Haryana'>
                                                Haryana
                                            </option>
                                            <option value='Himachal Pradesh'>
                                                Himachal Pradesh
                                            </option>
                                            <option value='Jammu and Kashmir'>
                                                Jammu and Kashmir
                                            </option>
                                            <option value='Jharkhand'>
                                                Jharkhand
                                            </option>
                                            <option value='Karnataka'>
                                                Karnataka
                                            </option>
                                            <option value='Kerala'>
                                                Kerala
                                            </option>
                                            <option value='Madhya Pradesh'>
                                                Madhya Pradesh
                                            </option>
                                            <option value='Maharashtra'>
                                                Maharashtra
                                            </option>
                                            <option value='Manipur'>
                                                Manipur
                                            </option>
                                            <option value='Meghalaya'>
                                                Meghalaya
                                            </option>
                                            <option value='Mizoram'>
                                                Mizoram
                                            </option>
                                            <option value='Nagaland'>
                                                Nagaland
                                            </option>
                                            <option value='Odisha'>
                                                Odisha
                                            </option>
                                            <option value='Punjab'>
                                                Punjab
                                            </option>
                                            <option value='Rajasthan'>
                                                Rajasthan
                                            </option>
                                            <option value='Sikkim'>
                                                Sikkim
                                            </option>
                                            <option value='Tamil Nadu'>
                                                Tamil Nadu
                                            </option>
                                            <option value='Telangana'>
                                                Telangana
                                            </option>
                                            <option value='Tripura'>
                                                Tripura
                                            </option>
                                            <option value='Uttar Pradesh'>
                                                Uttar Pradesh
                                            </option>
                                            <option value='Uttarakhand'>
                                                Uttarakhand
                                            </option>
                                            <option value='West Bengal'>
                                                West Bengal
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='single-input-item'>
                                        <label htmlFor='country'>Country</label>
                                        <select
                                            className='select-active'
                                            id='country'
                                            value={data.country!}
                                            onChange={changeHandler.bind(
                                                this,
                                                'country'
                                            )}
                                        >
                                            <option value='India'>India</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className='single-input-item'>
                                <label htmlFor='email'>Email Address</label>
                                <div className='d-flex align-items-center'>
                                    <input
                                        type='email'
                                        id='email'
                                        value={data.email!}
                                        disabled={
                                            !!profileData.email ||
                                            verifyData?.status === 200
                                        }
                                        onChange={changeHandler.bind(
                                            this,
                                            'email'
                                        )}
                                    />
                                    {!!profileData.email ? null : (
                                        <button
                                            type='button'
                                            className='ms-2'
                                            disabled={
                                                verifyData?.status === 200
                                            }
                                            onClick={sendOtpHandler.bind(
                                                this,
                                                'email'
                                            )}
                                        >
                                            {verifyLoading || sendLoading ? (
                                                <div className='loading-spinner' />
                                            ) : (
                                                'Verify'
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className='single-input-item'>
                                <label htmlFor='phone'>Phone Number</label>
                                <div className='d-flex align-items-center'>
                                    <input
                                        type='text'
                                        id='phone'
                                        maxLength={10}
                                        value={data.phoneNumber!}
                                        disabled={
                                            !!profileData.phoneNumber ||
                                            verifyData?.status === 200
                                        }
                                        onChange={changeHandler.bind(
                                            this,
                                            'phoneNumber'
                                        )}
                                    />
                                    {!!profileData.phoneNumber ? null : (
                                        <button
                                            type='button'
                                            className='ms-2'
                                            disabled={
                                                verifyData?.status === 200
                                            }
                                            onClick={sendOtpHandler.bind(
                                                this,
                                                'mobile'
                                            )}
                                        >
                                            {verifyLoading || sendLoading ? (
                                                <div className='loading-spinner' />
                                            ) : (
                                                'Verify'
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className='single-input-item'>
                                <button className='check-btn sqr-btn '>
                                    {isLoading ? (
                                        <div className='loading-spinner'></div>
                                    ) : (
                                        'Save Changes'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AccountDetailsPane;
