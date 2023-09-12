import { useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { NewsLetter } from 'src/api/NewsLetter';
import { IError } from 'src/models/api/ErrorModel';
import { Keys } from 'src/utils/Keys';

const Subscribe = () => {
    const [email, setEmail] = useState('');

    const { data, isLoading, mutateAsync } = useMutation(
        Keys.SUBSCRIBE,
        NewsLetter
    );

    const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (email.length > 50) return;
        setEmail(event.target.value);
    };

    const subscribeHandler = (event: React.FormEvent) => {
        event.preventDefault();

        if (isLoading) return;

        if (data?.status === 200) {
            toast.warn('Already subscribed');
            return;
        }

        if (email.trim().length < 4 || !email.includes('@')) {
            toast.error('Invalid Email');
            return;
        }

        mutateAsync(email)
            .then((res) => {
                toast.success(res.message);
                setEmail('');
            })
            .catch((err: IError) =>
                toast.error(
                    err.response?.data?.error
                        ? err.response?.data?.error
                        : 'Unable to subscribe right now!'
                )
            );
    };

    return (
        <div className='subscribe-area pt-190 pb-200 parallax-active subscribe-parallax-bg'>
            <div className='container'>
                <div className='row'>
                    <div className='ms-auto me-auto col-lg-8 col-md-10'>
                        <div className='subscribe-wrap-3 white-subscribe-wrap-3 scrb-font-width-dec text-center'>
                            <h2>BE THE FIRST TO KNOW</h2>
                            <p>Join Our Newsletter and Get 15% Sale Off</p>
                            <div
                                id='mc_embed_signup'
                                className='subscribe-form-3'
                            >
                                <form
                                    id='mc-embedded-subscribe-form'
                                    className='validate subscribe-form-style'
                                    onSubmit={subscribeHandler}
                                >
                                    <div
                                        id='mc_embed_signup_scroll'
                                        className='mc-form-3'
                                    >
                                        <input
                                            className='email'
                                            type='email'
                                            required
                                            placeholder='Enter your email address...'
                                            name='EMAIL'
                                            value={email}
                                            onChange={emailHandler}
                                            maxLength={50}
                                        />
                                        <div className='clear-3'>
                                            {isLoading ? (
                                                <div className='loading-spinner'></div>
                                            ) : (
                                                <input
                                                    id='mc-embedded-subscribe'
                                                    className='button'
                                                    type='submit'
                                                    name='subscribe'
                                                    value='Subscribe'
                                                />
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscribe;
