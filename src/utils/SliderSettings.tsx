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
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    vertical: true,
    dots: false,
    focusOnSelect: true,
    draggable: false,
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

export const quickviewSliderSettings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    prevArrow: (
        <SlickButton customClass='owl-prev quickview-arrow'>
            <i className='ti-arrow-left'></i>
        </SlickButton>
    ),
    nextArrow: (
        <SlickButton customClass='owl-next quickview-arrow'>
            <i className='ti-arrow-right'></i>
        </SlickButton>
    ),
    responsive: [
        {
            breakpoint: 992,
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
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 0,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};
