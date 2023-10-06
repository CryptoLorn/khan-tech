import { ApiError } from './api.error.js';

export const handlerError = (err, req, res, next) => {
    if (err instanceof ApiError) {
        const status = err.status || 500;

        return res.status(status).json({
            message: err.message,
            status,
        });
    }
};