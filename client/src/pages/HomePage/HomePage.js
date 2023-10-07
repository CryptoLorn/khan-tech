import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './HomePage.css';
import HomeTopBlock from '../../components/HomeTopBlock/HomeTopBlock';
import { articleActions } from '../../store/slices/article.slice';

const HomePage = () => {
    const {articles} = useSelector(state => state.article);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(articleActions.getAll());
    }, []);

    return (
        <div className={'home_page_wrapper'}>
            <div className={'home_page'}>
                <HomeTopBlock />

                {/*<HomeMiddleBlock />*/}

                {/*<HomeBottomBlock />*/}
            </div>
        </div>
    );
};

export default HomePage;