import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/Header/Header';

const Layout = () => {
    return (
        <div>
            <Header />
            <Outlet />
            {/*soon*/}
            {/*<Foter />*/}
        </div>
    );
};

export default Layout;