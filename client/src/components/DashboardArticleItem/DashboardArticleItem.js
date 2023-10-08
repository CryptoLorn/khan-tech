import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import './DashboardArticleItem.css';
import clock from '../../img/clock.png';
import baseURL from '../../configs/urls';
import { categoryActions } from '../../store/slices/category.slice';
import { userActions } from '../../store/slices/user.slice';
import { articleActions, setArticleForDelete, setArticleForUpdate } from '../../store/slices/article.slice';

const DashboardArticleItem = ({article}) => {
    const {title, img, time, categoryId, userId, id} = article;
    const [user, setUser] = useState(null);
    const [category, setCategory] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(categoryActions.getById({id: categoryId}))
            .then(data => setCategory(data.payload));
        dispatch(userActions.getById({id: userId}))
            .then(data => setUser(data.payload));
    }, [categoryId, userId]);

    const articleForUpdate = (article) => {
        dispatch(setArticleForUpdate(article));
    }

    const deleteById = async (id) => {
        dispatch(setArticleForDelete(article));
        await dispatch(articleActions.deleteById({id}));
    }

    return (
        <div className={'dashboard_article_item_wrapper'}>
            <div className={'dashboard_article_item_img'}>
                <img src={baseURL + img} alt={title} />
            </div>

            <div className={'dashboard_article_item_info_wrapper'}>
                <div className={'dashboard_article_item_info_top'}>
                    <div className={'dashboard_article_item_category'}>{category?.name}</div>
                    <div className={'dashboard_article_item_title'}>{title}</div>
                </div>

                <div className={'dashboard_article_item_info_bottom'}>
                    <div className={'dashboard_article_item_info_bottom_data_author_wrapper'}>
                        <div className={'dashboard_article_item_author'}>{user?.full_name}</div>
                    </div>
                    <div className={'dashboard_article_item_time'}>
                        <img src={clock} alt={'dashboard_clock'} />
                        {time} min read
                    </div>
                </div>
                <div className={'dashboard_article_item_btn_wrapper'}>
                    <div
                        className={'dashboard_article_item_btn'}
                        onClick={() => articleForUpdate(article)}
                    >
                        Update
                    </div>
                    <div
                        className={'dashboard_article_item_btn'}
                        onClick={() => deleteById(id)}
                    >
                        Delete
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardArticleItem;