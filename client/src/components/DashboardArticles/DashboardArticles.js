import React from 'react';
import { useSelector } from 'react-redux';

import './DashboardArticles.css';
import DashboardArticleItem from '../DashboardArticleItem/DashboardArticleItem';
import Page from '../Page/Page';
import UpdateForm from "../UpdateForm/UpdateForm";

const DashboardArticles = () => {
    const {articles} = useSelector(state => state.article);

    return (
        <div className={'dashboard_articles_wrapper'}>
            <div className={'dashboard_articles'}>
                {articles.map(article => <DashboardArticleItem key={article.id} article={article} />)}

                <div>
                    <Page />
                </div>
            </div>

            <UpdateForm />
        </div>
    );
};

export default DashboardArticles;