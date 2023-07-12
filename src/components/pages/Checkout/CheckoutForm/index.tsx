import { ChangeEvent, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ICheckoutForm } from 'src/models/screens/Checkout';
import { IStoreModel } from 'src/store';
import { REGEX } from 'src/utils/Constants';
import { checkEmpty, checkRegex } from 'src/utils/Helpers';

const CheckoutForm = () => {
    const cartItems = useSelector(
        (state: IStoreModel) => state.cartReducer.cartItem
    );

    const subTotal = useMemo(
        () =>
            cartItems.length > 0
                ? cartItems.reduce((acc, curVal) => acc + curVal?.totalPrice, 0)
                : 0,
        [cartItems]
    );

    const [data, setData] = useState<ICheckoutForm>({
        firstName: '',
        lastName: '',
        companyName: '',
        country: 'India',
        streetAddress1: '',
        streetAddress2: '',
        city: '',
        state: 'Andhra Pradesh',
        zip: '',
        phone: '',
        email: '',
        notes: '',
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
        ]);

        if (!!regex) {
            toast.error(regex);
            return;
        }

        toast.success('Checkout Soon');
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
                            <div className='billing-info mb-25'>
                                <label>
                                    Postcode / ZIP{' '}
                                    <abbr className='required' title='Required'>
                                        *
                                    </abbr>
                                </label>
                                <input
                                    type='text'
                                    value={data.zip}
                                    onChange={changeHandler.bind(this, 'zip')}
                                    required
                                />
                            </div>
                        </div>
                        <div className='col-lg-12 col-md-12'>
                            <div className='billing-info mb-25'>
                                <label>
                                    Phone{' '}
                                    <abbr className='required' title='Required'>
                                        *
                                    </abbr>
                                </label>
                                <input
                                    type='text'
                                    value={data.phone}
                                    onChange={changeHandler.bind(this, 'phone')}
                                    required
                                />
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
                                        <li key={`checkout_item_${item?._id}`}>
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
                        <div className='payment-method'>
                            <h5>Direct Bank Transfer</h5>
                            <p>
                                Make your payment directly into our bank
                                account. Please use your Order ID as the payment
                                reference. Your order will not be shipped until
                                the funds have cleared in our account.
                            </p>
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
                        <button type='submit'>Place Order</button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CheckoutForm;