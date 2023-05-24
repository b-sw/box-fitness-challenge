import { Path } from '@box-fc/frontend/domain';
import { useAuthQuery } from '@box-fc/frontend/query';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const RequireAuthRouteUser = () => {
    const { isLoggedIn } = useAuthQuery();
    const location = useLocation();

    if (isLoggedIn) {
        return <Outlet />;
    }

    console.log('isLoggedIn', isLoggedIn);

    return <Navigate to={Path.LANDING_PAGE} state={{ from: location }} replace />;
};
