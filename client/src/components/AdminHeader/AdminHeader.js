import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './AdminHeader.css';
import { articleActions, setArticleForUpdate } from '../../store/slices/article.slice';
import { authActions } from '../../store/slices/auth.slice';

const AdminHeader = () => {
    const {page, article, articleForUpdate, articleForDelete} = useSelector(state => state.article);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const limit = 6;

    useEffect(() => {
        dispatch(articleActions.getAll({limit, page}));
    }, [page, article, articleForUpdate, articleForDelete]);

    const logout = async () => {
        await dispatch(authActions.logout());
        navigate('/admin');
    }

    return (
        <div className={'admin_header_wrapper'}>
            <div className={'admin_header'}>
                <div
                    className={'admin_header_btn'}
                    onClick={() => dispatch(setArticleForUpdate(null))}
                >
                    Add news
                </div>
                <div
                    className={'admin_header_btn'}
                    onClick={logout}
                >
                    Logout
                </div>
            </div>
        </div>
    );
};

export default AdminHeader;