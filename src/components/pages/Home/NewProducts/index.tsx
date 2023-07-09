import { useQuery } from 'react-query';
import { GetProducts } from 'src/Api/GetProducts';
import HomeProductCard from 'src/components/common/HomeProductCard';
import Skeleton from 'src/components/common/Skeleton';
import { Keys } from 'src/utils/Keys';

const NewProducts = () => {
    const { isLoading, data } = useQuery(
        Keys.GET_PRODUCTS,
        GetProducts.bind(this, {
            pageNumber: 1,
            pageSize: 12,
        })
    );

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
                        <a href='shop-fullwide.html'>
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
