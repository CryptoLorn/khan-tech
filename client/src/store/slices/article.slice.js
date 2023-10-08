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
    async ({id, article}, {dispatch, rejectWithValue}) => {
        try {
            const {articles} = await articleService.updateById(id, article);
            console.log(articles)

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
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.articles = action.payload;
            })
            .addCase(updateById.fulfilled, (state, action) => {
                state.articleForUpdate = null;
                // const index = state.articles.findIndex(sneaker => sneaker.id === action.payload.article.id);
                // state.articles[index] = action.payload.article;
            })
            .addCase(updateById.rejected, (state, action) => {
                state.error = action.payload;
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
    setArticleForUpdate
} = actions;

const articleActions = {
    getAll,
    updateById
};

export {
    articleReducer,
    articleActions,
    setRandomArticle,
    setLastThreeArticle,
    setPage,
    setTotalCount,
    setArticleForUpdate
};