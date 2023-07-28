import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PostReview } from 'src/api/PostReview';
import Avatar from 'src/assets/Avatar';
import { IError } from 'src/models/api/ErrorModel';
import { IReview } from 'src/models/api/GetProductsModel';
import { IStoreModel } from 'src/store';
import { isReviewDataValid } from 'src/utils/CacheValidators';
import {
    formatServerImagePath,
    formatServerTimestamp,
} from 'src/utils/Helpers';
import { Keys } from 'src/utils/Keys';
import { Screens } from 'src/utils/Screens';

const ReviewPane = (props: { data: IReview[] }) => {
    const { isLoading, mutateAsync } = useMutation(
        Keys.POST_REVIEW,
        PostReview
    );

    const { productId } = useParams();
    const queryClient = useQueryClient();

    const isLoggedIn = useSelector(
        (state: IStoreModel) => state.personalDetailsReducer.isLoggedIn
    );

    const token = useSelector(
        (state: IStoreModel) => state.personalDetailsReducer.token
    );

    const [activeStars, setActiveStars] = useState(0);
    const [review, setReview] = useState('');

    const changeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setReview(event.target.value);
    };

    const reviewHandler = (event: FormEvent) => {
        event.preventDefault();

        if (isLoading) return;

        if (activeStars === 0) {
            toast.warn('Please select number of stars');
            return;
        }

        if (review.trim().length < 10 || review.length > 1000) {
            toast.warn(
                'Please enter review description of atleast 10 characters long.'
            );
            return;
        }

        mutateAsync({
            data: {
                productId: productId!,
                rating: activeStars,
                review: review,
            },
            token: token!,
        })
            .then(async (res) => {
                if (res.status === 200) {
                    const data = await queryClient.getQueryData([
                        Keys.PRODUCT_DETAILS,
                        productId,
                    ]);

                    if (isReviewDataValid(data)) {
                        const findComment = data?.reviews?.findIndex(
                            (item) => item?._id === res?.data?._id
                        );

                        if (findComment !== -1) {
                            data.reviews[findComment] = res.data;
                            data.reviews[findComment].reviewDate =
                                res?.data.updatedAt;
                        } else {
                            const clone = { ...res.data };
                            clone.reviewDate = res.data.updatedAt;
                            data.reviews.push(clone);
                            data.ratedBy += 1;
                        }

                        queryClient.setQueryData(
                            [Keys.PRODUCT_DETAILS, productId],
                            data
                        );
                    }

                    setActiveStars(0);
                    setReview('');
                    toast.success(res?.message);
                    return;
                }
                throw new Error(res?.error);
            })
            .catch((err: IError) =>
                toast.error(
                    err.response?.data?.error
                        ? err.response?.data?.error
                        : 'Unable to post review right now!'
                )
            );
    };

    return (
        <div id='review-tab' className='tab-pane active'>
            <div className='review-wrapper'>
                <h2>{props?.data?.length} review for High Collar Jacket</h2>
                {props?.data?.map((item) => (
                    <div key={item?._id} className='single-review'>
                        <div className='review-img'>
                            {!!item?.reviewUser?.image ? (
                                <img
                                    src={formatServerImagePath(
                                        item?.reviewUser?.image
                                    )}
                                    alt=''
                                />
                            ) : (
                                <Avatar />
                            )}
                        </div>
                        <div className='review-content'>
                            <div className='review-top-wrap'>
                                <div className='review-name'>
                                    <h5>
                                        <span>{item?.reviewUser?.name}</span> -{' '}
                                        {formatServerTimestamp(
                                            item?.reviewDate
                                        )}
                                    </h5>
                                </div>
                                <div className='review-rating'>
                                    {Array.from(new Array(5), (_, index) => {
                                        if (index < (item?.rating ?? 0)) {
                                            return (
                                                <FontAwesomeIcon
                                                    icon={faStar}
                                                    className='yellow'
                                                    key={`${item?._id}_filled_star_${index}`}
                                                />
                                            );
                                        }
                                        return (
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                key={`${item?._id}_unfilled_star_${index}`}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                            <p>{item?.review}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='ratting-form-wrapper'>
                <span>Add a Review</span>
                <p>
                    {isLoggedIn ? (
                        <>
                            Required fields are marked <span>*</span>
                        </>
                    ) : (
                        <>
                            Please{' '}
                            <Link
                                to={Screens.LOGIN}
                                className='text-decoration-underline'
                            >
                                login
                            </Link>{' '}
                            to add a review for this product
                        </>
                    )}
                </p>
                {isLoggedIn ? (
                    <div className='ratting-form'>
                        <form onSubmit={reviewHandler}>
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <div className='star-box-wrap'>
                                        <div
                                            className={`single-ratting-star ${
                                                activeStars === 1
                                                    ? 'selected'
                                                    : ''
                                            }`}
                                            onClick={setActiveStars.bind(
                                                this,
                                                1
                                            )}
                                        >
                                            <a>
                                                <FontAwesomeIcon
                                                    icon={faStar}
                                                />
                                            </a>
                                        </div>
                                        <div
                                            className={`single-ratting-star ${
                                                activeStars === 2
                                                    ? 'selected'
                                                    : ''
                                            }`}
                                            onClick={setActiveStars.bind(
                                                this,
                                                2
                                            )}
                                        >
                                            <a>
                                                <FontAwesomeIcon
                                                    icon={faStar}
                                                />
                                            </a>
                                            <a>
                                                <FontAwesomeIcon
                                                    icon={faStar}
                                                />
                                            </a>
                                        </div>
                                        <div
                                            className={`single-ratting-star ${
                                                activeStars === 3
                                                    ? 'selected'
                                                    : ''
                                            }`}
                                            onClick={setActiveStars.bind(
                                                this,
                                                3
                                            )}
                                        >
                                            <a>
                                                <FontAwesomeIcon
                                                    icon={faStar}
                                                />
                                            </a>
                                            <a>
                                                <FontAwesomeIcon
                                                    icon={faStar}
                                                />
                                            </a>
                                            <a>
                                                <FontAwesomeIcon
                                                    icon={faStar}
                                                />
                                            </a>
                                        </div>
                                        <div
                                            className={`single-ratting-star ${
                                                activeStars === 4
                                                    ? 'selected'
                                                    : ''
                                            }`}
                                            onClick={setActiveStars.bind(
                                                this,
                                                4
                                            )}
                                        >
                                            <a>
                                                <FontAwesomeIcon
                                                    icon={faStar}
                                                />
                                            </a>
                                            <a>
                                                <FontAwesomeIcon
                                                    icon={faStar}
                                                />
                                            </a>
                                            <a>
                                                <FontAwesomeIcon
                                                    icon={faStar}
                                                />
                                            </a>
                                            <a>
                                                <FontAwesomeIcon
                                                    icon={faStar}
                                                />
                                            </a>
                                        </div>
                                        <div
                                            className={`single-ratting-star ${
                                                activeStars === 5
                                                    ? 'selected'
                                                    : ''
                                            }`}
                                            onClick={setActiveStars.bind(
                                                this,
                                                5
                                            )}
                                        >
                                            <a>
                                                <FontAwesomeIcon
                                                    icon={faStar}
                                                />
                                            </a>
                                            <a>
                                                <FontAwesomeIcon
                                                    icon={faStar}
                                                />
                                            </a>
                                            <a>
                                                <FontAwesomeIcon
                                                    icon={faStar}
                                                />
                                            </a>
                                            <a>
                                                <FontAwesomeIcon
                                                    icon={faStar}
                                                />
                                            </a>
                                            <a>
                                                <FontAwesomeIcon
                                                    icon={faStar}
                                                />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-12'>
                                    <div className='rating-form-style mb-20'>
                                        <label>
                                            Your review <span>*</span>
                                        </label>
                                        <textarea
                                            name='Your Review'
                                            value={review}
                                            onChange={changeHandler}
                                            maxLength={1000}
                                            required
                                        ></textarea>
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className='form-submit'>
                                        <button type='submit'>
                                            {isLoading ? (
                                                <div className='loader'></div>
                                            ) : (
                                                'Submit'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default ReviewPane;
