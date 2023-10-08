import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { categoryService } from '../../services/category.service';

const initialState = {
    categories: []
};

export const getAll = createAsyncThunk(
    'categorySlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            return await categoryService.getAll();
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getById = createAsyncThunk(
    'categorySlice/getById',
    async ({id}, {rejectWithValue}) => {
        try {
            return await categoryService.getById(id);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const categorySlice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers: {

    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.categories = action.payload;
            })

})

const {reducer: categoryReducer, actions} = categorySlice;
const {} = actions;

const categoryActions = {
    getAll,
    getById,
};

export {
    categoryReducer,
    categoryActions,
};