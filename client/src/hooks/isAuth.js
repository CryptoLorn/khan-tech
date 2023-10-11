import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { ADMIN } from '../constants/role.enum';

const IsAuth = ({children}) => {
    const {user} = useSelector(state => state.auth);

    if (user && user.role === ADMIN) {
        return <Navigate to={'/admin/dashboard'} />
    }

    return children;
};

export default IsAuth;