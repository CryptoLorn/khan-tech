import React from 'react';
import { Outlet } from 'react-router-dom';

import './Dashboard.css';
import AdminHeader from "../AdminHeader/AdminHeader";

const Dashboard = () => {
    return (
        <div className={'dashboard_wrapper'}>
            <AdminHeader />
            <Outlet />
        </div>
    );
};

export default Dashboard;