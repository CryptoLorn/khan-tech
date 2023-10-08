import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { setPage } from '../../store/slices/article.slice';

const Page = () => {
    const {totalCount} = useSelector(state => state.article);
    const dispatch = useDispatch();

    let limit = 6;
    const pageCount = Math.ceil(totalCount / limit);
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }

    const handlePageChange = (event, page) => {
        dispatch(setPage(page));
    }

    return (
        <Stack spacing={2}>
            <Pagination
                count={pages.length}
                size={'large'}
                variant='outlined'
                color='primary'
                onChange={handlePageChange}
            />
        </Stack>
    );
};

export default Page;