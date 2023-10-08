import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/auth.slice';
import { articleReducer } from './slices/article.slice';
import { categoryReducer } from './slices/category.slice';
import { userReducer } from './slices/user.slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        article: articleReducer,
        category: categoryReducer,
        user: userReducer
    }
});