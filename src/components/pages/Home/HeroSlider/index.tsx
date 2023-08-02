import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { GetFeaturedProduct } from 'src/api/GetFeaturedProducts';
import FeatureSkeleton from 'src/components/common/FeatureSkeleton';
import { formatServerImagePath } from 'src/utils/Helpers';
import { Keys } from 'src/utils/Keys';
import { Screens } from 'src/utils/Screens';
import { revolutionSliderSettings } from 'src/utils/SliderSettings';

const HeroSlider = () => {
    const { isLoading, data } = useQuery(
        Keys.FEATURED_PRODUCT,
        GetFeaturedProduct
    );

    const navigate = useNavigate();

    const navigateHandler = (pId: string) => {
        navigate(`${Screens.PRODUCT_DETAILS}/${pId}`);
    };

    if (isLoading) {
        return <FeatureSkeleton />;
    }

    return (
        <Slider {...revolutionSliderSettings} className='rev-slider'>
            {data?.data?.map((item) => (
                <div
                    key={item?._id}
                    className={`rev-slider-content ${
                        item?.image_alignment === 'bottom-right' ||
                        item?.image_alignment === 'top-right'
                            ? 'reverse'
                            : ''
                    }`}
                >
                    <img
                        src={formatServerImagePath(item?.image)}
                        alt=''
                        className='img-fluid'
                        style={{
                            alignSelf:
                                item?.image_alignment === 'bottom-left' ||
                                item?.image_alignment === 'bottom-right'
                                    ? 'flex-end'
                                    : 'flex-start',
                        }}
                    />
                    <div className='description'>
                        <p>{item?.product?.name}</p>
                        <h2>{item?.label}</h2>
                        <p className='price'>₹{item?.product?.price}</p>
                        <button
                            onClick={navigateHandler.bind(
                                this,
                                item?.productId
                            )}
                        >
                            Shop Now
                        </button>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default HeroSlider;
