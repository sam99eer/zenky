import { ChangeEvent, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CreateOrder } from 'src/api/CreateOrder';
import { SendMobileOtp } from 'src/api/SendMobileOtp';
import { ValidatePin } from 'src/api/ValidatePin';
import { VerifyMobileOtp } from 'src/api/VerifyMobileOtp';
import { VerifyPayment } from 'src/api/VerifyPayment';
import { IOrderData } from 'src/models/api/CreateOrderModel';
import { IError } from 'src/models/api/ErrorModel';
import { IRzpError, IRzpOptions } from 'src/models/data/RazorpayModel';
import { ICheckoutForm } from 'src/models/screens/Checkout';
import { IStoreModel } from 'src/store';
import { CONSTANTS, REGEX } from 'src/utils/Constants';
import {
    checkEmpty,
    checkRegex,
    checkScript,
    getPinDataClass,
    getSendOtpClass,
    getVerifyOtpClass,
    loadScript,
} from 'src/utils/Helpers';
import { Keys } from 'src/utils/Keys';
import { Screens } from 'src/utils/Screens';
import Logo from '/assets/icons/android-chrome-192x192.png';

const CheckoutForm = () => {
    const queryClient = useQueryClient();

    const { isLoading, mutateAsync } = useMutation(
        Keys.CREATE_ORDER,
        CreateOrder
    );

    const [isPayOnline, setIsPayOnline] = useState(false);

    const { isLoading: verifyLoading, mutateAsync: verifyPayment } =
        useMutation(Keys.VERIFY_PAYMENT, VerifyPayment);

    const {
        isLoading: sendMobileOtpLoading,
        data: sendMobileOtpData,
        error: sendError,
        mutateAsync: sendMobileOtp,
    } = useMutation(Keys.SEND_MOBILE_OTP, SendMobileOtp);

    const {
        isLoading: verifyMobileOtpLoading,
        data: verifyMobileOtpData,
        error: verifyError,
        mutateAsync: verifyMobileOtp,
    } = useMutation(Keys.VERIFY_MOBILE_OTP, VerifyMobileOtp);

    const {
        data: pinData,
        error: pinError,
        isLoading: pinLoading,
        mutateAsync: checkServicable,
    } = useMutation(Keys.VALIDATE_PIN, ValidatePin);

    const cartItems = useSelector(
        (state: IStoreModel) => state.cartReducer.cartItem
    );

    const token = useSelector(
        (state: IStoreModel) => state.personalDetailsReducer.token
    );

    const profileData = useSelector(
        (state: IStoreModel) => state.personalDetailsReducer.profileData
    );

    const navigate = useNavigate();

    const subTotal = useMemo(
        () =>
            cartItems.length > 0
                ? cartItems.reduce((acc, curVal) => acc + curVal?.totalPrice, 0)
                : 0,
        [cartItems]
    );

    const pinHelperData = useMemo(
        () => getPinDataClass(pinData, pinError as IError),
        [pinData, pinError]
    );

    const sendOtpData = useMemo(
        () => getSendOtpClass(sendMobileOtpData, sendError as IError),
        [sendMobileOtpData, sendError]
    );

    const verifyMobileData = useMemo(
        () => getVerifyOtpClass(verifyMobileOtpData, verifyError as IError),
        [verifyMobileOtpData, verifyError]
    );

    const nameOfUser = profileData?.name ? profileData.name.split(' ') : [];

    const [data, setData] = useState<ICheckoutForm>({
        firstName: nameOfUser.length > 0 ? nameOfUser[0] : '',
        lastName: nameOfUser.length > 1 ? nameOfUser[1] : '',
        companyName: '',
        country: profileData?.country ? profileData.country : 'India',
        streetAddress1: profileData?.address ? profileData.address : '',
        streetAddress2: '',
        city: profileData?.city ? profileData.city : '',
        state: profileData?.state ? profileData.state : 'Andhra Pradesh',
        zip: profileData?.zipCode ? profileData.zipCode : '',
        phone: profileData?.phoneNumber ? profileData.phoneNumber : '',
        email: profileData?.email ? profileData?.email : '',
        notes: '',
        otp: '',
    });

    const changeHandler = (
        uid: keyof ICheckoutForm,
        event: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setData((oldState) => ({
            ...oldState,
            [uid]: event.target.value,
        }));
    };

    const payToggleHandler = () => {
        setIsPayOnline((oldState) => !oldState);
    };

    const pinValidator = () => {
        if (pinData?.data?.pincode === data.zip) return;

        if (!REGEX.ZIP.test(data.zip)) {
            toast.warn('Please enter a valid 6 digit Pin Code');
            return;
        }

        checkServicable(data.zip)
            .then((res) => {
                if (res.status === 200) {
                    toast.success(res?.message);
                    return;
                }
                throw res?.error;
            })
            .catch((err: IError) =>
                toast.error(
                    err.response?.data?.error
                        ? err.response?.data?.error
                        : 'Unable to check this PIN Code availability!'
                )
            );
    };

    const resetOrderData = async () => {
        await queryClient.invalidateQueries(Keys.ORDERS);
    };

    const sendOtp = () => {
        const regex = checkRegex([
            {
                key: 'Phone Number',
                value: data.phone,
                regex: REGEX.PHONE,
            },
        ]);

        if (!!regex) {
            return toast.error(regex);
        }

        sendMobileOtp({
            data: {
                countryCode: '+91',
                phoneNumber: data.phone,
            },
            token: token!,
        })
            .then((res) => {
                if (res.status === 200) {
                    toast.success(res.message);
                }
            })
            .catch((err: IError) =>
                toast.error(
                    err.response?.data?.error
                        ? err.response.data.error
                        : 'Unable to send OTP right now!'
                )
            );
    };

    const verifyOtp = () => {
        const regex = checkRegex([
            {
                key: 'OTP',
                value: data.otp,
                regex: REGEX.OTP,
            },
        ]);

        if (!!regex) {
            return toast.error(regex);
        }

        verifyMobileOtp({
            data: {
                countryCode: '+91',
                phoneNumber: data.phone,
                otp: data.otp,
            },
            token: token!,
        })
            .then((res) => {
                if (res.status === 200) {
                    toast.success(res.message);
                }
            })
            .catch((err: IError) =>
                toast.error(
                    err.response?.data?.error
                        ? err.response.data.error
                        : 'Unable to verify OTP right now!'
                )
            );
    };

    const formHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const msg = checkEmpty([
            { key: 'First Name', value: data.firstName },
            { key: 'Last Name', value: data.lastName },
            { key: 'Country', value: data.country },
            { key: 'Street Address', value: data.streetAddress1 },
            { key: 'City', value: data.city },
            { key: 'State', value: data.state },
            { key: 'Postal Code', value: data.zip },
            { key: 'Phone Number', value: data.phone },
            { key: 'Email Address', value: data.email },
        ]);

        if (!!msg) {
            toast.error(msg);
            return;
        }

        if (!!data.otp === false) {
            return toast.error('Please verify your Mobile Number!');
        }

        const regex = checkRegex([
            {
                key: 'Phone Number',
                value: data.phone,
                regex: REGEX.PHONE,
            },
            {
                key: 'Email',
                value: data.email,
                regex: REGEX.EMAIL,
            },
            {
                key: 'Postal Code',
                value: data.zip,
                regex: REGEX.ZIP,
            },
            {
                key: 'OTP',
                value: data.otp,
                regex: REGEX.OTP,
            },
        ]);

        if (!!regex) {
            toast.error(regex);
            return;
        }

        if (pinData?.data?.pincode !== data.zip) {
            toast.error('Please check PIN Code availability first!');
            return;
        }

        if (!pinData?.data?.is_deliverable) {
            toast.error('Delivery not available on this pincode');
            return;
        }

        if (!sendMobileOtpData || sendMobileOtpData?.status !== 200) {
            toast.error(
                sendMobileOtpData?.error ||
                    'Please verify your mobile number first!'
            );
            return;
        }

        if (!verifyMobileOtpData || verifyMobileOtpData?.status !== 200) {
            toast.error(
                verifyMobileOtpData?.error || 'Please click on Verify OTP!'
            );
            return;
        }

        if (
            isLoading ||
            verifyLoading ||
            pinLoading ||
            sendMobileOtpLoading ||
            verifyMobileOtpLoading
        )
            return;

        const productDetails = cartItems.map((item) => ({
            size: item?.size,
            quantity: item?.quantity,
            colorId: item?.colorId,
            productId: item?._id,
        }));

        const formattedData: IOrderData = {
            payment_type: isPayOnline ? 'ONLINE' : 'COD',
            additional_info: data.notes,
            delivery_details: {
                firstName: data.firstName,
                lastName: data.lastName,
                companyName: data.companyName,
                streetAddress1: data.streetAddress1,
                streetAddress2: data.streetAddress2,
                city: data.city,
                state: data.state,
                zip: data.zip,
                country: data.country,
                phone: data.phone,
                email: data.email,
            },
            products_details: productDetails,
        };

        mutateAsync({
            data: formattedData,
            token: token!,
        })
            .then(async (res) => {
                if (res.status === 200) {
                    if (formattedData.payment_type === 'COD') {
                        resetOrderData();
                        toast.success(res?.message);
                        navigate(Screens.PROFILE, {
                            state: { isOrderActive: true },
                        });
                        return;
                    }

                    if (!checkScript(CONSTANTS.RAZORPAY_SCRIPT)) {
                        await loadScript(CONSTANTS.RAZORPAY_SCRIPT);
                    }

                    const options: IRzpOptions = {
                        order_id: res.data.order_id,
                        name: 'the zenky',
                        key: 'rzp_test_cFhbLEd61xfdx6',
                        image: Logo,
                        theme: {
                            color: '#262626',
                        },
                        handler: async (rzpData) => {
                            verifyPayment({
                                data: {
                                    orderId: rzpData.razorpay_order_id,
                                    paymentId: rzpData.razorpay_payment_id,
                                },
                                token: token!,
                            })
                                .then((res) => {
                                    if (res.status === 200) {
                                        resetOrderData();
                                        toast.success(res?.message);
                                        navigate(Screens.PROFILE, {
                                            state: { isOrderActive: true },
                                        });
                                    }
                                })
                                .catch((err: IError) =>
                                    toast.error(
                                        err.response?.data?.error
                                            ? err.response?.data?.error
                                            : 'Unable to verify payment!'
                                    )
                                );
                        },
                    };

                    const rzp = new (window as any).Razorpay(options);

                    rzp.on('payment.failed', function (res: IRzpError) {
                        toast.error(
                            res?.error?.description ||
                                'Unable to process your payment! Please try again later.'
                        );
                    });

                    rzp.open();
                }
            })
            .catch((err: IError) =>
                toast.error(
                    err.response?.data?.error
                        ? err.response?.data?.error
                        : 'Unable to place order right now!'
                )
            );
    };

    return (
        <form className='row' onSubmit={formHandler}>
            <div className='col-lg-7'>
                <div className='billing-info-wrap mr-100'>
                    <h3>Billing Details</h3>
                    <div className='row'>
                        <div className='col-lg-6 col-md-6'>
                            <div className='billing-info mb-25'>
                                <label>
                                    First name{' '}
                                    <abbr className='required' title='Required'>
                                        *
                                    </abbr>
                                </label>
                                <input
                                    type='text'
                                    value={data.firstName}
                                    onChange={changeHandler.bind(
                                        this,
                                        'firstName'
                                    )}
                                    required
                                />
                            </div>
                        </div>
                        <div className='col-lg-6 col-md-6'>
                            <div className='billing-info mb-25'>
                                <label>
                                    Last name{' '}
                                    <abbr className='required' title='Required'>
                                        *
                                    </abbr>
                                </label>
                                <input
                                    type='text'
                                    value={data.lastName}
                                    onChange={changeHandler.bind(
                                        this,
                                        'lastName'
                                    )}
                                    required
                                />
                            </div>
                        </div>

                        <div className='col-lg-12 col-md-12'>
                            <div className='billing-info mb-25 '>
                                <label>
                                    Phone{' '}
                                    <abbr className='required' title='Required'>
                                        *
                                    </abbr>
                                </label>
                                <div className='pin'>
                                    <input
                                        type='text'
                                        value={data.phone}
                                        className={sendOtpData.className}
                                        disabled={
                                            !!(
                                                sendMobileOtpData?.status ===
                                                200
                                            )
                                        }
                                        onChange={changeHandler.bind(
                                            this,
                                            'phone'
                                        )}
                                        maxLength={10}
                                        required
                                    />
                                    {sendMobileOtpData?.status ===
                                    200 ? null : (
                                        <span
                                            onClick={
                                                sendMobileOtpLoading
                                                    ? undefined
                                                    : sendOtp
                                            }
                                        >
                                            {sendMobileOtpLoading
                                                ? 'Sending'
                                                : 'Send OTP'}
                                        </span>
                                    )}
                                </div>
                                <small className={sendOtpData.className}>
                                    {sendOtpData.text}
                                </small>
                            </div>
                        </div>

                        {sendMobileOtpData?.status === 200 ? (
                            <div className='col-lg-12 col-md-12'>
                                <div className='billing-info mb-25'>
                                    <label>
                                        OTP{' '}
                                        <abbr
                                            className='required'
                                            title='Required'
                                        >
                                            *
                                        </abbr>
                                    </label>

                                    <div className='pin'>
                                        <input
                                            type='text'
                                            value={data.otp}
                                            className={
                                                verifyMobileData.className
                                            }
                                            onChange={changeHandler.bind(
                                                this,
                                                'otp'
                                            )}
                                            maxLength={6}
                                            required
                                        />
                                        {verifyMobileOtpData?.status ===
                                        200 ? null : (
                                            <span
                                                onClick={
                                                    verifyMobileOtpLoading
                                                        ? undefined
                                                        : verifyOtp
                                                }
                                            >
                                                {verifyMobileOtpLoading
                                                    ? 'Verifying'
                                                    : 'Verify OTP'}
                                            </span>
                                        )}
                                    </div>
                                    <small
                                        className={verifyMobileData.className}
                                    >
                                        {verifyMobileData.text}
                                    </small>
                                </div>
                            </div>
                        ) : null}

                        <div className='col-lg-12'>
                            <div className='billing-info mb-25'>
                                <label>Company name (optional) </label>
                                <input
                                    type='text'
                                    value={data.companyName}
                                    onChange={changeHandler.bind(
                                        this,
                                        'companyName'
                                    )}
                                />
                            </div>
                        </div>
                        <div className='col-lg-12'>
                            <div className='billing-select mb-25'>
                                <label>
                                    Country{' '}
                                    <abbr className='required' title='Required'>
                                        *
                                    </abbr>
                                </label>
                                <select
                                    className='select-active'
                                    value={data.country}
                                    onChange={changeHandler.bind(
                                        this,
                                        'country'
                                    )}
                                    required
                                >
                                    <option value='India'>India</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-lg-12'>
                            <div className='billing-info mb-25'>
                                <label>
                                    Street address{' '}
                                    <abbr className='required' title='Required'>
                                        *
                                    </abbr>
                                </label>
                                <input
                                    className='billing-address'
                                    placeholder='House number and street name'
                                    type='text'
                                    value={data.streetAddress1}
                                    onChange={changeHandler.bind(
                                        this,
                                        'streetAddress1'
                                    )}
                                    required
                                />
                                <input
                                    placeholder='Apartment, suite, unit etc. (optional)'
                                    type='text'
                                    value={data.streetAddress2}
                                    onChange={changeHandler.bind(
                                        this,
                                        'streetAddress2'
                                    )}
                                />
                            </div>
                        </div>
                        <div className='col-lg-12'>
                            <div className='billing-info mb-25'>
                                <label>
                                    Town / City{' '}
                                    <abbr className='required' title='Required'>
                                        *
                                    </abbr>
                                </label>
                                <input
                                    type='text'
                                    value={data.city}
                                    onChange={changeHandler.bind(this, 'city')}
                                    required
                                />
                            </div>
                        </div>
                        <div className='col-lg-12'>
                            <div className='billing-select mb-25'>
                                <label>
                                    State{' '}
                                    <abbr className='required' title='Required'>
                                        *
                                    </abbr>
                                </label>
                                <select
                                    className='select-active'
                                    value={data.state}
                                    onChange={changeHandler.bind(this, 'state')}
                                    required
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
                                    <option value='Gujarat'>Gujarat</option>
                                    <option value='Haryana'>Haryana</option>
                                    <option value='Himachal Pradesh'>
                                        Himachal Pradesh
                                    </option>
                                    <option value='Jammu and Kashmir'>
                                        Jammu and Kashmir
                                    </option>
                                    <option value='Jharkhand'>Jharkhand</option>
                                    <option value='Karnataka'>Karnataka</option>
                                    <option value='Kerala'>Kerala</option>
                                    <option value='Madhya Pradesh'>
                                        Madhya Pradesh
                                    </option>
                                    <option value='Maharashtra'>
                                        Maharashtra
                                    </option>
                                    <option value='Manipur'>Manipur</option>
                                    <option value='Meghalaya'>Meghalaya</option>
                                    <option value='Mizoram'>Mizoram</option>
                                    <option value='Nagaland'>Nagaland</option>
                                    <option value='Odisha'>Odisha</option>
                                    <option value='Punjab'>Punjab</option>
                                    <option value='Rajasthan'>Rajasthan</option>
                                    <option value='Sikkim'>Sikkim</option>
                                    <option value='Tamil Nadu'>
                                        Tamil Nadu
                                    </option>
                                    <option value='Telangana'>Telangana</option>
                                    <option value='Tripura'>Tripura</option>
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
                        <div className='col-lg-12 col-md-12'>
                            <div className='billing-info mb-25 '>
                                <label>
                                    Postcode / ZIP{' '}
                                    <abbr className='required' title='Required'>
                                        *
                                    </abbr>
                                </label>
                                <div className='pin'>
                                    <input
                                        type='text'
                                        value={data.zip}
                                        className={pinHelperData.className}
                                        onChange={changeHandler.bind(
                                            this,
                                            'zip'
                                        )}
                                        required
                                    />
                                    <span
                                        onClick={
                                            pinLoading
                                                ? undefined
                                                : pinValidator
                                        }
                                    >
                                        {pinLoading ? 'Checking' : 'Check'}
                                    </span>
                                </div>
                                <small className={pinHelperData.className}>
                                    {pinHelperData.text}
                                </small>
                            </div>
                        </div>
                        <div className='col-lg-12 col-md-12'>
                            <div className='billing-info mb-25'>
                                <label>
                                    Email Address{' '}
                                    <abbr className='required' title='Required'>
                                        *
                                    </abbr>
                                </label>
                                <input
                                    type='text'
                                    value={data.email}
                                    onChange={changeHandler.bind(this, 'email')}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className='additional-info-wrap'>
                        <h3>Additional information</h3>
                        <label>Order notes (optional)</label>
                        <textarea
                            placeholder='Notes about your order, e.g. special notes for delivery. '
                            name='message'
                            value={data.notes}
                            onChange={changeHandler.bind(this, 'notes')}
                        />
                    </div>
                </div>
            </div>

            <div className='col-lg-5'>
                <div className='your-order-area'>
                    <h3>Your order</h3>
                    <div className='your-order-wrap gray-bg-4'>
                        <div className='your-order-info-wrap'>
                            <div className='your-order-info'>
                                <ul>
                                    <li>
                                        Product <span>Total</span>
                                    </li>
                                </ul>
                            </div>
                            <div className='your-order-middle'>
                                <ul>
                                    {cartItems?.map((item) => (
                                        <li
                                            key={`checkout_item_${item?._id}_${item?.colorName}_${item?.size}`}
                                        >
                                            {item?.name} X {item?.quantity}{' '}
                                            <span>₹{item?.totalPrice} </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='your-order-info order-subtotal'>
                                <ul>
                                    <li>
                                        Subtotal <span>₹{subTotal}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className='your-order-info order-total'>
                                <ul>
                                    <li>
                                        Total <span>₹{subTotal}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {false && (
                            <div
                                className={`payment-method ${
                                    isPayOnline ? 'active' : ''
                                }`}
                            >
                                <div className='d-flex align-items-center'>
                                    <input
                                        type='radio'
                                        name='payment'
                                        id='online'
                                        checked={isPayOnline}
                                        onChange={payToggleHandler}
                                    />
                                    <label htmlFor='online'>
                                        Online Payment
                                    </label>
                                </div>
                                <p>
                                    You will be redirected to Razorpay payment
                                    gateway for safe and secure payment. After
                                    payment is successful, your order will be
                                    confirmed.
                                </p>
                            </div>
                        )}
                        <div
                            className={`payment-method ${
                                !isPayOnline ? 'active' : ''
                            }`}
                        >
                            <div className='d-flex align-items-center'>
                                <input
                                    type='radio'
                                    name='payment'
                                    id='cod'
                                    checked={!isPayOnline}
                                    onChange={payToggleHandler}
                                />
                                <label htmlFor='cod'>Cash On Delivery</label>
                            </div>
                        </div>
                        <div className='condition-wrap'>
                            <p>
                                Your personal data will be used to process your
                                order, support your experience throughout this
                                website, and for other purposes described in our{' '}
                                <a href='#'>privacy policy</a>
                            </p>
                            <div className='condition-form mb-25'>
                                <input type='checkbox' required />
                                <span>
                                    I have read and agree to the website{' '}
                                    <a href='#'>terms and conditions</a>
                                    <span className='star'>*</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='Place-order mt-30'>
                        <button type='submit'>
                            {isLoading || verifyLoading ? (
                                <div className='loading-spinner'></div>
                            ) : (
                                'Place Order'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CheckoutForm;
