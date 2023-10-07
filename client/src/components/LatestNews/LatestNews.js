import React from 'react';

import './LatestNews.css';
import { useSelector } from 'react-redux';
import LatestNewsItem from '../LatestNewsItem/LatestNewsItem';

const LatestNews = () => {
    const {lastThreeArticles} = useSelector(state => state.article);

    return (
        <div className={'latest_news_wrapper'}>
            <div className={'latest_news_title'}>Our Latest News</div>

            <div className={'latest_news_item'}>
                {lastThreeArticles && lastThreeArticles
                    .map(latestArticle =>
                        <LatestNewsItem
                            key={latestArticle.id}
                            latestArticle={latestArticle}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default LatestNews;