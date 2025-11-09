import React, { use } from 'react';

import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';
import Spinner from '../Component/Spinner';

const PrvtRoutes = ({ children }) => {
    const { user, loading } = use(AuthContext);

    const location = useLocation();
    // console.log(location);

    if (loading) {
        return <Spinner></Spinner>
    }
    if (user) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace />;

};

export default PrvtRoutes;