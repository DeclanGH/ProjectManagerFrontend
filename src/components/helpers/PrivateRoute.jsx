import { Navigate, Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import {ROUTE} from "../../common/constants.js";
import LoadingSpinner from "../spinners/LoadingSpinner.jsx";

function PrivateRoute() {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <LoadingSpinner/>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to={ROUTE.HOME} />;
}

export default PrivateRoute;
