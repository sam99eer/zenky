import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { REGEX } from 'src/utils/Constants';
import OrderTrackImg from '/assets/images/order-track.png';

const OrderTrackData = () => {
    const [trackNumber, setTrackNumber] = useState('');

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTrackNumber(event.target.value);
    };

    const formHandler = (event: FormEvent) => {
        event.preventDefault();

        if (!REGEX.TRACK_NUMBER.test(trackNumber)) {
            toast.error('Please enter valid AWB number');
            return;
        }

        const url = `https://shiprocket.co/tracking/${trackNumber}`;
        window.open(url, '_blank');
    };

    return (
        <div className='order-tracking-area'>
            <div className='container-fluid p-0'>
                <div className='order-tracking-img'>
                    <img
                        src={OrderTrackImg}
                        alt='Track'
                        className='img-fluid'
                    />
                </div>
                <div className='row g-0'>
                    <div className='col-lg-6 col-md-6 ms-auto'>
                        <div className='order-tracking-content'>
                            <p>
                                To track your order please enter the AWB number
                                of the order in the box below and press the
                                "Track" button. This was given to you on your
                                receipt and in the confirmation email you should
                                have received. You can also check this under my
                                orders details.
                            </p>
                            <div className='order-tracking-form'>
                                <form onSubmit={formHandler}>
                                    <div className='sin-order-tracking'>
                                        <label>AWB Number</label>
                                        <input
                                            type='text'
                                            placeholder='Tracking Number of Order'
                                            value={trackNumber}
                                            onChange={changeHandler}
                                            maxLength={12}
                                        />
                                    </div>
                                    <div className='order-track-btn'>
                                        <button type='submit'>Track</button>
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

export default OrderTrackData;
