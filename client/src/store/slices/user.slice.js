import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { userService } from '../../services/user.service';

const initialState = {
    users: []
};

export const getAll = createAsyncThunk(
    'userSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            return await userService.getAll();
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
)

export const getById = createAsyncThunk(
    'userSlice/getById',
    async ({id}, {rejectWithValue}) => {
        try {
            return await userService.getById(id);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {

    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.users = action.payload;
            })

})

const {reducer: userReducer, actions} = userSlice;
const {} = actions;

const userActions = {
    getAll,
    getById,
};

export {
    userReducer,
    userActions
};