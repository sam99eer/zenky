import AboutUs from '/assets/images/about-us.jpg';

const About = () => {
    return (
        <div className='about-us-area section-padding-1 pt-100 pb-95'>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-6 col-md-6 col-sm-6'>
                        <div className='about-us-img2'>
                            <img src={AboutUs} alt='About Us' />
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-6'>
                        <div className='about-us-content-2'>
                            <h2>
                                THE ZENKY <br />
                                Live with Style
                            </h2>
                            <p>
                                Zenky specializes in offering a wide range of
                                trendy and high-quality t-shirts for all ages
                                and genders. With a user-friendly interface and
                                secure payment options, customers can
                                effortlessly browse and purchase their favorite
                                designs, making it the ultimate destination for
                                t-shirt enthusiasts. We believe in 100% customer
                                satisfaction.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
