const ContactForm = () => {
    return (
        <div className='col-xl-9 col-lg-8 col-md-7'>
            <div className='contact-form-area'>
                <h2>Get a quote</h2>
                <form
                    id='contact-form'
                    action='assets/mail-php/mail.php'
                    method='post'
                >
                    <div className='row'>
                        <div className='col-lg-12 col-md-12 col-12'>
                            <input
                                name='first_name'
                                type='text'
                                placeholder='Your Name... *'
                            />
                        </div>
                        <div className='col-lg-6 col-md-12 col-12'>
                            <input
                                name='email_address'
                                type='email'
                                placeholder='Your Email... *'
                            />
                        </div>
                        <div className='col-lg-6 col-md-12 col-12'>
                            <input
                                name='phone'
                                type='text'
                                placeholder='Enter your phone...'
                            />
                        </div>
                        <div className='col-lg-12 col-md-12 col-12'>
                            <textarea
                                name='message'
                                placeholder='Your Message'
                            ></textarea>
                        </div>
                        <div className='col-lg-12 col-md-12 col-12'>
                            <button className='submit' type='submit'>
                                Send
                            </button>
                        </div>
                    </div>
                </form>
                <p className='form-messege'></p>
            </div>
        </div>
    );
};

export default ContactForm;
