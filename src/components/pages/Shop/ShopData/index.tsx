import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {
    ChangeEvent,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GetColors } from 'src/api/GetColors';
import { GetFilteredProducts } from 'src/api/GetFilteredProducts';
import HomeProductCard from 'src/components/common/HomeProductCard';
import Skeleton from 'src/components/common/Skeleton';
import { IFilter } from 'src/models/data/FilterModel';
import { Keys } from 'src/utils/Keys';

const ShopData = () => {
    const {
        state,
    }: {
        state: {
            filter?: string;
            search?: string;
        };
    } = useLocation();

    const [search, setSearch] = useState(
        !!state?.search ? state?.search : null
    );

    const [cloneFilterData, setCloneFilterData] = useState<IFilter>({
        filter: !!state?.filter ? state?.filter : null,
        color: null,
        sizes: [],
        sortBy: null,
        sortColumn: null,
        minPrice: null,
        maxPrice: null,
        isAvaliable: null,
        search: !!state?.search ? state?.search : null,
    });

    const [rangeValue, setRangeValue] = useState([100, 10000]);

    const { data: colorData } = useQuery(Keys.GET_COLORS, GetColors);

    const {
        data,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isFetching,
    } = useInfiniteQuery(
        [
            Keys.GET_FILTERED_PRODUCTS,
            'color=' + cloneFilterData.color,
            'filter=' + cloneFilterData.filter,
            'maxPrice=' + cloneFilterData.maxPrice,
            'minPrice=' + cloneFilterData.minPrice,
            'sizes=' + cloneFilterData.sizes.toString(),
            'isAvaliable=' + cloneFilterData.isAvaliable,
            'sortBy=' + cloneFilterData.sortBy,
            'sortColumn=' + cloneFilterData.sortColumn,
            'search=' + cloneFilterData.search,
        ],
        ({ pageParam }) =>
            GetFilteredProducts({
                pageNumber: pageParam ?? 1,
                filters: cloneFilterData,
            }),
        {
            getNextPageParam: (lastPage) =>
                Math.ceil(lastPage?.totalItems / 20) > +lastPage?.pageNumber
                    ? +lastPage?.pageNumber + 1
                    : undefined,
            cacheTime: 300000,
            staleTime: 300000,
        }
    );

    const intersectionRef = useRef<HTMLDivElement>(null);

    const productData = useMemo(
        () => (!!data ? data?.pages?.flatMap((item) => item.items) : []),
        [data]
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

    const handleChange = (values: number | number[]) => {
        if (Array.isArray(values)) {
            setRangeValue(values);
        }
    };

    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const applyFilterHandler = () => {
        setCloneFilterData((oldState) => ({
            ...oldState,
            minPrice: rangeValue[0],
            maxPrice: rangeValue[1],
        }));
    };

    const resetHandler = () => {
        setRangeValue([100, 10000]);
        setSearch('');
        setCloneFilterData((oldState) => ({
            filter: null,
            color: null,
            sizes: [],
            sortBy: null,
            sortColumn: null,
            minPrice: null,
            maxPrice: null,
            search: null,
            isAvaliable: oldState.isAvaliable,
        }));
    };

    const toggleHandler = (uid: keyof IFilter, value: string) => {
        if (uid === 'sizes') {
            const clone = [...cloneFilterData.sizes];
            const findItem = clone?.findIndex((item) => item === value);
            if (findItem === -1) {
                clone.push(value);
            } else {
                clone.splice(findItem, 1);
            }

            setCloneFilterData((oldState) => ({
                ...oldState,
                sizes: clone,
            }));
            return;
        }

        if (uid === 'color') {
            if (cloneFilterData.color === value) {
                setCloneFilterData((oldState) => ({
                    ...oldState,
                    color: null,
                }));
                return;
            }
            setCloneFilterData((oldState) => ({
                ...oldState,
                color: value,
            }));
            return;
        }
    };

    const searchApplyHandler = () => {
        if (!!search && search?.trim()?.length < 3) {
            toast.warn('Please enter atleast 3 characters in search query');
            return;
        }

        setCloneFilterData((oldState) => ({
            ...oldState,
            search: search === '' ? null : search,
        }));
    };

    const cloneFilterHandler = (uid: keyof IFilter, value: string) => {
        setCloneFilterData((oldState) => ({
            ...oldState,
            [uid]: value,
        }));
    };

    const resetSortData = () => {
        setCloneFilterData((oldState) => ({
            ...oldState,
            sortBy: null,
            sortColumn: null,
        }));
    };

    const sortHandler = (fieldName: string, sortType: number) => {
        if (cloneFilterData.isAvaliable) {
            setCloneFilterData((oldState) => ({
                ...oldState,
                sortColumn: fieldName,
                sortBy: sortType,
                isAvaliable: null,
            }));
            return;
        }

        setCloneFilterData((oldState) => ({
            ...oldState,
            sortColumn: fieldName,
            sortBy: sortType,
        }));
    };

    const availableHandler = () => {
        setCloneFilterData((oldState) => ({
            ...oldState,
            isAvaliable: true,
        }));
    };

    const hidePriceApplyButton = useMemo(
        () =>
            rangeValue?.[0] === cloneFilterData.minPrice &&
            rangeValue?.[1] === cloneFilterData.maxPrice,
        [rangeValue, cloneFilterData.minPrice, cloneFilterData.maxPrice]
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
                <div className='row'>
                    <div className='col-lg-3'>
                        <div className='shop-sidebar-style mt-25 mr-35'>
                            <div className='sidebar-widget mb-70'>
                                <h4 className='pro-sidebar-title'>
                                    Categories{' '}
                                </h4>
                                <div className='sidebar-widget-list mt-50'>
                                    <ul>
                                        <li>
                                            <a
                                                className={
                                                    cloneFilterData.filter ===
                                                    'MEN'
                                                        ? 'active'
                                                        : ''
                                                }
                                                onClick={cloneFilterHandler.bind(
                                                    this,
                                                    'filter',
                                                    'MEN'
                                                )}
                                            >
                                                Men
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className={
                                                    cloneFilterData.filter ===
                                                    'WOMEN'
                                                        ? 'active'
                                                        : ''
                                                }
                                                onClick={cloneFilterHandler.bind(
                                                    this,
                                                    'filter',
                                                    'WOMEN'
                                                )}
                                            >
                                                Women
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className={
                                                    cloneFilterData.filter ===
                                                    'KIDS'
                                                        ? 'active'
                                                        : ''
                                                }
                                                onClick={cloneFilterHandler.bind(
                                                    this,
                                                    'filter',
                                                    'KIDS'
                                                )}
                                            >
                                                Kids
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='sidebar-widget mb-70'>
                                <h4 className='pro-sidebar-title'>By Price </h4>
                                <div className='price-filter mt-65'>
                                    <Slider
                                        className='slider-range'
                                        range
                                        min={100}
                                        max={10000}
                                        step={50}
                                        value={rangeValue}
                                        onChange={handleChange}
                                    />
                                    <div className='price-slider-amount'>
                                        <div className='label-input'>
                                            <span>Price: </span>
                                            <input
                                                type='text'
                                                id='amount'
                                                name='price'
                                                placeholder='Add Your Price'
                                                value={`₹${rangeValue?.[0]}-₹${rangeValue?.[1]}`}
                                                readOnly
                                            />
                                        </div>
                                        {hidePriceApplyButton ? null : (
                                            <button
                                                type='button'
                                                onClick={applyFilterHandler}
                                            >
                                                Apply
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='sidebar-widget mb-65'>
                                <h4 className='pro-sidebar-title'>Size</h4>
                                <div className='sidebar-widget-size mt-55'>
                                    <ul>
                                        <li>
                                            <a
                                                className={
                                                    cloneFilterData.sizes.includes(
                                                        'S'
                                                    )
                                                        ? 'active'
                                                        : ''
                                                }
                                                onClick={toggleHandler.bind(
                                                    this,
                                                    'sizes',
                                                    'S'
                                                )}
                                            >
                                                S
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className={
                                                    cloneFilterData.sizes.includes(
                                                        'M'
                                                    )
                                                        ? 'active'
                                                        : ''
                                                }
                                                onClick={toggleHandler.bind(
                                                    this,
                                                    'sizes',
                                                    'M'
                                                )}
                                            >
                                                M
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className={
                                                    cloneFilterData.sizes.includes(
                                                        'L'
                                                    )
                                                        ? 'active'
                                                        : ''
                                                }
                                                onClick={toggleHandler.bind(
                                                    this,
                                                    'sizes',
                                                    'L'
                                                )}
                                            >
                                                L
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className={
                                                    cloneFilterData.sizes.includes(
                                                        'XL'
                                                    )
                                                        ? 'active'
                                                        : ''
                                                }
                                                onClick={toggleHandler.bind(
                                                    this,
                                                    'sizes',
                                                    'XL'
                                                )}
                                            >
                                                XL
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className={
                                                    cloneFilterData.sizes.includes(
                                                        'XXL'
                                                    )
                                                        ? 'active'
                                                        : ''
                                                }
                                                onClick={toggleHandler.bind(
                                                    this,
                                                    'sizes',
                                                    'XXL'
                                                )}
                                            >
                                                XXL
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className={
                                                    cloneFilterData.sizes.includes(
                                                        'POLO'
                                                    )
                                                        ? 'active'
                                                        : ''
                                                }
                                                onClick={toggleHandler.bind(
                                                    this,
                                                    'sizes',
                                                    'POLO'
                                                )}
                                            >
                                                Polo
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className={
                                                    cloneFilterData.sizes.includes(
                                                        'OVERSIZED'
                                                    )
                                                        ? 'active'
                                                        : ''
                                                }
                                                onClick={toggleHandler.bind(
                                                    this,
                                                    'sizes',
                                                    'OVERSIZED'
                                                )}
                                            >
                                                Oversized
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='sidebar-widget sw-overflow mb-65'>
                                <h4 className='pro-sidebar-title'>Color</h4>
                                <div className='sidebar-widget-color mt-50'>
                                    <ul>
                                        {colorData?.data?.colors?.map(
                                            (item) => (
                                                <li key={item}>
                                                    <a
                                                        onClick={toggleHandler.bind(
                                                            this,
                                                            'color',
                                                            item
                                                        )}
                                                    >
                                                        <span
                                                            className={`swatch-anchor ${
                                                                cloneFilterData?.color ===
                                                                item
                                                                    ? 'active'
                                                                    : ''
                                                            }`}
                                                            style={{
                                                                backgroundColor:
                                                                    item,
                                                            }}
                                                        ></span>
                                                    </a>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                            <div className='sidebar-widget sw-overflow mb-65'>
                                <h4 className='pro-sidebar-title'>Search</h4>
                                <div className='sidebar-widget-color mt-50'>
                                    <div className='search'>
                                        <input
                                            type='text'
                                            placeholder='Search (min 3 characters)'
                                            value={search ? search : ''}
                                            onChange={searchHandler}
                                        />
                                        <button onClick={searchApplyHandler}>
                                            Go
                                        </button>
                                    </div>

                                    <div className='container'>
                                        <div className='actions row mt-50'>
                                            <a
                                                className='filter-close'
                                                onClick={resetHandler}
                                            >
                                                <i className='ti-close'></i>{' '}
                                                Clear All Filters
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-9'>
                        <div className='shop-top-bar'>
                            <div className='shop-top-bar-right'>
                                <div className='shop-short-by ml-30'>
                                    <span>
                                        Sort by{' '}
                                        <FontAwesomeIcon
                                            icon={faAngleDown}
                                            className='angle-down'
                                        />{' '}
                                        <FontAwesomeIcon
                                            icon={faAngleUp}
                                            className='angle-up'
                                        />
                                    </span>
                                    <ul>
                                        <li
                                            className={
                                                !!cloneFilterData.sortBy ===
                                                    false &&
                                                !!cloneFilterData.sortColumn ===
                                                    false
                                                    ? 'active'
                                                    : ''
                                            }
                                        >
                                            <a onClick={resetSortData}>
                                                Default Sorting
                                            </a>
                                        </li>
                                        <li
                                            className={
                                                cloneFilterData.sortColumn ===
                                                    'rating' &&
                                                cloneFilterData.sortBy === -1
                                                    ? 'active'
                                                    : ''
                                            }
                                        >
                                            <a
                                                onClick={sortHandler.bind(
                                                    this,
                                                    'rating',
                                                    -1
                                                )}
                                            >
                                                Sort by Average Rating
                                            </a>
                                        </li>
                                        <li
                                            className={
                                                cloneFilterData.sortColumn ===
                                                    'updatedAt' &&
                                                cloneFilterData.sortBy === -1
                                                    ? 'active'
                                                    : ''
                                            }
                                        >
                                            <a
                                                onClick={sortHandler.bind(
                                                    this,
                                                    'updatedAt',
                                                    -1
                                                )}
                                            >
                                                Sort by Latest
                                            </a>
                                        </li>
                                        <li
                                            className={
                                                cloneFilterData.sortColumn ===
                                                    'price' &&
                                                cloneFilterData.sortBy === 1
                                                    ? 'active'
                                                    : ''
                                            }
                                        >
                                            <a
                                                onClick={sortHandler.bind(
                                                    this,
                                                    'price',
                                                    1
                                                )}
                                            >
                                                Sort by Price: Low to High
                                            </a>
                                        </li>
                                        <li
                                            className={
                                                cloneFilterData.sortColumn ===
                                                    'price' &&
                                                cloneFilterData.sortBy === -1
                                                    ? 'active'
                                                    : ''
                                            }
                                        >
                                            <a
                                                onClick={sortHandler.bind(
                                                    this,
                                                    'price',
                                                    -1
                                                )}
                                            >
                                                Sort by Price: High to Low
                                            </a>
                                        </li>
                                        <li
                                            className={
                                                cloneFilterData.isAvaliable
                                                    ? 'active'
                                                    : ''
                                            }
                                        >
                                            <a onClick={availableHandler}>
                                                Only Stock products
                                            </a>
                                        </li>
                                    </ul>
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
            </div>
        </div>
    );
};

export default ShopData;
