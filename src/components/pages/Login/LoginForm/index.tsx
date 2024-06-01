import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SendOtp } from 'src/api/SendOtp';
import { VerifyOtp } from 'src/api/VerifyOtp';
import useTimer from 'src/hooks/useTimer';
import { IError } from 'src/models/api/ErrorModel';
import { IStep } from 'src/models/screens/Forgot';
import {
    ILoginModel,
    ISendOtpPayloadModel,
    IVerifyOtpPayload,
} from 'src/models/screens/Login';
import { personalDetailsSliceActions } from 'src/store/Actions';
import { REGEX } from 'src/utils/Constants';
import { setCookie } from 'src/utils/Helpers';
import { Keys } from 'src/utils/Keys';
import { Screens } from 'src/utils/Screens';

const LoginForm = () => {
    const { isEnabled, timeLeft, handleStart } = useTimer(30);

    const { isLoading, mutateAsync: sendOtp } = useMutation(
        Keys.SEND_LOGIN_OTP,
        SendOtp
    );

    const { isLoading: verifyLoading, mutateAsync: verifyOtp } = useMutation(
        Keys.VERIFY_OTP,
        VerifyOtp
    );

    const [step, setStep] = useState<IStep>({
        step1: true,
        step2: false,
    });

    const [data, setData] = useState<ILoginModel>({
        username: '',
        otp: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeHandler = (
        uid: keyof ILoginModel,
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setData((oldState) => ({
            ...oldState,
            [uid]: event.target.value,
        }));
    };

    const stepResetHandler = () => {
        setStep({
            step1: true,
            step2: false,
        });
    };

    const resendOtpHandler = () => {
        handleStart();
        const isEmail = REGEX.EMAIL.test(data.username);
        const payload: ISendOtpPayloadModel = {
            email: isEmail ? data.username : '',
            countryCode: isEmail ? '' : '+91',
            phoneNumber: isEmail ? '' : data.username,
        };
        sendOtp(payload)
            .then((res) => {
                if (res.status === 200) {
                    toast.success('OTP resent successfully!');
                    return;
                }
                throw new Error(res?.error);
            })
            .catch((err: IError) =>
                toast.error(
                    err.response?.data?.error
                        ? err.response?.data?.error
                        : 'Unable to resend OTP right now!'
                )
            );
    };

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();

        if (isLoading || verifyLoading) return;

        if (!REGEX.EMAIL_OR_PHONE.test(data.username)) {
            toast.error('Please enter valid email / phone number');
            return;
        }
        const isEmail = REGEX.EMAIL.test(data.username);

        if (step.step1) {
            const payload: ISendOtpPayloadModel = {
                email: isEmail ? data.username : '',
                countryCode: isEmail ? '' : '+91',
                phoneNumber: isEmail ? '' : data.username,
            };

            sendOtp(payload)
                .then((res) => {
                    if (res.status === 200) {
                        toast.success(res.message);
                        setStep({
                            step1: false,
                            step2: true,
                        });
                        return;
                    }
                    throw new Error(res?.error);
                })
                .catch((err: IError) =>
                    toast.error(
                        err.response?.data?.error
                            ? err.response?.data?.error
                            : 'Unable to send OTP right now!'
                    )
                );

            return;
        }

        if (step.step2) {
            if (!REGEX.OTP.test(data.otp)) {
                toast.error('Please enter a valid OTP');
                return;
            }

            const payload: IVerifyOtpPayload = {
                email: isEmail ? data.username : '',
                countryCode: isEmail ? '' : '+91',
                phoneNumber: isEmail ? '' : data.username,
                otp: data.otp,
            };

            verifyOtp(payload)
                .then((res) => {
                    if (res.status === 200) {
                        setCookie('access-token', res.data.token, 30);
                        dispatch(
                            personalDetailsSliceActions.setCredentials({
                                token: res.data.token,
                            })
                        );
                        dispatch(
                            personalDetailsSliceActions.fillProfileData({
                                data: {
                                    _id: res.data.user._id,
                                    address: res.data.user.address,
                                    city: res.data.user.city,
                                    country: res.data.user.country,
                                    countryCode:
                                        res.data.user?.countryCode ?? '',
                                    createdAt: res.data.user.createdAt,
                                    email: res.data.user?.email ?? '',
                                    image: res.data.user.image,
                                    isBlocked: res.data.user.isBlocked,
                                    name: res.data.user?.name ?? '',
                                    phoneNumber:
                                        res.data.user?.phoneNumber ?? '',
                                    role: res.data.user.role,
                                    state: res.data.user.state,
                                    updatedAt: res.data.user.updatedAt,
                                    zipCode: res.data.user.zipCode,
                                },
                            })
                        );
                        toast.success(res?.message);
                        navigate(Screens.PROFILE);
                        return;
                    }
                    throw new Error(res?.error);
                })
                .catch((err: IError) =>
                    toast.error(
                        err.response?.data?.error
                            ? err.response?.data?.error
                            : 'Unable to login account right now!'
                    )
                );

            return;
        }
    };

    return (
        <div className='col-lg-6 col-md-6'>
            <div className='login-register-wrap mr-70'>
                <h3>
                    <FontAwesomeIcon icon={faUser} /> Login / Register
                </h3>
                <div className='login-register-form'>
                    <form onSubmit={submitHandler}>
                        <div className='sin-login-register'>
                            <label>
                                Email address / Phone number <span>*</span>
                            </label>
                            <div className='login-register-btn-input'>
                                <input
                                    type='text'
                                    value={data.username}
                                    onChange={changeHandler.bind(
                                        this,
                                        'username'
                                    )}
                                    maxLength={50}
                                    disabled={step.step2}
                                    required
                                />
                                {step.step2 && (
                                    <span
                                        role='button'
                                        onClick={stepResetHandler}
                                    >
                                        Change?
                                    </span>
                                )}
                            </div>
                        </div>
                        {step.step2 && (
                            <div className='sin-login-register'>
                                <label>
                                    OTP <span>*</span>
                                </label>
                                <div className='login-register-btn-input'>
                                    <input
                                        type='text'
                                        value={data.otp}
                                        onChange={changeHandler.bind(
                                            this,
                                            'otp'
                                        )}
                                        maxLength={6}
                                        required
                                    />
                                    {step.step2 &&
                                        (isEnabled ? (
                                            <span
                                                role='button'
                                                onClick={resendOtpHandler}
                                            >
                                                Resend?
                                            </span>
                                        ) : (
                                            <span>{timeLeft}s</span>
                                        ))}
                                </div>
                            </div>
                        )}
                        <div className='login-register-btn-remember'>
                            <div className='login-register-btn'>
                                <button type='submit'>
                                    {isLoading || verifyLoading ? (
                                        <div className='loading-spinner'></div>
                                    ) : step.step1 ? (
                                        'Send OTP'
                                    ) : (
                                        'Log in'
                                    )}
                                </button>
                            </div>
                        </div>
                        {/* <Link to={Screens.FORGOT}>Lost your password?</Link> */}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
