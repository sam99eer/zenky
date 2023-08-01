import { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { SendMessage } from 'src/api/SendMessage';
import { IError } from 'src/models/api/ErrorModel';
import { IContactForm } from 'src/models/screens/Contact';
import { REGEX } from 'src/utils/Constants';
import { Keys } from 'src/utils/Keys';

const ContactForm = () => {
    const {
        data: apiData,
        isLoading,
        mutateAsync,
    } = useMutation(Keys.SEND_MESSAGE, SendMessage);

    const [data, setData] = useState<IContactForm>({
        email: '',
        message: '',
        name: '',
        phoneNumber: '',
    });

    const changeHandler = (
        uid: keyof IContactForm,
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setData((oldState) => ({
            ...oldState,
            [uid]: event.target.value,
        }));
    };

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault();

        if (isLoading) return;

        if (apiData?.status === 200) {
            toast.warn('You have already submitted a query');
            return;
        }

        if (data.name.trim().length < 3) {
            toast.warn('Please enter a valid name');
            return;
        }

        if (!REGEX.EMAIL.test(data.email)) {
            toast.warn('Please enter a valid email address');
            return;
        }

        if (!REGEX.PHONE.test(data.phoneNumber)) {
            toast.warn('Please enter a valid numeric 10 digits phone number');
            return;
        }

        if (data.message.trim().length < 10 || data.message.length > 1000) {
            toast.warn(
                'Please enter a valid message between 10 to 1000 characters'
            );
            return;
        }

        await mutateAsync(data)
            .then((res) => {
                if (res.status === 200) {
                    setData({
                        email: '',
                        message: '',
                        name: '',
                        phoneNumber: '',
                    });
                    toast.success(res?.message);
                    return;
                }
                throw res?.error;
            })
            .catch((err: IError) =>
                toast.error(
                    err.response?.data?.error
                        ? err.response?.data?.error
                        : 'Unable to send query right now!'
                )
            );
    };

    return (
        <div className='col-xl-9 col-lg-8 col-md-7'>
            <div className='contact-form-area'>
                <h2>Get a quote</h2>
                <form id='contact-form' method='post' onSubmit={submitHandler}>
                    <div className='row'>
                        <div className='col-lg-12 col-md-12 col-12'>
                            <input
                                name='first_name'
                                type='text'
                                placeholder='Your Name... *'
                                value={data.name}
                                onChange={changeHandler.bind(this, 'name')}
                                maxLength={50}
                            />
                        </div>
                        <div className='col-lg-6 col-md-12 col-12'>
                            <input
                                name='email_address'
                                type='email'
                                placeholder='Your Email... *'
                                value={data.email}
                                onChange={changeHandler.bind(this, 'email')}
                                maxLength={50}
                            />
                        </div>
                        <div className='col-lg-6 col-md-12 col-12'>
                            <input
                                name='phone'
                                type='text'
                                placeholder='Enter your phone...'
                                value={data.phoneNumber}
                                onChange={changeHandler.bind(
                                    this,
                                    'phoneNumber'
                                )}
                                maxLength={10}
                            />
                        </div>
                        <div className='col-lg-12 col-md-12 col-12'>
                            <textarea
                                name='message'
                                placeholder='Your Message'
                                value={data.message}
                                onChange={changeHandler.bind(this, 'message')}
                                maxLength={1000}
                            />
                        </div>
                        <div className='col-lg-12 col-md-12 col-12'>
                            <button className='submit' type='submit'>
                                {isLoading ? (
                                    <div className='loader'></div>
                                ) : (
                                    'Send'
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
