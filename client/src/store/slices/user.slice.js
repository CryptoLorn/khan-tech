import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { userService } from '../../services/user.service';

const initialState = {
    user: null
};

export const getById = createAsyncThunk(
    'userSlice/getById',
    async ({id}, {rejectWithValue}) => {
        try {
            return await userService.getById(id);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
)

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {

    },
    extraReducers: builder =>
        builder
            .addCase(getById.fulfilled, (state, action) => {
                state.user = action.payload;
            })
})

const {reducer: userReducer, actions} = userSlice;
const {} = actions;

const userActions = {
    getById,
};

export {
    userReducer,
    userActions
};