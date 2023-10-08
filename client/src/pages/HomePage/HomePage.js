import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './HomePage.css';
import { articleActions } from '../../store/slices/article.slice';
import HomeTopBlock from '../../components/HomeTopBlock/HomeTopBlock';
import HomeMiddleBlock from '../../components/HomeMiddleBlock/HomeMiddleBlock';
import HomeBottomBlock from '../../components/HomeBottomBlock/HomeBottomBlock';

const HomePage = () => {
    const {isLoadingArticles, page} = useSelector(state => state.article);
    const dispatch = useDispatch();
    const limit = 6;

    useEffect(() => {
        dispatch(articleActions.getAll({limit, page}));
    }, [page]);

    return (
        <div className={'home_page_wrapper'}>
            {isLoadingArticles ?
                <div>Loading</div>
                :
                <div className={'home_page'}>
                    <HomeTopBlock />
                    <HomeMiddleBlock />
                    <HomeBottomBlock />
                </div>
            }
        </div>
    );
};

export default HomePage;