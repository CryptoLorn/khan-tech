import React from 'react';

import './LatestNewsItem.css';
import baseURL from '../../configs/urls';
import useFormattedDate from '../../hooks/useFormattedDate';

const LatestNewsItem = ({latestArticle: {title, img, createdAt}}) => {
    const formattedDate = useFormattedDate(createdAt);

    return (
        <div className={'latest_news_item_wrapper'}>
            <div className={'latest_news_item_img'}>
                <div className={'latest_news_item_info'}>
                    <div className={'latest_news_item_title'}>{title}</div>
                    <div className={'latest_news_item_date'}>{formattedDate}</div>
                </div>
                <img src={baseURL + img} alt={'background'}/>
            </div>
        </div>
    );
};

export default LatestNewsItem;