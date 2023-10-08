import React from 'react';
import { useSelector } from 'react-redux';

import './HomeBottomBlock.css';
import ArticleItem from '../ArticleItem/ArticleItem';

const HomeBottomBlock = () => {
    const {articles} = useSelector(state => state.article);

    return (
        <div className={'home_bottom_wrapper'}>
            {articles.map(article => <ArticleItem key={article.id} article={article}/>)}
        </div>
    );
};

export default HomeBottomBlock;