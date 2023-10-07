import { createAsyncThunk, createSlice, isFulfilled } from '@reduxjs/toolkit';

import { categoryService } from '../../services/category.service';

const initialState = {
    category: null,
    isLoadingCategory: true,
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
)

const categorySlice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers: {

    },
    extraReducers: builder =>
        builder
            .addCase(getById.fulfilled, (state, action) => {
                state.category = action.payload;
            })
            .addMatcher(isFulfilled(), state => {
                state.isLoadingCategory = false;
            })
})

const {reducer: categoryReducer, actions} = categorySlice;
const {} = actions;

const categoryActions = {
    getById,
};

export {
    categoryReducer,
    categoryActions
};