import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ForgotPassword } from 'src/api/ForgotPassword';
import { ResetPassword } from 'src/api/ResetPassword';
import { IError } from 'src/models/api/ErrorModel';
import { IForgotData, IStep } from 'src/models/screens/Forgot';
import { REGEX } from 'src/utils/Constants';
import { Keys } from 'src/utils/Keys';
import { Screens } from 'src/utils/Screens';

const ForgotData = () => {
    const { isLoading: otpLoading, mutateAsync: sendOtp } = useMutation(
        Keys.SEND_OTP,
        ForgotPassword
    );
    const { isLoading: resetLoading, mutateAsync: resetPassword } = useMutation(
        Keys.RESET_PASSWORD,
        ResetPassword
    );

    const [activeStep, setActiveStep] = useState<IStep>({
        step1: true,
        step2: false,
    });

    const [data, setData] = useState<IForgotData>({
        email: '',
        newPassword: '',
        otp: '',
    });

    const navigate = useNavigate();

    const changeHandler = (
        uid: keyof IForgotData,
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setData((oldState) => ({
            ...oldState,
            [uid]: event.target.value,
        }));
    };

    const otpHandler = () => {
        if (!REGEX.EMAIL.test(data.email)) {
            toast.error('Please enter valid email address');
            return;
        }

        sendOtp(data.email)
            .then((res) => {
                if (res.status === 200) {
                    toast.success(res?.message);
                    setActiveStep({
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
    };

    const resetHandler = () => {
        if (!REGEX.PASSWORD.test(data.newPassword)) {
            toast.error(
                'Please enter a valid 8 characters new password containing both alphabets and numbers'
            );
            return;
        }

        if (!REGEX.OTP.test(data.otp)) {
            toast.error('Please enter a valid OTP');
            return;
        }

        resetPassword(data)
            .then((res) => {
                if (res.status === 200) {
                    toast.success(res?.message);
                    navigate(Screens.LOGIN);
                    return;
                }
                throw new Error(res?.error);
            })
            .catch((err: IError) =>
                toast.error(
                    err.response?.data?.error
                        ? err.response?.data?.error
                        : 'Unable to reset password right now!'
                )
            );
    };

    return (
        <div className='login-register-area section-padding-1 pt-100 pb-100'>
            <div className='container'>
                <div className='row'>
                    <div className='login-register-wrap mr-70'>
                        <h3>
                            <FontAwesomeIcon icon={faLock} /> Forgot Password?
                        </h3>
                        <div className='login-register-form'>
                            {activeStep.step1 ? (
                                <div className='sin-login-register'>
                                    <label>
                                        Email address <span>*</span>
                                    </label>
                                    <input
                                        type='text'
                                        value={data.email}
                                        onChange={changeHandler.bind(
                                            this,
                                            'email'
                                        )}
                                        maxLength={50}
                                    />
                                </div>
                            ) : null}
                            {activeStep.step2 ? (
                                <>
                                    <div className='sin-login-register'>
                                        <label>
                                            New Password <span>*</span>
                                        </label>
                                        <input
                                            type='password'
                                            value={data.newPassword}
                                            onChange={changeHandler.bind(
                                                this,
                                                'newPassword'
                                            )}
                                            maxLength={50}
                                        />
                                    </div>
                                    <div className='sin-login-register'>
                                        <label>
                                            OTP <span>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            value={data.otp.slice(0, 6)}
                                            onChange={changeHandler.bind(
                                                this,
                                                'otp'
                                            )}
                                            maxLength={6}
                                        />
                                    </div>
                                </>
                            ) : null}
                            <div className='login-register-btn-remember'>
                                <div className='login-register-btn'>
                                    <button
                                        type='button'
                                        onClick={
                                            otpLoading || resetLoading
                                                ? undefined
                                                : activeStep.step1
                                                ? otpHandler
                                                : resetHandler
                                        }
                                    >
                                        {otpLoading || resetLoading ? (
                                            <div className='loading-spinner'></div>
                                        ) : activeStep.step1 ? (
                                            'Send OTP'
                                        ) : (
                                            'Reset'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotData;
