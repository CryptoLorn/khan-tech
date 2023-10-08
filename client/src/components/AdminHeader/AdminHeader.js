import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './AdminHeader.css';
import { authService } from '../../services/auth.service';
import { articleActions } from '../../store/slices/article.slice';

const AdminHeader = () => {
    const navigate = useNavigate();

    const {page} = useSelector(state => state.article);
    const dispatch = useDispatch();
    const limit = 6;

    useEffect(() => {
        dispatch(articleActions.getAll({limit, page}));
    }, [page]);

    const logout = async () => {
        await authService.logout();
        navigate('/admin');
    }

    return (
        <div className={'admin_header_wrapper'}>
            <div className={'admin_header'}>
                <div className={'admin_header_btn'}>Add news</div>
                <div className={'admin_header_btn'} onClick={logout}>Logout</div>
            </div>
        </div>
    );
};

export default AdminHeader;