import { createBrowserRouter } from 'react-router-dom';

import Layout from '../layouts/Layout';
import HomePage from '../pages/HomePage/HomePage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                path: '/',
                element: <HomePage />,
            },
            // {
            //     path: '/characters',
            //     element: <Characters/>,
            // }
        ]
    },
])

export {router}