import { createAsyncThunk, createSlice, isFulfilled } from '@reduxjs/toolkit';

import { articleService } from '../../services/article.service';

const initialState = {
    articles: [],
    randomArticles: [],
    lastThreeArticles: [],
    page: 1,
    isLoadingArticles: true,
};

export const getAll = createAsyncThunk(
    'articleSlice/getAll',
    async ({limit, page}, {dispatch, rejectWithValue}) => {
        try {
            const articles = await articleService.getAll(limit, page);
            await dispatch(setRandomArticle(articles.rows));
            await dispatch(setLastThreeArticle(articles.rows));

            return articles.rows;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
)

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
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.articles = action.payload;
            })
            .addMatcher(isFulfilled(), state => {
                state.isLoadingArticles = false;
            })
})

const {reducer: articleReducer, actions} = articleSlice;
const {setRandomArticle, setLastThreeArticle, setPage} = actions;

const articleActions = {
    getAll,
};

export {
    articleReducer,
    articleActions,
    setRandomArticle,
    setLastThreeArticle,
    setPage
};