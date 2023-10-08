import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import './AdminPage.css';
import { isAuth } from '../../store/slices/auth.slice';

const AdminPage = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            dispatch(isAuth()).finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return 'Loading';
    }

    return (
        <div className={'admin_page_wrapper'}>
            <Outlet />
        </div>
    );
};

export default AdminPage;