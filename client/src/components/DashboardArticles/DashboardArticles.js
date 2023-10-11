import React from 'react';
import { useSelector } from 'react-redux';

import './DashboardArticles.css';
import './media.css';
import DashboardArticleItem from '../DashboardArticleItem/DashboardArticleItem';
import Page from '../Page/Page';
import UpdateForm from '../UpdateForm/UpdateForm';
import CreateForm from '../CreateForm/CreateForm';

const DashboardArticles = () => {
    const {articles, articleForUpdate} = useSelector(state => state.article);

    return (
        <div className={'dashboard_articles_wrapper'}>
            <div className={'dashboard_articles'}>
                {articles
                    .map(article =>
                        <DashboardArticleItem
                            key={article.id}
                            article={article}
                        />
                    )}

                <div className={'page'}>
                    <Page />
                </div>
            </div>

            {articleForUpdate ?
                <UpdateForm />
                :
                <CreateForm />
            }
        </div>
    );
};

export default DashboardArticles;