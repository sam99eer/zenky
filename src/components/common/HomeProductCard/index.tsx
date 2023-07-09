import { createPortal } from 'react-dom';
import Slider from 'react-slick';
import { IGetProductItem } from 'src/models/api/GetProductsModel';
import { CONSTANTS } from 'src/utils/Constants';
import NoImage from '/assets/images/no-image.jpg';

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    prevArrow: <i className='ti-arrow-left' />,
    nextArrow: <i className='ti-arrow-right' />,
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

const HomeProductCard = (props: { data: IGetProductItem }) => {
    return (
        <>
            {createPortal(
                <div
                    className='modal fade'
                    id={`productModal_${props?.data?._id}`}
                    tabIndex={-1}
                    role='dialog'
                >
                    <div className='modal-dialog' role='document'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <button
                                    type='button'
                                    className='close'
                                    data-bs-dismiss='modal'
                                    aria-label='Close'
                                >
                                    <span
                                        className='ti-close'
                                        aria-hidden='true'
                                    ></span>
                                </button>
                            </div>
                            <div className='modal-body'>
                                <div className='row g-0'>
                                    <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12'>
                                        <div className='quickview-slider-active owl-carousel'>
                                            <Slider
                                                className='quickview-slider-active owl-carousel'
                                                {...settings}
                                            >
                                                <img
                                                    src={
                                                        props?.data?.image
                                                            ? `${CONSTANTS.HOST}${CONSTANTS.IMG_PATH}${props?.data?.image}`
                                                            : NoImage
                                                    }
                                                    alt='Cover Photo'
                                                />
                                                <img
                                                    src={
                                                        props?.data?.image
                                                            ? `${CONSTANTS.HOST}${CONSTANTS.IMG_PATH}${props?.data?.image}`
                                                            : NoImage
                                                    }
                                                    alt='Cover Photo'
                                                />
                                            </Slider>
                                        </div>
                                    </div>
                                    <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12'>
                                        <div className='quickview-content'>
                                            <h2>{props?.data?.name}</h2>
                                            <div className='quickview-ratting-review'>
                                                <div className='quickview-ratting-wrap'>
                                                    <div className='quickview-ratting'>
                                                        <i className='yellow fa fa-star'></i>
                                                        <i className='yellow fa fa-star'></i>
                                                        <i className='yellow fa fa-star'></i>
                                                        <i className='yellow fa fa-star'></i>
                                                        <i className='fa fa-star'></i>
                                                    </div>
                                                    <a href='#'>
                                                        {' '}
                                                        (1 customer review)
                                                    </a>
                                                </div>
                                                <div className='quickview-stock'>
                                                    {props?.data
                                                        ?.isAvaliable ? (
                                                        <span>
                                                            <i className='fa fa-check-circle-o'></i>{' '}
                                                            in stock
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            <i className='fa fa-times'></i>{' '}
                                                            out of stock
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <h3>
                                                ₹
                                                {props?.data?.price?.toFixed(2)}
                                            </h3>
                                            <div className='quickview-peragraph'>
                                                <p>
                                                    {props?.data?.description}
                                                </p>
                                            </div>
                                            <div className='quickview-action-wrap'>
                                                <div className='quickview-quality'>
                                                    <div className='cart-plus-minus'>
                                                        <div className='dec qtybutton'>
                                                            -
                                                        </div>
                                                        <input
                                                            className='cart-plus-minus-box'
                                                            type='text'
                                                            name='qtybutton'
                                                            value='2'
                                                        />
                                                        <div className='inc qtybutton'>
                                                            +
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='quickview-cart'>
                                                    <a
                                                        title='Add to cart'
                                                        href='#'
                                                    >
                                                        Add to cart
                                                    </a>
                                                </div>
                                                <div className='quickview-wishlist'>
                                                    <a
                                                        title='Add to wishlist'
                                                        href='#'
                                                    >
                                                        <i className=' ti-heart '></i>
                                                    </a>
                                                </div>
                                                <div className='quickview-compare'>
                                                    <a
                                                        title='Add to compare'
                                                        href='#'
                                                    >
                                                        <i className='ti-bar-chart-alt'></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className='quickview-meta'>
                                                <span>
                                                    SKU:{' '}
                                                    <span>REF. LA-103</span>
                                                </span>
                                                <span>
                                                    Categories:{' '}
                                                    <a href='#'>Fashions</a>,{' '}
                                                    <a href='#'>Main 03</a>
                                                </span>
                                                <span>
                                                    Tags: <a href='#'>Coat</a>,{' '}
                                                    <a href='#'>Dresses</a>,{' '}
                                                    <a href='#'>Fashion</a>
                                                </span>
                                            </div>
                                            <div className='default-social'>
                                                <ul>
                                                    <li>
                                                        <a
                                                            className='facebook'
                                                            href='#'
                                                        >
                                                            <i className='fa fa-facebook'></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className='twitter'
                                                            href='#'
                                                        >
                                                            <i className='fa fa-twitter'></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className='youtube'
                                                            href='#'
                                                        >
                                                            <i className='fa fa-pinterest-p'></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className='dribbble'
                                                            href='#'
                                                        >
                                                            <i className='fa fa-google-plus'></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
                document.getElementById('modal')!
            )}
            <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6'>
                <div className='product-wrap mb-50'>
                    <div className='product-img default-overlay mb-20'>
                        <a href='product-details.html'>
                            <img
                                className='default-img'
                                src={
                                    props?.data?.image
                                        ? `${CONSTANTS.HOST}${CONSTANTS.IMG_PATH}${props?.data?.image}`
                                        : NoImage
                                }
                                alt='Cover'
                            />
                            {!!props?.data?.colors?.[0]?.image1 ? (
                                <img
                                    className='hover-img'
                                    src={`${CONSTANTS.HOST}${CONSTANTS.IMG_PATH}${props?.data?.colors?.[0]?.image1}`}
                                    alt='Secondary'
                                />
                            ) : null}
                        </a>
                        <div className='product-action'>
                            <a
                                data-bs-toggle='modal'
                                data-bs-target={`#productModal_${props?.data?._id}`}
                                title='Quick View'
                                href='#'
                            >
                                <i className=' ti-zoom-in'></i>
                                <span>Quick Shop</span>
                            </a>
                            <a title='Wishlist' href='#'>
                                <i className=' ti-heart '></i>
                                <span>Add to Wishlist</span>
                            </a>
                        </div>
                        <div className='product-action-2'>
                            <a title='Buy on Themeforest' href='#'>
                                Add to cart
                            </a>
                        </div>
                    </div>
                    <div className='product-content'>
                        <h3>
                            <a href='product-details.html'>
                                {props?.data?.name}
                            </a>
                        </h3>
                        <div className='product-price'>
                            <span>₹{props?.data?.price}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeProductCard;
