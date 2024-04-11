import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginUser } from 'src/api/LoginUser';
import { IError } from 'src/models/api/ErrorModel';
import { IStep } from 'src/models/screens/Forgot';
import { ILoginModel } from 'src/models/screens/Login';
import { personalDetailsSliceActions } from 'src/store/Actions';
import { REGEX } from 'src/utils/Constants';
import { setCookie } from 'src/utils/Helpers';
import { Keys } from 'src/utils/Keys';
import { Screens } from 'src/utils/Screens';

const LoginForm = () => {
    const { isLoading, mutateAsync } = useMutation(Keys.LOGIN, LoginUser);

    const [step, setStep] = useState<IStep>({
        step1: true,
        step2: false,
    });

    const [data, setData] = useState<ILoginModel>({
        email: '',
        password: '',
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

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();

        if (isLoading) return;

        if (step.step1) {
            if (!REGEX.EMAIL_OR_PHONE.test(data.email)) {
                toast.error('Please enter valid email / phone number');
                return;
            }
            setStep({
                step1: false,
                step2: true,
            });
            return;

            mutateAsync(data)
                .then((res) => {
                    if (res.status === 200) {
                        setCookie('access-token', res.data.token, 30);
                        dispatch(
                            personalDetailsSliceActions.setCredentials({
                                token: res.data.token,
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
        }

        if (step.step2) {
            if (!REGEX.OTP.test(data.password)) {
                toast.error('Please enter a valid OTP');
                return;
            }

            mutateAsync(data)
                .then((res) => {
                    if (res.status === 200) {
                        setCookie('access-token', res.data.token, 30);
                        dispatch(
                            personalDetailsSliceActions.setCredentials({
                                token: res.data.token,
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
                            <input
                                type='text'
                                value={data.email}
                                onChange={changeHandler.bind(this, 'email')}
                                maxLength={50}
                                required
                            />
                        </div>
                        {step.step2 && (
                            <div className='sin-login-register'>
                                <label>
                                    OTP <span>*</span>
                                </label>
                                <input
                                    type='text'
                                    value={data.password}
                                    onChange={changeHandler.bind(
                                        this,
                                        'password'
                                    )}
                                    maxLength={6}
                                    required
                                />
                            </div>
                        )}
                        <div className='login-register-btn-remember'>
                            <div className='login-register-btn'>
                                <button type='submit'>
                                    {isLoading ? (
                                        <div className='loading-spinner'></div>
                                    ) : step.step1 ? (
                                        'Send OTP'
                                    ) : (
                                        'Log in'
                                    )}
                                </button>
                            </div>
                        </div>
                        <Link to={Screens.FORGOT}>Lost your password?</Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
