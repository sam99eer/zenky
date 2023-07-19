import { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Signup } from 'src/api/Signup';
import { IError } from 'src/models/api/ErrorModel';
import { IRegisterModel } from 'src/models/screens/Login';
import { personalDetailsSliceActions } from 'src/store/Actions';
import { REGEX } from 'src/utils/Constants';
import { setCookie } from 'src/utils/Helpers';
import { Keys } from 'src/utils/Keys';
import { Screens } from 'src/utils/Screens';

const RegisterForm = () => {
    const { isLoading, mutateAsync } = useMutation(Keys.REGISTER, Signup);

    const [data, setData] = useState<IRegisterModel>({
        email: '',
        name: '',
        password: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeHandler = (
        uid: keyof IRegisterModel,
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

        if (data.name.trim().length < 4) {
            toast.error(
                'Please enter a valid Full Name of atleast 4 characters'
            );
            return;
        }

        if (!REGEX.EMAIL.test(data.email)) {
            toast.error('Please enter valid email address');
            return;
        }

        if (!REGEX.PASSWORD.test(data.password)) {
            toast.error(
                'Please enter a valid 8 characters password containing both alphabets and numbers'
            );
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
                        : 'Unable to register account right now!'
                )
            );
    };

    return (
        <div className='col-lg-6 col-md-6'>
            <div className='login-register-wrap register-wrap'>
                <h3>
                    <i className='fa fa-user-o'></i> Register
                </h3>
                <div className='login-register-form'>
                    <form onSubmit={submitHandler}>
                        <div className='sin-login-register'>
                            <label>
                                Full Name <span>*</span>
                            </label>
                            <input
                                type='text'
                                value={data.name}
                                onChange={changeHandler.bind(this, 'name')}
                                maxLength={50}
                                required
                            />
                        </div>
                        <div className='sin-login-register'>
                            <label>
                                Email address <span>*</span>
                            </label>
                            <input
                                type='email'
                                value={data.email}
                                onChange={changeHandler.bind(this, 'email')}
                                maxLength={50}
                                required
                            />
                        </div>
                        <div className='sin-login-register'>
                            <label>
                                Password <span>*</span>
                            </label>
                            <input
                                type='password'
                                value={data.password}
                                onChange={changeHandler.bind(this, 'password')}
                                maxLength={50}
                                required
                            />
                        </div>
                        <p>
                            Your personal data will be used to support your
                            experience throughout this website, to manage access
                            to your account, and for other purposes described in
                            our <a href='#'>privacy policy</a>
                        </p>
                        <div className='login-register-btn'>
                            <button type='submit'>
                                {isLoading ? (
                                    <div className='loader'></div>
                                ) : (
                                    'Register'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
