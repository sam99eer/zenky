import Slider from 'react-slick';
import { revolutionSliderSettings } from 'src/utils/SliderSettings';
import imgSlide1 from '/img1.png';
import imgSlide2 from '/img2.png';

const HeroSlider = () => {
    return (
        <Slider {...revolutionSliderSettings} className='rev-slider'>
            <div className='rev-slider-content'>
                <img src={imgSlide1} alt='' className='img-fluid' />
                <div className='description'>
                    <div>Loose - Fitting Dress</div>
                </div>
            </div>
            <div className='rev-slider-content'>
                <img src={imgSlide2} alt='' className='img-fluid' />
                <div className='description'>
                    <div>Loose - Fitting Dress</div>
                </div>
            </div>
        </Slider>
    );
};

export default HeroSlider;
