import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GetProductDetails } from 'src/api/GetProductDetails';
import ProductSection from 'src/components/pages/ProductDetails/ProductSection';
import ReviewSection from 'src/components/pages/ProductDetails/ReviewSection';
import { IError } from 'src/models/api/ErrorModel';
import { Keys } from 'src/utils/Keys';
import { Screens } from 'src/utils/Screens';

const ProductData = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const { isLoading, data } = useQuery(
        [Keys.PRODUCT_DETAILS, productId],
        GetProductDetails.bind(this, productId!),
        {
            onError: (err: IError) => {
                toast.error(
                    err.response?.data?.error
                        ? err.response?.data?.error
                        : 'Unable to get product details!'
                );
                navigate(Screens.DUMMY_NOT_FOUND);
            },
        }
    );

    return (
        <>
            <ProductSection isLoading={isLoading} data={data} />
            <ReviewSection isLoading={isLoading} data={data} />
        </>
    );
};

export default ProductData;
