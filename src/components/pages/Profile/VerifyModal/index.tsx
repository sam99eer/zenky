import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'react-toastify';
import { IOtpForm } from 'src/models/screens/Profile';
import styles from 'src/styles/VerifyModal.module.css';
import { REGEX } from 'src/utils/Constants';

const VerifyModal = ({ onSave, onClose }: IOtpForm) => {
    const [otp, setOtp] = useState('');

    const clickHandler = (event: MouseEvent) => {
        event.stopPropagation();
    };

    const otpHandler = ({
        target: { value },
    }: ChangeEvent<HTMLInputElement>) => {
        setOtp(value);
    };

    const formHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!REGEX.OTP.test(otp)) return toast.warn('Please enter valid OTP!');
        onSave(otp);
    };

    return createPortal(
        <div className={styles.container} onClick={onClose}>
            <div className={styles.content} onClick={clickHandler}>
                <div>
                    <h4>Enter OTP</h4>
                    <button type='button' className='btn-close' />
                </div>
                <form className={styles.form} onSubmit={formHandler}>
                    <input
                        type='text'
                        name='otp'
                        value={otp}
                        maxLength={6}
                        placeholder='One Time Password'
                        onChange={otpHandler}
                    />
                    <button type='submit' className='btn btn-outline-dark'>
                        Verify
                    </button>
                </form>
            </div>
        </div>,
        document.getElementById('modal')!
    );
};

export default VerifyModal;
