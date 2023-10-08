import { createAsyncThunk, createSlice, isFulfilled } from '@reduxjs/toolkit';

import { articleService } from '../../services/article.service';

const initialState = {
    articles: [],
    randomArticles: [],
    lastThreeArticles: [],
    page: 1,
    totalCount: 0,
    isLoadingArticles: true,
    articleForUpdate: null,
    articleForDelete: null,
    error: null
};

export const getAll = createAsyncThunk(
    'articleSlice/getAll',
    async ({limit, page}, {dispatch, rejectWithValue}) => {
        try {
            const articles = await articleService.getAll(limit, page);
            await dispatch(setRandomArticle(articles.rows));
            await dispatch(setLastThreeArticle(articles.rows));
            await dispatch(setTotalCount(articles.count));

            return articles.rows;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateById = createAsyncThunk(
    'articleSlice/updateById',
    async ({id, article}, {rejectWithValue}) => {
        try {
            await articleService.updateById(id, article);

        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteById = createAsyncThunk(
    'articleSlice/deleteById',
    async ({id}, {rejectWithValue}) => {
        try {
            await articleService.deleteById(id);

        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const articleSlice = createSlice({
    name: 'articleSlice',
    initialState,
    reducers: {
        setRandomArticle: (state, action) => {
            // generate random index
            let randomIndex1 = Math.floor(Math.random() * action.payload.length);
            let randomIndex2;

            // checking if the indices are different
            do {
                randomIndex2 = Math.floor(Math.random() * action.payload.length);
            } while (randomIndex2 === randomIndex1);

            // getting random elements by their indices
            const randomElement1 = action.payload[randomIndex1];
            const randomElement2 = action.payload[randomIndex2];

            state.randomArticles.push(randomElement1, randomElement2);
        },

        setLastThreeArticle: (state, action) => {
            state.lastThreeArticles = action.payload.slice(-3);
        },

        setPage: (state, action) => {
            state.page = action.payload;
        },

        setTotalCount: (state, action) => {
            state.totalCount = action.payload;
        },

        setArticleForUpdate: (state, action) => {
            state.articleForUpdate = action.payload;
        },

        setArticleForDelete: (state, action) => {
            state.articleForDelete = action.payload;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.articles = action.payload;
            })
            .addCase(updateById.fulfilled, (state, action) => {
                state.articleForUpdate = null;
                state.error = null;
            })
            .addCase(updateById.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteById.fulfilled, (state, action) => {
                state.articleForDelete = null;
            })
            .addMatcher(isFulfilled(), state => {
                state.isLoadingArticles = false;
            })
})

const {reducer: articleReducer, actions} = articleSlice;
const {
    setRandomArticle,
    setLastThreeArticle,
    setPage,
    setTotalCount,
    setArticleForUpdate,
    setArticleForDelete
} = actions;

const articleActions = {
    getAll,
    updateById,
    deleteById
};

export {
    articleReducer,
    articleActions,
    setRandomArticle,
    setLastThreeArticle,
    setPage,
    setTotalCount,
    setArticleForUpdate,
    setArticleForDelete
};