const RightContact = () => {
    return (
        <div className='col-xl-3 col-lg-4 col-md-5'>
            <div className='contact-info-area'>
                <h2>Get Info</h2>
                <div className='contact-info-top'>
                    <div className='sin-contact-info-wrap mb-25'>
                        <div className='contact-address'>
                            <i className='ti-home'></i>
                            <span>Payna Headquarter</span>
                        </div>
                        <p>
                            PO Box 16122 Collins Street West Victoria 8007
                            Australia
                        </p>
                    </div>
                    <div className='sin-contact-info-wrap'>
                        <div className='contact-address'>
                            <i className='ti-home'></i>
                            <span>Payna California</span>
                        </div>
                        <p>8131 Budd Rd Terre Haute, IN 47805</p>
                    </div>
                </div>
                <div className='contact-info-bottom'>
                    <ul>
                        <li>
                            <i className=' ti-email '></i>
                            info@la-studioweb.com
                        </li>
                        <li>
                            <i className='ti-mobile'></i>
                            +812-466-7130
                        </li>
                    </ul>
                    <div className='contact-info-social'>
                        <a href='#'>
                            <i className='fa fa-facebook'></i>
                        </a>
                        <a href='#'>
                            <i className='fa fa-twitter'></i>
                        </a>
                        <a href='#'>
                            <i className='fa fa-google-plus'></i>
                        </a>
                        <a href='#'>
                            <i className='fa fa-whatsapp'></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightContact;
