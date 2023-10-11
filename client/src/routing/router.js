import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Layout from '../layouts/Layout';
import HomePage from '../pages/HomePage/HomePage';
import AdminPage from '../pages/AdminPage/AdminPage';
import LoginForm from '../components/LoginForm/LoginForm';
import Dashboard from '../components/Dashboard/Dashboard';
import RequireAuth from '../hooks/requireAuth';
import DashboardArticles from '../components/DashboardArticles/DashboardArticles';
import IsAuth from '../hooks/isAuth';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                path: '/',
                element: <HomePage />,
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminPage />,
        children: [
            {
                path: '/admin',
                element:
                    <IsAuth>
                        <LoginForm/>
                    </IsAuth>
            },
            {
                path: '/admin/dashboard',
                element:
                    <RequireAuth>
                        <Dashboard />
                    </RequireAuth>,
                children: [
                    {
                        path: '/admin/dashboard',
                        element: <DashboardArticles />
                    },
                ]
            }
        ]
    },
]);

export {router};