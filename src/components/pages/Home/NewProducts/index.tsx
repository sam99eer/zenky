import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { GetProducts } from 'src/api/GetProducts';
import HomeProductCard from 'src/components/common/HomeProductCard';
import Skeleton from 'src/components/common/Skeleton';
import { Keys } from 'src/utils/Keys';
import { Screens } from 'src/utils/Screens';

const NewProducts = () => {
    const navigate = useNavigate();

    const { isLoading, data } = useQuery(
        Keys.GET_PRODUCTS,
        GetProducts.bind(this, {
            pageNumber: 1,
            pageSize: 12,
        })
    );

    const shopHandler = () => {
        navigate(Screens.SHOP);
    };

    return (
        <div className='product-area section-padding-3 pb-100'>
            <div className='container-fluid'>
                <div className='section-title-5 text-center mb-40 mt-50'>
                    <h2>new products</h2>
                </div>

                <div className='tab-content jump'>
                    <div className='tab-pane active padding-30-row-col'>
                        <div className='row'>
                            {isLoading ? (
                                <>
                                    <Skeleton />
                                    <Skeleton />
                                    <Skeleton />
                                    <Skeleton />
                                </>
                            ) : (
                                data?.items?.map((item) => (
                                    <HomeProductCard
                                        key={item?._id}
                                        data={item}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                    <div className='product-viewmore-wrap text-center'>
                        <a onClick={shopHandler}>
                            <div className='pro-viewmore-normal pro-viewmore-common'>
                                <span>View more products</span>
                            </div>
                            <div className='pro-viewmore-hover pro-viewmore-common'>
                                <span>View more products</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewProducts;
