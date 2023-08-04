import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { GetProfile } from 'src/api/GetProfile';
import Loader from 'src/components/common/Loader';
import Routes from 'src/routes';
import {
    cartSliceActions,
    personalDetailsSliceActions,
} from 'src/store/Actions';
import { deleteCookie, getCookie } from 'src/utils/Helpers';
import { Keys } from 'src/utils/Keys';
import { ICartItem } from './models/store/CartSliceModel';

const App = () => {
    const dispatch = useDispatch();
    const token = getCookie('access-token');

    const { isLoading } = useQuery(
        Keys.PROFILE,
        GetProfile.bind(this, token!),
        {
            enabled: !!token,
            onSuccess: (data) => {
                dispatch(
                    personalDetailsSliceActions.setCredentials({
                        token: token!,
                    })
                );
                dispatch(
                    personalDetailsSliceActions.fillProfileData({
                        data: data.data,
                    })
                );
            },
            onError: () => {
                if (!!token) {
                    deleteCookie('access-token');
                }
            },
        }
    );

    useEffect(() => {
        const cartData = localStorage.getItem('cart');

        if (!!cartData) {
            const parsedData: ICartItem[] = JSON.parse(cartData);

            if (Array.isArray(parsedData) && parsedData.length > 0) {
                dispatch(cartSliceActions.fillCart({ data: parsedData }));
            }
        }
    }, []);

    return <>{isLoading ? <Loader /> : <Routes />}</>;
};

export default App;
