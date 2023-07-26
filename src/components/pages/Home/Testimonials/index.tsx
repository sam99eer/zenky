import Slider from 'react-slick';
import { TESTIMONIAL_DATA } from 'src/data/Testimonials';

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
                        {TESTIMONIAL_DATA.map((item, index) => (
                            <div
                                key={`testimonial_${index}`}
                                className='single-testimonial text-center'
                            >
                                <p>“{item.review}”</p>
                                <img src={item.image} alt='Avatar' />
                                <span>
                                    {item.username} - {item.designation}
                                </span>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
