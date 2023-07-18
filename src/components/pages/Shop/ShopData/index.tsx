import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { GetProducts } from 'src/api/GetProducts';
import HomeProductCard from 'src/components/common/HomeProductCard';
import Skeleton from 'src/components/common/Skeleton';
import { Keys } from 'src/utils/Keys';

const ShopData = () => {
    const [filterActive, setFilterActive] = useState(false);

    const {
        data,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isFetching,
    } = useInfiniteQuery(
        Keys.ALL_PRODUCTS,
        ({ pageParam }) => GetProducts({ pageNumber: pageParam ?? 1 }),
        {
            getNextPageParam: (lastPage) =>
                Math.ceil(lastPage?.totalItems / 20) > +lastPage?.pageNumber
                    ? +lastPage?.pageNumber + 1
                    : undefined,
        }
    );

    const intersectionRef = useRef<HTMLDivElement>(null);

    const toggleActiveFilterHandler = () => {
        setFilterActive((oldState) => !oldState);
    };

    const productData = useMemo(
        () => (!!data ? data?.pages?.flatMap((item) => item.items) : []),
        [data?.pages?.length]
    );

    const intersectionCallback: IntersectionObserverCallback = useCallback(
        (entries) => {
            const target = entries[0];
            if (
                !isFetching &&
                target.isIntersecting &&
                hasNextPage &&
                !isFetchingNextPage
            ) {
                fetchNextPage();
            }
        },
        [hasNextPage, isFetchingNextPage, isFetching]
    );

    useEffect(() => {
        const observer = new IntersectionObserver(intersectionCallback, {
            rootMargin: '0px',
        });

        const { current: lastElement } = intersectionRef;
        if (lastElement) {
            observer.observe(lastElement);
        }

        return () => {
            if (lastElement) {
                observer.unobserve(lastElement);
            }
        };
    }, [intersectionCallback]);

    return (
        <div className='shop-area section-padding-1 pt-50 pb-80'>
            <div className='container-fluid'>
                <div className='shop-top-bar'>
                    <div className='shop-top-bar-right'>
                        <div className='shop-filter'>
                            <a
                                className={`shop-filter-active ${
                                    filterActive ? 'active' : ''
                                }`}
                                onClick={toggleActiveFilterHandler}
                            >
                                Filters{' '}
                                <i className='fa fa-angle-down angle-down'></i>{' '}
                                <i className='fa fa-angle-up angle-up'></i>
                            </a>
                        </div>
                        <div className='shop-short-by ml-30'>
                            <span>
                                Sort by{' '}
                                <i className='fa fa-angle-down angle-down'></i>{' '}
                                <i className='fa fa-angle-up angle-up'></i>
                            </span>
                            <ul>
                                <li className='active'>
                                    <a href='#'>Default sorting</a>
                                </li>
                                <li>
                                    <a href='#'>Sort by popularity</a>
                                </li>
                                <li>
                                    <a href='#'>Sort by average rating</a>
                                </li>
                                <li>
                                    <a href='#'>Sort by latest</a>
                                </li>
                                <li>
                                    <a href='#'>Sort by price: low to high</a>
                                </li>
                                <li>
                                    <a href='#'>Sort by price: high to low</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='product-filter-wrapper'>
                    <div className='row'>
                        <div className='col-md-3 col-sm-6 col-xs-12 mb-20'>
                            <div className='product-filter'>
                                <h5>Price</h5>
                                <div className='price-filter'>
                                    <ul>
                                        <li>
                                            <a href='#'>$0.00 - $20.00</a>
                                        </li>
                                        <li>
                                            <a href='#'>$20.00 - $40.00</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className='col-md-3 col-sm-6 col-xs-12 mb-20'>
                            <div className='product-filter'>
                                <h5>color filters</h5>
                                <div className='color-filter'>
                                    <ul>
                                        <li>
                                            <a href='#'>Blue</a>
                                        </li>
                                        <li>
                                            <a href='#'>Brown</a>
                                        </li>
                                        <li>
                                            <a href='#'>Green</a>
                                        </li>
                                        <li>
                                            <a href='#'>Pink</a>
                                        </li>
                                        <li>
                                            <a href='#'>Violet</a>
                                        </li>
                                        <li>
                                            <a href='#'>White</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className='col-md-3 col-sm-6 col-xs-12 mb-20'>
                            <div className='product-filter'>
                                <h5>product tags</h5>
                                <div className='product-tags'>
                                    <ul>
                                        <li>
                                            <a href='#'>Airi</a>
                                        </li>
                                        <li>
                                            <a href='#'>Helas</a>
                                        </li>
                                        <li>
                                            <a href='#'>Mango</a>
                                        </li>
                                        <li>
                                            <a href='#'>Payna</a>
                                        </li>
                                        <li>
                                            <a href='#'>Toro</a>
                                        </li>
                                        <li>
                                            <a href='#'>Valention</a>
                                        </li>
                                        <li>
                                            <a href='#'>Veera</a>
                                        </li>
                                        <li>
                                            <a href='#'>Zara</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className='col-md-3 col-sm-6 col-xs-12 mb-20'>
                            <div className='product-filter'>
                                <h5>product size</h5>
                                <div className='fliter-size'>
                                    <ul>
                                        <li>
                                            <a href='#'>L</a>
                                        </li>
                                        <li>
                                            <a href='#'>M</a>
                                        </li>
                                        <li>
                                            <a href='#'>S</a>
                                        </li>
                                        <li>
                                            <a href='#'>XL</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='filter-close-wrap text-center'>
                                <a className='filter-close' href='#'>
                                    <i className='ti-close'></i> Clear All
                                    Filter
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='tab-content jump'>
                    <div className='tab-pane active'>
                        <div className='row'>
                            {isLoading ? (
                                <>
                                    <Skeleton />
                                    <Skeleton />
                                    <Skeleton />
                                    <Skeleton />
                                    <Skeleton />
                                    <Skeleton />
                                    <Skeleton />
                                    <Skeleton />
                                </>
                            ) : null}
                            {productData?.length > 0 ? (
                                <>
                                    {productData?.map((item) => (
                                        <HomeProductCard
                                            key={item._id}
                                            data={item}
                                        />
                                    ))}
                                    {isFetchingNextPage ? (
                                        <>
                                            <Skeleton />
                                            <Skeleton />
                                            <Skeleton />
                                            <Skeleton />
                                            <Skeleton />
                                            <Skeleton />
                                            <Skeleton />
                                            <Skeleton />
                                        </>
                                    ) : null}
                                    {hasNextPage ? (
                                        <div
                                            ref={intersectionRef}
                                            style={{ height: '10px' }}
                                        />
                                    ) : null}
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopData;
