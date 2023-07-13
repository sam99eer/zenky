import { Navigate, Outlet } from 'react-router-dom';
import { IProtectedRoute } from 'src/models/data/ProtectedRouteModel';
import { Screens } from 'src/utils/Screens';

const ProtectedRoute = ({
    isRouteAccessible = false,
    redirectRoute = Screens.HOME,
}: IProtectedRoute): JSX.Element => {
    return isRouteAccessible ? (
        <Outlet />
    ) : (
        <Navigate to={redirectRoute} replace />
    );
};

export default ProtectedRoute;
