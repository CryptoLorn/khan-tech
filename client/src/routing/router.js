import { createBrowserRouter } from 'react-router-dom';

import Layout from '../layouts/Layout';
import HomePage from '../pages/HomePage/HomePage';
import AdminPage from '../pages/AdminPage/AdminPage';

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
    },
]);

export {router};