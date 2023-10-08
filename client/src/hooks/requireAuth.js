import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { ADMIN } from '../constants/role.enum';

const RequireAuth = ({children}) => {
    const {user} = useSelector(state => state.auth);

    if (!user) {
        return <Navigate to={'/admin'} />
    } else if (user.role !== ADMIN) {
        return <Navigate to={'/admin'} />
    }

    return children;
};

export default RequireAuth;