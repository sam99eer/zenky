import {
    faFacebookF,
    faInstagram,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faStar, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { toast } from 'react-toastify';
import SizeChip from 'src/components/common/SizeChip';
import ProductWishlist from 'src/components/pages/ProductDetails/ProductWishlist';
import { Color, IProductDetails } from 'src/models/api/GetProductsModel';
import { IColorImage } from 'src/models/data/ColorImageModel';
import {
    IProductData,
    IProductSlider,
} from 'src/models/screens/ProductDetails';
import { IStoreModel } from 'src/store';
import { cartSliceActions } from 'src/store/Actions';
import { calculateDiscount, formatServerImagePath } from 'src/utils/Helpers';
import { Screens } from 'src/utils/Screens';
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

    const [productData, setProductData] = useState<IProductData>({
        colorId: null,
        size: null,
        colorName: null,
    });

    const cartItems = useSelector(
        (state: IStoreModel) => state.cartReducer.cartItem
    );

    const leftSliderRef = useRef<Slider>(null);
    const rightSliderRef = useRef<Slider>(null);
    const dispatch = useDispatch();

    const itemData = cartItems.find(
        (item) =>
            item?._id === props?.data?._id &&
            item?.colorName === productData?.colorName &&
            item?.size === productData?.size
    );

    const inStock = !!props?.data?.isAvaliable;

    const imageData = useMemo(() => {
        const images: IColorImage[] = !!props?.data
            ? props?.data?.colors?.flatMap((item) => {
                  const subImages: IColorImage[] = [];
                  if (item?.image1) {
                      subImages.push({
                          colorId: item?._id,
                          id: item?.color_code + '1',
                          imageUrl: formatServerImagePath(item?.image1),
                          colorName: item?.name,
                      });
                  }
                  if (item?.image2) {
                      subImages.push({
                          colorId: item?._id,
                          id: item?.color_code + '2',
                          imageUrl: formatServerImagePath(item?.image2),
                          colorName: item?.name,
                      });
                  }
                  if (item?.image3) {
                      subImages.push({
                          colorId: item?._id,
                          id: item?.color_code + '3',
                          imageUrl: formatServerImagePath(item?.image3),
                          colorName: item?.name,
                      });
                  }
                  return subImages;
              })
            : [];
        images.unshift({
            colorId: 'cover',
            id: 'cover',
            colorName: 'cover',
            imageUrl: props?.data?.image
                ? formatServerImagePath(props?.data?.image)
                : NoImage,
        });
        return images;
    }, [props.data]);

    const cartHandler = (
        action: 'add' | 'remove',
        shouldShowPopup: boolean
    ) => {
        if (!inStock) {
            toast.warn('Out of Stock! Cannot be added to Cart.');
            return;
        }

        if (action === 'add') {
            if (
                productData?.colorName &&
                productData?.size &&
                productData?.colorId
            ) {
                dispatch(
                    cartSliceActions.addItem({
                        data: {
                            _id: props.data!._id,
                            image: props?.data!.image,
                            name: props?.data!.name,
                            price: props?.data!.price,
                            discount: props?.data?.discount,
                            colorName: productData?.colorName,
                            size: productData?.size,
                            colorId: productData?.colorId,
                        },
                    })
                );
                if (!!shouldShowPopup) {
                    toast.success('Added to cart');
                }
                return;
            }
            toast.warn('Please select Color and Size');
            return;
        }

        if (action === 'remove') {
            if (productData?.colorId && productData?.size) {
                dispatch(
                    cartSliceActions.removeItem({
                        _id: props?.data!._id,
                        colorId: productData?.colorId,
                        size: productData?.size,
                    })
                );
                return;
            }
        }
    };

    const colorHandler = (item: Color) => {
        const findIndex = imageData?.findIndex(
            (subData) => subData?.colorId === item._id
        );

        if (findIndex !== -1) {
            leftSliderRef.current?.slickGoTo(findIndex);
        }

        if (item?.isAvaliable) {
            setProductData((oldState) => ({
                ...oldState,
                colorId: item?._id,
                colorName: item?.name,
            }));
        }
    };

    const sizeHandler = (size: string) => {
        setProductData((oldState) => ({
            ...oldState,
            size,
        }));
    };

    useEffect(() => {
        setData({
            leftSlider: leftSliderRef.current,
            rightSlider: rightSliderRef.current,
        });
    }, [leftSliderRef.current, rightSliderRef.current, imageData]);

    useEffect(() => {
        setProductData({
            colorId:
                props?.data?.colors?.length === 1
                    ? props?.data?.colors?.[0]?._id
                    : null,
            size:
                props?.data?.sizes?.length === 1
                    ? props?.data?.sizes?.[0]
                    : null,
            colorName:
                props?.data?.colors?.length === 1
                    ? props?.data?.colors?.[0]?.name
                    : null,
        });
    }, [props.data?.colors.length, props.data?.sizes.length]);

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
                                        {imageData?.map((item) => (
                                            <div
                                                key={item?.id}
                                                className='easyzoom-style'
                                            >
                                                <div className='easyzoom easyzoom--overlay'>
                                                    <img
                                                        src={item?.imageUrl}
                                                        alt={item?.id}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </Slider>
                                    <Slider
                                        asNavFor={data.leftSlider!}
                                        ref={rightSliderRef}
                                        slidesToShow={
                                            imageData?.length > 4
                                                ? 4
                                                : imageData.length
                                        }
                                        {...settingsSmallImgSlider}
                                        className='product-dec-slider product-dec-left'
                                    >
                                        {imageData?.map((item) => (
                                            <div
                                                key={`left_${item?.id}`}
                                                className='product-dec-small'
                                            >
                                                <img
                                                    src={item?.imageUrl}
                                                    alt={item?.id}
                                                />
                                            </div>
                                        ))}
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
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faStar
                                                                    }
                                                                    className='yellow'
                                                                    key={`${props?.data?._id}_filled_star_${index}`}
                                                                />
                                                            );
                                                        }
                                                        return (
                                                            <FontAwesomeIcon
                                                                icon={faStar}
                                                                key={`${props?.data?._id}_unfilled_star_${index}`}
                                                            />
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
                                                    <FontAwesomeIcon
                                                        icon={faCircleCheck}
                                                    />{' '}
                                                    in stock
                                                </span>
                                            ) : (
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={faXmark}
                                                    />{' '}
                                                    out of stock
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <h3>
                                        {!!props?.data?.discount ? (
                                            <>
                                                <span>
                                                    ₹{props?.data?.price}
                                                </span>
                                                {`₹${
                                                    props?.data?.price -
                                                    props?.data?.discount
                                                }`}
                                                <p className='text-success'>
                                                    (
                                                    {calculateDiscount(
                                                        props?.data?.discount,
                                                        props?.data?.price
                                                    )}{' '}
                                                    OFF)
                                                </p>
                                            </>
                                        ) : (
                                            `₹${props?.data?.price}`
                                        )}
                                    </h3>
                                    <div className='quickview-peragraph'>
                                        <p>{props?.data?.description}</p>
                                    </div>
                                    <div className='configurable-wrap custom-wrap'>
                                        <div className='configurable-color'>
                                            <span>Color</span>
                                            <ul>
                                                {props?.data?.colors?.map(
                                                    (item) => (
                                                        <li key={item?._id}>
                                                            <a
                                                                onClick={colorHandler.bind(
                                                                    this,
                                                                    item
                                                                )}
                                                            >
                                                                <span
                                                                    title={
                                                                        item?.isAvaliable
                                                                            ? item?.name
                                                                            : 'Out of Stock'
                                                                    }
                                                                    className={`swatch-anchor ${
                                                                        item?.isAvaliable
                                                                            ? productData.colorId ===
                                                                              item?._id
                                                                                ? 'active'
                                                                                : ''
                                                                            : ' unavailable'
                                                                    }`}
                                                                    style={{
                                                                        backgroundColor:
                                                                            item?.color_code,
                                                                    }}
                                                                >
                                                                    {item?.name}
                                                                    {item?.isAvaliable ? (
                                                                        ''
                                                                    ) : (
                                                                        <span className='cut'></span>
                                                                    )}
                                                                </span>
                                                            </a>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                        <div className='configurable-size'>
                                            <span>Size</span>
                                            <ul>
                                                {props?.data?.sizes?.map(
                                                    (item) => (
                                                        <SizeChip
                                                            key={item}
                                                            item={item}
                                                            selectedSize={
                                                                productData.size
                                                            }
                                                            sizeHandler={
                                                                sizeHandler
                                                            }
                                                            stockData={props?.data?.stock?.find(
                                                                (stock) =>
                                                                    stock?.size ===
                                                                    item
                                                            )}
                                                        />
                                                    )
                                                )}
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
                                            {!!itemData?.quantity &&
                                            itemData?.quantity > 0 ? (
                                                <Link
                                                    to={Screens.CHECKOUT}
                                                    title='Checkout'
                                                >
                                                    Checkout
                                                </Link>
                                            ) : (
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
                                            )}
                                        </div>
                                        <ProductWishlist
                                            productData={props?.data}
                                        />
                                        <div className='quickview-compare'>
                                            <a title='Add to compare' href='#'>
                                                <i className='ti-bar-chart-alt'></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className='quickview-meta'>
                                        <span>
                                            Category: {props?.data?.for}
                                        </span>
                                    </div>
                                    <div className='default-social'>
                                        <ul>
                                            <li>
                                                <a
                                                    className='facebook'
                                                    target='_blank'
                                                    href='https://www.facebook.com/people/The-Zenky/100095030589458/'
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faFacebookF}
                                                    />
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className='twitter'
                                                    target='_blank'
                                                    href='https://twitter.com/ZenkyOfficial'
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faTwitter}
                                                    />
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className='instagram'
                                                    target='_blank'
                                                    href='https://www.instagram.com/the_zenky_official/'
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faInstagram}
                                                    />
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
