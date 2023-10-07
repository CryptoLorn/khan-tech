import React from 'react';
import { useSelector } from 'react-redux';

import './HomeMiddleBlock.css';
import clock from '../../img/clock.png';
import baseURL from '../../configs/urls';
import useFormattedDate from '../../hooks/useFormattedDate';

const HomeMiddleBlock = () => {
    const {randomArticles} = useSelector(state => state.article);
    const {category} = useSelector(state => state.category);
    const {user} = useSelector(state => state.user);
    const article = randomArticles[1];
    const formattedDate = useFormattedDate(article.createdAt);

    return (
        <div className={'home_middle_wrapper'}>
            <div className={'home_middle_img'}>
                <img src={baseURL + article.img} alt={article.title} />
            </div>

            <div className={'home_middle_info_wrapper'}>
                <div className={'home_middle_info_top'}>
                    <div className={'home_middle_info_category'}>{category?.name}</div>
                    <div className={'home_middle_info_title'}>{article.title}</div>
                    <div className={'home_middle_info_description'}>{article.description}</div>
                </div>

                <div className={'home_middle_info_bottom'}>
                    <div className={'home_middle_info_bottom_data_author_wrapper'}>
                        <div className={'home_middle_info_bottom_date'}>{formattedDate}</div>
                        <div className={'home_middle_info_bottom_author'}>{user?.full_name}</div>
                    </div>
                    <div className={'home_middle_info_bottom_time'}>
                        <img src={clock} alt={'clock'} />
                        {article.time} min read
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeMiddleBlock;