import ContactForm from 'src/components/pages/Contact/ContactForm';
import RightContact from 'src/components/pages/Contact/RightContact';

const ContactData = () => {
    return (
        <div className='contact-us-area pt-90 pb-90'>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-10 ms-auto me-auto'>
                        <div className='row'>
                            <ContactForm />
                            <RightContact />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactData;
