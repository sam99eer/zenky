import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ChangeUserPassword } from 'src/api/ChangeUserPassword';
import { IError } from 'src/models/api/ErrorModel';
import { IChangePassword } from 'src/models/screens/Profile';
import { IStoreModel } from 'src/store';
import { REGEX } from 'src/utils/Constants';
import { Keys } from 'src/utils/Keys';

const ChangePasswordPane = () => {
    const { isLoading, mutateAsync } = useMutation(
        Keys.CHANGE_PASSWORD,
        ChangeUserPassword
    );

    const token = useSelector(
        (state: IStoreModel) => state.personalDetailsReducer.token
    );

    const [data, setData] = useState<IChangePassword>({
        oldPassword: '',
        newPassword: '',
    });

    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const changeHandler = (
        uid: keyof IChangePassword,
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setData((oldState) => ({
            ...oldState,
            [uid]: event.target.value,
        }));
    };

    const formHandler = (event: FormEvent) => {
        event.preventDefault();

        if (confirmPasswordRef.current?.value !== data.newPassword) {
            toast.warn(
                'New Password and Confirm Password should match each other'
            );
            return;
        }

        if (!REGEX.PASSWORD.test(data.newPassword)) {
            toast.warn(
                'Please enter a valid 8 characters new password containing both alphabets and numbers'
            );
            return;
        }

        mutateAsync({
            data,
            token: token!,
        })
            .then((res) => {
                setData({
                    newPassword: '',
                    oldPassword: '',
                });
                confirmPasswordRef.current!.value = '';
                toast.success(res.message);
            })
            .catch((err: IError) =>
                toast.error(
                    err.response?.data?.error
                        ? err.response?.data?.error
                        : 'Unable to change password right now!'
                )
            );
    };

    return (
        <div className='tab-pane fade' id='change-pass' role='tabpanel'>
            <div className='myaccount-content'>
                <form className='account-details-form' onSubmit={formHandler}>
                    <fieldset>
                        <legend>Change Password</legend>
                        <div className='single-input-item'>
                            <label htmlFor='current-pwd' className='required'>
                                Current password
                            </label>
                            <input
                                type='password'
                                id='current-pwd'
                                value={data.oldPassword}
                                onChange={changeHandler.bind(
                                    this,
                                    'oldPassword'
                                )}
                            />
                        </div>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='single-input-item'>
                                    <label
                                        htmlFor='new-pwd'
                                        className='required'
                                    >
                                        New password
                                    </label>
                                    <input
                                        type='password'
                                        id='new-pwd'
                                        value={data.newPassword}
                                        onChange={changeHandler.bind(
                                            this,
                                            'newPassword'
                                        )}
                                    />
                                </div>
                            </div>
                            <div className='col-lg-12'>
                                <div className='single-input-item'>
                                    <label
                                        htmlFor='confirm-pwd'
                                        className='required'
                                    >
                                        Confirm new password
                                    </label>
                                    <input
                                        type='password'
                                        id='confirm-pwd'
                                        ref={confirmPasswordRef}
                                    />
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <div className='single-input-item'>
                        <button className='check-btn sqr-btn '>
                            {isLoading ? (
                                <div className='loading-spinner'></div>
                            ) : (
                                'Change Password'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordPane;
