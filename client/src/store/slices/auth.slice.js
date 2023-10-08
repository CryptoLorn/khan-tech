import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { authService } from '../../services/auth.service';
import { ACCESS_TOKEN } from '../../constants/token.enum';

const initialState = {
    user: null,
    error: null
};

export const login = createAsyncThunk(
    'authSlice/login',
    async ({email, password}, {dispatch, rejectWithValue}) => {
        try {
            const data = await authService.login(email, password);

            localStorage.setItem(ACCESS_TOKEN, data.access_token);
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const isAuth = createAsyncThunk(
    'authSlice/isAuth',
    async (_, {dispatch, rejectWithValue}) => {
        try {
            const data = await authService.checkIsAuth();

            localStorage.setItem(ACCESS_TOKEN, data.tokens.access_token);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(isAuth.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(isAuth.rejected, (state, action) => {
                state.error = action.payload;
            })
})

const {reducer: authReducer, actions} = authSlice;
const {setError} = actions;

const authActions = {
    login,
    isAuth
};

export {
    authReducer,
    authActions,
    setError
};