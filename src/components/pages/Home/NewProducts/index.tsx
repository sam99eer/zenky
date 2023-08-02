import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetProducts } from 'src/api/GetProducts';
import HomeProductCard from 'src/components/common/HomeProductCard';
import Skeleton from 'src/components/common/Skeleton';
import { IStoreModel } from 'src/store';
import { Keys } from 'src/utils/Keys';
import { Screens } from 'src/utils/Screens';

const NewProducts = () => {
    const navigate = useNavigate();

    const { isLoading, data } = useQuery(Keys.HOME_PRODUCTS, GetProducts);

    const categoryData = useSelector(
        (state: IStoreModel) => state.categoryReducer.data
    );

    const shopHandler = (filter: string) => {
        navigate(Screens.SHOP, { state: { filter } });
    };

    return (
        <>
            <div className='product-area section-padding-3 pt-100'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='column-pro-custom pro-width-22'>
                            <div className='pro-categories-wrap-all'>
                                <div className='pro-categories-wrap'>
                                    <div className='pro-categorie-title'>
                                        <h3>MEN</h3>
                                    </div>
                                    <div className='pro-categorie-list'>
                                        <ul>
                                            {categoryData?.MEN?.map((item) => (
                                                <li key={item?._id}>
                                                    <a>{item?.name}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='column-pro-custom pro-width-78 padding-30-row-col'>
                            <div className='pro-column-width-100'>
                                <div className='row'>
                                    {isLoading ? (
                                        <>
                                            <Skeleton max3perRow />
                                            <Skeleton max3perRow />
                                            <Skeleton max3perRow />
                                            <Skeleton max3perRow />
                                        </>
                                    ) : (
                                        data?.MEN?.map((item) => (
                                            <HomeProductCard
                                                max3perRow
                                                key={item?._id}
                                                data={item}
                                            />
                                        ))
                                    )}
                                </div>
                                {!!data?.MEN && data?.MEN?.length > 0 ? (
                                    <div className='product-viewmore-wrap about-learnwmore-btn text-center'>
                                        <a
                                            onClick={shopHandler.bind(
                                                this,
                                                'MEN'
                                            )}
                                        >
                                            <div className='pro-viewmore-normal pro-viewmore-common'>
                                                <span>View more products</span>
                                            </div>
                                            <div className='pro-viewmore-hover pro-viewmore-common'>
                                                <span>View more products</span>
                                            </div>
                                        </a>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <div className='row mt-100'>
                        <div className='column-pro-custom pro-width-22'>
                            <div className='pro-categories-wrap-all'>
                                <div className='pro-categories-wrap'>
                                    <div className='pro-categorie-title'>
                                        <h3>WOMEN</h3>
                                    </div>
                                    <div className='pro-categorie-list'>
                                        <ul>
                                            {categoryData?.WOMEN?.map(
                                                (item) => (
                                                    <li key={item?._id}>
                                                        <a>{item?.name}</a>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='column-pro-custom pro-width-78 padding-30-row-col'>
                            <div className='pro-column-width-100'>
                                <div className='row'>
                                    {isLoading ? (
                                        <>
                                            <Skeleton max3perRow />
                                            <Skeleton max3perRow />
                                            <Skeleton max3perRow />
                                            <Skeleton max3perRow />
                                        </>
                                    ) : (
                                        data?.WOMEN?.map((item) => (
                                            <HomeProductCard
                                                max3perRow
                                                key={item?._id}
                                                data={item}
                                            />
                                        ))
                                    )}
                                </div>
                                {!!data?.WOMEN && data?.WOMEN?.length > 0 ? (
                                    <div className='product-viewmore-wrap about-learnwmore-btn text-center'>
                                        <a
                                            onClick={shopHandler.bind(
                                                this,
                                                'WOMEN'
                                            )}
                                        >
                                            <div className='pro-viewmore-normal pro-viewmore-common'>
                                                <span>View more products</span>
                                            </div>
                                            <div className='pro-viewmore-hover pro-viewmore-common'>
                                                <span>View more products</span>
                                            </div>
                                        </a>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <div className='row mt-100'>
                        <div className='column-pro-custom pro-width-22'>
                            <div className='pro-categories-wrap-all'>
                                <div className='pro-categories-wrap'>
                                    <div className='pro-categorie-title'>
                                        <h3>KIDS</h3>
                                    </div>
                                    <div className='pro-categorie-list'>
                                        <ul>
                                            {categoryData?.KIDS?.map((item) => (
                                                <li key={item?._id}>
                                                    <a>{item?.name}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='column-pro-custom pro-width-78 padding-30-row-col'>
                            <div className='pro-column-width-100'>
                                <div className='row'>
                                    {isLoading ? (
                                        <>
                                            <Skeleton max3perRow />
                                            <Skeleton max3perRow />
                                            <Skeleton max3perRow />
                                            <Skeleton max3perRow />
                                        </>
                                    ) : (
                                        data?.KIDS?.map((item) => (
                                            <HomeProductCard
                                                max3perRow
                                                key={item?._id}
                                                data={item}
                                            />
                                        ))
                                    )}
                                </div>
                                {!!data?.KIDS && data?.KIDS?.length > 0 ? (
                                    <div className='product-viewmore-wrap about-learnwmore-btn text-center'>
                                        <a
                                            onClick={shopHandler.bind(
                                                this,
                                                'KIDS'
                                            )}
                                        >
                                            <div className='pro-viewmore-normal pro-viewmore-common'>
                                                <span>View more products</span>
                                            </div>
                                            <div className='pro-viewmore-hover pro-viewmore-common'>
                                                <span>View more products</span>
                                            </div>
                                        </a>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewProducts;
