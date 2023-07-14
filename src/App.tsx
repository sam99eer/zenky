import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { GetProfile } from 'src/api/GetProfile';
import Routes from 'src/routes';
import { personalDetailsSliceActions } from 'src/store/Actions';
import { Keys } from 'src/utils/Keys';

const App = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('access-token');

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
                    localStorage.removeItem('access-token');
                }
            },
        }
    );

    return <>{isLoading ? null : <Routes />}</>;
};

export default App;
