import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import './Dashboard.css';
import AdminHeader from '../AdminHeader/AdminHeader';
import { categoryActions } from '../../store/slices/category.slice';
import { userActions } from '../../store/slices/user.slice';

const Dashboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(categoryActions.getAll());
        dispatch(userActions.getAll());
    }, []);

    return (
        <div className={'dashboard_wrapper'}>
            <AdminHeader />
            <Outlet />
        </div>
    );
};

export default Dashboard;