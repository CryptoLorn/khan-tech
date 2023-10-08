import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import './DashboardArticleItem.css';
import clock from '../../img/clock.png';
import baseURL from '../../configs/urls';
import useFormattedDate from '../../hooks/useFormattedDate';
import { categoryActions } from '../../store/slices/category.slice';
import { userActions } from '../../store/slices/user.slice';

const DashboardArticleItem = ({article: {title, img, time, categoryId, userId, createdAt}}) => {
    const [user, setUser] = useState(null);
    const [category, setCategory] = useState(null);
    const dispatch = useDispatch();
    const formattedDate = useFormattedDate(createdAt);

    useEffect(() => {
        dispatch(categoryActions.getById({id: categoryId}))
            .then(data => setCategory(data.payload));
        dispatch(userActions.getById({id: userId}))
            .then(data => setUser(data.payload));
    }, [categoryId, userId]);

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
                    <div className={'dashboard_article_item_btn'}>Update</div>
                    <div className={'dashboard_article_item_btn'}>Delete</div>
                </div>
            </div>
        </div>
    );
};

export default DashboardArticleItem;