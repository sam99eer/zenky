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
        <>
            <div className='product-area section-padding-3'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='column-pro-custom pro-width-22'>
                            <div className='pro-categories-wrap-all'>
                                <div className='pro-categories-wrap'>
                                    <div className='pro-categorie-title'>
                                        <h3>WOMAN</h3>
                                    </div>
                                    <div className='pro-categorie-list'>
                                        <ul>
                                            <li>
                                                <a>Coats</a>
                                            </li>
                                            <li>
                                                <a>Jackets </a>
                                            </li>
                                            <li>
                                                <a>Knitwear </a>
                                            </li>
                                            <li>
                                                <a>Dresses </a>
                                            </li>
                                            <li>
                                                <a>Dresses </a>
                                            </li>
                                            <li>
                                                <a>Shirts | Blouses</a>
                                            </li>
                                            <li>
                                                <a>T-shirts</a>
                                            </li>
                                            <li>
                                                <a>Trousers</a>
                                            </li>
                                            <li>
                                                <a>Jeans </a>
                                            </li>
                                            <li>
                                                <a>Skirts </a>
                                            </li>
                                            <li>
                                                <a>Blazers</a>
                                            </li>
                                            <li>
                                                <a>Sweatshirts</a>
                                            </li>
                                            <li>
                                                <a>Bodysuit </a>
                                            </li>
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
                                            <Skeleton />
                                            <Skeleton />
                                            <Skeleton />
                                            <Skeleton />
                                        </>
                                    ) : (
                                        data?.items?.map((item) => (
                                            <HomeProductCard
                                                max3perRow
                                                key={item?._id}
                                                data={item}
                                            />
                                        ))
                                    )}
                                </div>
                                <div className='product-viewmore-wrap about-learnwmore-btn text-center'>
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

                    <div className='row mt-100'>
                        <div className='column-pro-custom pro-width-22'>
                            <div className='pro-categories-wrap-all'>
                                <div className='pro-categories-wrap'>
                                    <div className='pro-categorie-title'>
                                        <h3>MAN</h3>
                                    </div>
                                    <div className='pro-categorie-list'>
                                        <ul>
                                            <li>
                                                <a>Coats</a>
                                            </li>
                                            <li>
                                                <a>Jackets </a>
                                            </li>
                                            <li>
                                                <a>Knitwear </a>
                                            </li>
                                            <li>
                                                <a>Dresses </a>
                                            </li>
                                            <li>
                                                <a>Dresses </a>
                                            </li>
                                            <li>
                                                <a>Shirts | Blouses</a>
                                            </li>
                                            <li>
                                                <a>T-shirts</a>
                                            </li>
                                            <li>
                                                <a>Trousers</a>
                                            </li>
                                            <li>
                                                <a>Jeans </a>
                                            </li>
                                            <li>
                                                <a>Skirts </a>
                                            </li>
                                            <li>
                                                <a>Blazers</a>
                                            </li>
                                            <li>
                                                <a>Sweatshirts</a>
                                            </li>
                                            <li>
                                                <a>Bodysuit </a>
                                            </li>
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
                                            <Skeleton />
                                            <Skeleton />
                                            <Skeleton />
                                            <Skeleton />
                                        </>
                                    ) : (
                                        data?.items?.map((item) => (
                                            <HomeProductCard
                                                max3perRow
                                                key={item?._id}
                                                data={item}
                                            />
                                        ))
                                    )}
                                </div>
                                <div className='product-viewmore-wrap about-learnwmore-btn text-center'>
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

                    <div className='row mt-100'>
                        <div className='column-pro-custom pro-width-22'>
                            <div className='pro-categories-wrap-all'>
                                <div className='pro-categories-wrap'>
                                    <div className='pro-categorie-title'>
                                        <h3>KIDS</h3>
                                    </div>
                                    <div className='pro-categorie-list'>
                                        <ul>
                                            <li>
                                                <a>Coats</a>
                                            </li>
                                            <li>
                                                <a>Jackets </a>
                                            </li>
                                            <li>
                                                <a>Knitwear </a>
                                            </li>
                                            <li>
                                                <a>Dresses </a>
                                            </li>
                                            <li>
                                                <a>Dresses </a>
                                            </li>
                                            <li>
                                                <a>Shirts | Blouses</a>
                                            </li>
                                            <li>
                                                <a>T-shirts</a>
                                            </li>
                                            <li>
                                                <a>Trousers</a>
                                            </li>
                                            <li>
                                                <a>Jeans </a>
                                            </li>
                                            <li>
                                                <a>Skirts </a>
                                            </li>
                                            <li>
                                                <a>Blazers</a>
                                            </li>
                                            <li>
                                                <a>Sweatshirts</a>
                                            </li>
                                            <li>
                                                <a>Bodysuit </a>
                                            </li>
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
                                            <Skeleton />
                                            <Skeleton />
                                            <Skeleton />
                                            <Skeleton />
                                        </>
                                    ) : (
                                        data?.items?.map((item) => (
                                            <HomeProductCard
                                                max3perRow
                                                key={item?._id}
                                                data={item}
                                            />
                                        ))
                                    )}
                                </div>
                                <div className='product-viewmore-wrap about-learnwmore-btn text-center'>
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
                </div>
            </div>
        </>
    );
};

export default NewProducts;
