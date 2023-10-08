import React from 'react';
import { Outlet } from 'react-router-dom';

import './AdminPage.css';
import LoginForm from '../../components/LoginForm/LoginForm';

const AdminPage = () => {
    return (
        <div className={'admin_page_wrapper'}>
            <LoginForm />
            <Outlet />
        </div>
    );
};

export default AdminPage;