import { Settings } from 'react-slick';
import SlickButton from 'src/components/common/SlickButton';

export const settingsBigImgSlider: Settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    draggable: false,
    fade: false,
};

export const settingsSmallImgSlider: Settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    vertical: true,
    dots: false,
    focusOnSelect: true,
    draggable: true,
    fade: false,
    prevArrow: (
        <SlickButton customClass='pro-dec-icon pro-dec-prev'>
            <i className='fa fa-angle-up'></i>
        </SlickButton>
    ),
    nextArrow: (
        <SlickButton customClass='pro-dec-icon pro-dec-next'>
            <i className='fa fa-angle-down'></i>
        </SlickButton>
    ),
    responsive: [
        {
            breakpoint: 767,
            settings: {},
        },
        {
            breakpoint: 420,
            settings: {
                autoplay: true,
                slidesToShow: 2,
            },
        },
    ],
};
