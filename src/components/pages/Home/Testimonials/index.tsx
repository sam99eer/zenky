import Slider from 'react-slick';
import Avatar1 from '/assets/images/avatar-1.png';
import Avatar2 from '/assets/images/avatar-2.png';

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
        {
            breakpoint: 0,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

const Testimonials = () => {
    return (
        <div className='testimonial-area bg-gray-2 pt-80 pb-100'>
            <div className='container'>
                <div className='testimonial-active owl-carousel'>
                    <Slider {...settings}>
                        <div className='single-testimonial text-center'>
                            <p>
                                “I can't say enough good things about the zenky.
                                Their trendy and unique t-shirt designs never
                                fail to impress me and draw compliments wherever
                                I go. The customer service is top-notch,
                                ensuring a delightful shopping experience every
                                time. This is definitely my go-to destination
                                for stylish t-shirts!”
                            </p>
                            <img src={Avatar1} alt='Avatar' />
                            <span>Karan - Designer</span>
                        </div>
                        <div className='single-testimonial text-center'>
                            <p>
                                “I am absolutely thrilled with my experience at
                                the zenky. The quality of their t-shirts is
                                exceptional, and their extensive collection
                                offers something for everyone. The seamless
                                ordering process and prompt delivery have made
                                me a loyal customer. Highly recommend!”
                            </p>
                            <img src={Avatar2} alt='Avatar' />
                            <span>Shubham - Customer</span>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
