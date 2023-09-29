import {
    faFacebookF,
    faInstagram,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faStar, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { toast } from 'react-toastify';
import CardWishlistButton from 'src/components/common/CardWishlistButton';
import SizeChip from 'src/components/common/SizeChip';
import { Color, IGetProductItem } from 'src/models/api/GetProductsModel';
import { IColorImage } from 'src/models/data/ColorImageModel';
import { IProductData } from 'src/models/screens/ProductDetails';
import { IStoreModel } from 'src/store';
import { cartSliceActions } from 'src/store/Actions';
import { calculateDiscount, formatServerImagePath } from 'src/utils/Helpers';
import { Screens } from 'src/utils/Screens';
import { quickviewSliderSettings } from 'src/utils/SliderSettings';
import NoImage from '/assets/images/no-image.jpg';

const HomeProductCard = (props: {
    data: IGetProductItem;
    max3perRow?: boolean;
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [productData, setProductData] = useState<IProductData>({
        colorId:
            props?.data?.colors?.length === 1
                ? props?.data?.colors?.[0]?._id
                : null,
        size: props?.data?.sizes?.length === 1 ? props?.data?.sizes?.[0] : null,
        colorName:
            props?.data?.colors?.length === 1
                ? props?.data?.colors?.[0]?.name
                : null,
    });

    const [imageLoaded, setImageLoaded] = useState(false);

    const mainSliderRef = useRef<Slider>(null);

    const cartItems = useSelector(
        (state: IStoreModel) => state.cartReducer.cartItem
    );
    const itemData = cartItems.find((item) => item?._id === props?.data?._id);

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
        images?.unshift({
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
                            ...props?.data,
                            colorName: productData?.colorName,
                            colorId: productData?.colorId,
                            size: productData?.size,
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
                        _id: props?.data?._id,
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
            mainSliderRef.current?.slickGoTo(findIndex);
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

    const navigateHandler = () => {
        navigate(`${Screens.PRODUCT_DETAILS}/${props?.data?._id}`);
    };

    return (
        <>
            {createPortal(
                <div
                    className='modal fade'
                    key={`productModal_${props?.data?._id}`}
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
                                        <Slider
                                            className='quickview-slider-active owl-carousel'
                                            ref={mainSliderRef}
                                            {...quickviewSliderSettings}
                                        >
                                            {imageData?.map((item) => (
                                                <img
                                                    key={item?.id}
                                                    src={item?.imageUrl}
                                                    alt={item?.colorName}
                                                />
                                            ))}
                                        </Slider>
                                    </div>
                                    <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12'>
                                        <div className='quickview-content'>
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
                                                                        ?.rating ??
                                                                        0)
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
                                                                        icon={
                                                                            faStar
                                                                        }
                                                                        key={`${props?.data?._id}_unfilled_star_${index}`}
                                                                    />
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                    <a>
                                                        {' '}
                                                        (
                                                        {props?.data?.ratedBy ??
                                                            0}{' '}
                                                        customer review)
                                                    </a>
                                                </div>
                                                <div className='quickview-stock'>
                                                    {props?.data
                                                        ?.isAvaliable ? (
                                                        <span>
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faCircleCheck
                                                                }
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
                                                            ₹
                                                            {props?.data?.price}
                                                        </span>
                                                        {`₹${
                                                            props?.data?.price -
                                                            props?.data
                                                                ?.discount
                                                        }`}
                                                        <p className='text-success'>
                                                            (
                                                            {calculateDiscount(
                                                                props?.data
                                                                    ?.discount,
                                                                props?.data
                                                                    ?.price
                                                            )}{' '}
                                                            OFF)
                                                        </p>
                                                    </>
                                                ) : (
                                                    `₹${props?.data?.price}`
                                                )}
                                            </h3>
                                            <div className='quickview-peragraph'>
                                                <p>
                                                    {props?.data?.description}
                                                </p>
                                            </div>
                                            <div className='configurable-wrap custom-wrap'>
                                                <div className='configurable-color'>
                                                    <span>Color</span>
                                                    <ul>
                                                        {props?.data?.colors?.map(
                                                            (item) => (
                                                                <li
                                                                    key={
                                                                        item?._id
                                                                    }
                                                                >
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
                                                                            {
                                                                                item?.name
                                                                            }
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
                                                                        (
                                                                            stock
                                                                        ) =>
                                                                            stock?.size ===
                                                                            item
                                                                    )}
                                                                />
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className='quickview-action-wrap'>
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
                                                    Category: {props?.data?.for}
                                                </span>
                                            </div>
                                            <div className='default-social'>
                                                <ul>
                                                    <li>
                                                        <a
                                                            className='facebook'
                                                            href='https://www.facebook.com/people/The-Zenky/100095030589458/'
                                                            target='_blank'
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faFacebookF
                                                                }
                                                            />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className='twitter'
                                                            href='https://twitter.com/ZenkyOfficial'
                                                            target='_blank'
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faTwitter}
                                                            />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className='instagram'
                                                            href='https://www.instagram.com/the_zenky_official/'
                                                            target='_blank'
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faInstagram
                                                                }
                                                            />
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
            <div
                className={
                    props?.max3perRow
                        ? 'col-lg-4 col-md-6 col-sm-6'
                        : 'col-xl-3 col-lg-4 col-md-6 col-sm-6'
                }
            >
                <div className='product-wrap mb-50'>
                    <div className='product-img default-overlay mb-20'>
                        <a onClick={navigateHandler}>
                            <img
                                className={`default-img ${
                                    imageLoaded ? '' : 'hide'
                                }`}
                                src={
                                    props?.data?.image
                                        ? formatServerImagePath(
                                              props?.data?.image
                                          )
                                        : NoImage
                                }
                                onLoad={setImageLoaded.bind(this, true)}
                                onError={setImageLoaded.bind(this, true)}
                                alt='Cover'
                            />
                            {!imageLoaded ? (
                                <span className='product-skeleton'></span>
                            ) : null}
                            {!!props?.data?.colors?.[0]?.image1 ? (
                                <img
                                    className='hover-img'
                                    src={formatServerImagePath(
                                        props?.data?.colors?.[0]?.image1
                                    )}
                                    alt='Secondary'
                                />
                            ) : null}
                            {!!props?.data?.discount ? (
                                <span className='price-dec'>
                                    {calculateDiscount(
                                        props?.data?.discount,
                                        props?.data?.price
                                    )}
                                </span>
                            ) : null}
                        </a>
                        <div className='product-action'>
                            <a
                                data-bs-toggle='modal'
                                data-bs-target={`#productModal_${props?.data?._id}`}
                                title='Quick View'
                            >
                                <i className=' ti-zoom-in'></i>
                                <span>Quick Shop</span>
                            </a>
                            <CardWishlistButton productData={props?.data} />
                        </div>
                        <div className='product-action-2'>
                            <a
                                title={inStock ? 'Add to cart' : 'Out of Stock'}
                                onClick={inStock ? navigateHandler : undefined}
                            >
                                {inStock ? 'Add to cart' : 'Out of Stock'}
                            </a>
                        </div>
                    </div>
                    <div className='product-content'>
                        <h3>
                            <Link
                                to={`${Screens.PRODUCT_DETAILS}/${props?.data?._id}`}
                            >
                                {props?.data?.name}
                            </Link>
                        </h3>
                        <div className='product-price'>
                            {props?.data?.discount ? (
                                <span className='old'>
                                    ₹{props?.data?.price}
                                </span>
                            ) : null}
                            <span>
                                ₹
                                {!!props?.data?.discount
                                    ? props?.data?.price - props?.data?.discount
                                    : props?.data?.price}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeProductCard;
