import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { toast } from 'react-toastify';
import { IProductDetails } from 'src/models/api/GetProductsModel';
import { IProductSlider } from 'src/models/screens/ProductDetails';
import { IStoreModel } from 'src/store';
import { cartSliceActions } from 'src/store/Actions';
import {
    settingsBigImgSlider,
    settingsSmallImgSlider,
} from 'src/utils/SliderSettings';
import NoImage from '/assets/images/no-image.jpg';

const ProductSection = (props: {
    isLoading: boolean;
    data: IProductDetails | undefined;
}) => {
    const [data, setData] = useState<IProductSlider>({
        leftSlider: null,
        rightSlider: null,
    });

    const cartItems = useSelector(
        (state: IStoreModel) => state.cartReducer.cartItem
    );

    const leftSliderRef = useRef<Slider>(null);
    const rightSliderRef = useRef<Slider>(null);
    const dispatch = useDispatch();

    const itemData = cartItems.find((item) => item?._id === props?.data?._id);

    const inStock = !!props?.data?.isAvaliable;

    const cartHandler = (
        action: 'add' | 'remove',
        shouldShowPopup: boolean
    ) => {
        if (!inStock) {
            toast.warn('Out of Stock! Cannot be added to Cart.');
            return;
        }

        if (action === 'add') {
            dispatch(
                cartSliceActions.addItem({
                    data: {
                        _id: props.data!._id,
                        image: props?.data!.image,
                        name: props?.data!.name,
                        price: props?.data!.price,
                    },
                })
            );
            if (!!shouldShowPopup) {
                toast.success('Added to cart');
            }
            return;
        }

        if (action === 'remove') {
            dispatch(cartSliceActions.removeItem({ _id: props?.data!._id }));
            return;
        }
    };

    useEffect(() => {
        setData({
            leftSlider: leftSliderRef.current,
            rightSlider: rightSliderRef.current,
        });
    }, []);

    return (
        <div className='product-details-area pb-90'>
            <div className='custom-container-6'>
                <div className='row'>
                    {props?.isLoading ? (
                        <div className='skeleton-smj1yzhwf72'></div>
                    ) : (
                        <>
                            <div className='col-pro-60'>
                                <div className='product-details-tab'>
                                    <Slider
                                        asNavFor={data.rightSlider!}
                                        ref={leftSliderRef}
                                        {...settingsBigImgSlider}
                                        className='product-dec-right pro-dec-big-img-slider'
                                    >
                                        <div className='easyzoom-style'>
                                            <div className='easyzoom easyzoom--overlay'>
                                                <img src={NoImage} alt='' />
                                            </div>
                                        </div>
                                        <div className='easyzoom-style'>
                                            <div className='easyzoom easyzoom--overlay'>
                                                <img src={NoImage} alt='' />
                                            </div>
                                        </div>
                                        <div className='easyzoom-style'>
                                            <div className='easyzoom easyzoom--overlay'>
                                                <img src={NoImage} alt='' />
                                            </div>
                                        </div>
                                        <div className='easyzoom-style'>
                                            <div className='easyzoom easyzoom--overlay'>
                                                <img src={NoImage} alt='' />
                                            </div>
                                        </div>
                                        <div className='easyzoom-style'>
                                            <div className='easyzoom easyzoom--overlay'>
                                                <img src={NoImage} alt='' />
                                            </div>
                                        </div>
                                    </Slider>
                                    <Slider
                                        asNavFor={data.leftSlider!}
                                        ref={rightSliderRef}
                                        {...settingsSmallImgSlider}
                                        className='product-dec-slider product-dec-left'
                                    >
                                        <div className='product-dec-small'>
                                            <img src={NoImage} alt='' />
                                        </div>
                                        <div className='product-dec-small'>
                                            <img src={NoImage} alt='' />
                                        </div>
                                        <div className='product-dec-small'>
                                            <img src={NoImage} alt='' />
                                        </div>
                                        <div className='product-dec-small'>
                                            <img src={NoImage} alt='' />
                                        </div>
                                        <div className='product-dec-small'>
                                            <img src={NoImage} alt='' />
                                        </div>
                                    </Slider>
                                </div>
                            </div>
                            <div className='col-pro-40'>
                                <div className='pl-35 product-details-content quickview-content'>
                                    <h2>{props?.data?.name}</h2>
                                    <div className='quickview-ratting-review'>
                                        <div className='quickview-ratting-wrap'>
                                            <div className='quickview-ratting'>
                                                {Array.from(
                                                    new Array(5),
                                                    (_, index) => {
                                                        if (
                                                            index <
                                                            (props?.data
                                                                ?.rating ?? 0)
                                                        ) {
                                                            return (
                                                                <i
                                                                    key={`${props?.data?._id}_filled_star_${index}`}
                                                                    className='yellow fa fa-star'
                                                                ></i>
                                                            );
                                                        }
                                                        return (
                                                            <i
                                                                key={`${props?.data?._id}_unfilled_star_${index}`}
                                                                className='fa fa-star'
                                                            ></i>
                                                        );
                                                    }
                                                )}
                                            </div>
                                            <a href='#'>
                                                {' '}
                                                (
                                                {props?.data?.reviews?.length ??
                                                    0}{' '}
                                                customer review)
                                            </a>
                                        </div>
                                        <div className='quickview-stock'>
                                            {inStock ? (
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
                                    <h3>₹{props?.data?.price}</h3>
                                    <div className='quickview-peragraph'>
                                        <p>{props?.data?.description}</p>
                                    </div>
                                    <div className='configurable-wrap'>
                                        <div className='configurable-color'>
                                            <span>Color</span>
                                            <ul>
                                                <li>
                                                    <a href='#'>
                                                        <span
                                                            title='Blue'
                                                            className='swatch-anchor blue'
                                                        >
                                                            Blue
                                                        </span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='#'>
                                                        <span
                                                            title='Brown'
                                                            className='swatch-anchor brown'
                                                        >
                                                            Brown
                                                        </span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='#'>
                                                        <span
                                                            title='Green'
                                                            className='swatch-anchor green'
                                                        >
                                                            Green
                                                        </span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className='configurable-size'>
                                            <span>Size</span>
                                            <ul>
                                                <li>
                                                    <a href='#'>
                                                        <span
                                                            title='L'
                                                            className='swatch-anchor l'
                                                        >
                                                            L
                                                        </span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='#'>
                                                        <span
                                                            title='M'
                                                            className='swatch-anchor m'
                                                        >
                                                            M
                                                        </span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='#'>
                                                        <span
                                                            title='S'
                                                            className='swatch-anchor s'
                                                        >
                                                            S
                                                        </span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href='#'>
                                                        <span
                                                            title='XL'
                                                            className='swatch-anchor xl'
                                                        >
                                                            XL
                                                        </span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='quickview-action-wrap configurable-mrg-dec'>
                                        <div className='quickview-quality'>
                                            {inStock ? (
                                                <div className='cart-plus-minus d-flex justify-content-center align-items-center'>
                                                    <div
                                                        className='dec qtybutton'
                                                        onClick={cartHandler.bind(
                                                            this,
                                                            'remove',
                                                            false
                                                        )}
                                                    >
                                                        -
                                                    </div>
                                                    <span>
                                                        {itemData?.quantity ??
                                                            0}
                                                    </span>
                                                    <div
                                                        className='inc qtybutton'
                                                        onClick={cartHandler.bind(
                                                            this,
                                                            'add',
                                                            false
                                                        )}
                                                    >
                                                        +
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className='quickview-cart'>
                                            <a
                                                title={
                                                    inStock
                                                        ? 'Add to cart'
                                                        : 'Out of Stock'
                                                }
                                                onClick={
                                                    inStock
                                                        ? cartHandler.bind(
                                                              this,
                                                              'add',
                                                              true
                                                          )
                                                        : undefined
                                                }
                                            >
                                                {inStock
                                                    ? 'Add to cart'
                                                    : 'Out of Stock'}
                                            </a>
                                        </div>
                                        <div className='quickview-wishlist'>
                                            <a title='Add to wishlist' href='#'>
                                                <i className=' ti-heart '></i>
                                            </a>
                                        </div>
                                        <div className='quickview-compare'>
                                            <a title='Add to compare' href='#'>
                                                <i className='ti-bar-chart-alt'></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className='quickview-meta'>
                                        <span>
                                            SKU: <span>REF. LA-103</span>
                                        </span>
                                        <span>
                                            Categories: <a href='#'>Fashions</a>
                                            , <a href='#'>Main 03</a>
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
                                                <a className='twitter' href='#'>
                                                    <i className='fa fa-twitter'></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a className='youtube' href='#'>
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
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductSection;
