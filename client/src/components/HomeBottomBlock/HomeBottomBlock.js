import React from 'react';
import { useSelector } from 'react-redux';

import './HomeBottomBlock.css';
import ArticleItem from '../ArticleItem/ArticleItem';
import Page from '../Page/Page';

const HomeBottomBlock = () => {
    const {articles} = useSelector(state => state.article);

    return (
        <div className={'home_bottom_wrapper'}>
            <div className={'articles_wrapper'}>
                {articles.map(article => <ArticleItem key={article.id} article={article}/>)}
            </div>

            <Page />
        </div>
    );
};

export default HomeBottomBlock;