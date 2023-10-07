import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './HomeTopBlock.css';
import clock from '../../img/clock.png';
import baseURL from '../../configs/urls';
import LatestNews from '../LatestNews/LatestNews';
import useFormattedDate from '../../hooks/useFormattedDate';
import { categoryActions } from '../../store/slices/category.slice';
import { userActions } from '../../store/slices/user.slice';

const HomeTopBlock = () => {
    const {randomArticles, isLoadingArticles} = useSelector(state => state.article);
    const {category, isLoadingCategory} = useSelector(state => state.category);
    const {user} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const article = randomArticles[0];
    const formattedDate = useFormattedDate(article.createdAt);

    useEffect(() => {
        if (!isLoadingCategory) {
            dispatch(categoryActions.getById({id: article.categoryId}));
            dispatch(userActions.getById({id: article.userId}));
        }
    }, [isLoadingArticles]);

    return (
        <div className={'home_top_block_wrapper'}>
            <div className={'home_top_block'}>
                <div className={'home_top_block_img'}>
                    <img src={baseURL + article.img} alt={article.title} />
                </div>

                <div className={'info_wrapper'}>
                    <div className={'info_top'}>
                        <div className={'category'}>{category?.name}</div>
                        <div className={'title'}>{article.title}</div>
                        <div className={'description'}>{article.description}</div>
                    </div>

                    <div className={'info_bottom'}>
                        <div className={'info_bottom_data_author_wrapper'}>
                            <div className={'date'}>{formattedDate}</div>
                            <div className={'author'}>{user?.full_name}</div>
                        </div>
                        <div className={'time'}>
                            <img src={clock} alt={'clock'} />
                            {article.time} min read
                        </div>
                    </div>
                </div>
            </div>

            <LatestNews />
        </div>
    );
};

export default HomeTopBlock;