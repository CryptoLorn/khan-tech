import { createBrowserRouter } from 'react-router-dom';

import Layout from '../layouts/Layout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        // children: [
        //     {
        //         index: true,
        //         path: '/',
        //         element: <Episodes/>,
        //     },
        //     {
        //         path: '/characters',
        //         element: <Characters/>,
        //     }
        // ]
    },
])

export {router}