import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { categoryService } from '../../services/category.service';

const initialState = {

};

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

})

const {reducer: categoryReducer, actions} = categorySlice;
const {} = actions;

const categoryActions = {
    getById,
};

export {
    categoryReducer,
    categoryActions,
};