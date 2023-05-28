import { Path } from '@box-fc/frontend/domain';
import { useAuthQuery } from '@box-fc/frontend/query';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const RequireAuthRouteAdmin = () => {
    const { isLoggedIn, isAdmin } = useAuthQuery();
    const location = useLocation();

    if (isAdmin) {
        return <Outlet />;
    }

    if (isLoggedIn) {
        return <Navigate to={Path.STANDINGS} state={{ from: location }} replace />;
    }

    return <Navigate to={Path.LANDING_PAGE} state={{ from: location }} replace />;
};
