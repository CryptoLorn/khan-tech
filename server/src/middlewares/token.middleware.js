import { ApiError } from '../errors/api.error.js';
import { tokenService } from '../services/token.service.js';

export const tokenMiddleware = {
    isRefreshTokenPresent: async (req, res, next) => {
        try {
            const {refresh_token} = req.cookies;

            if (!refresh_token) {
                throw new ApiError('Unauthorized', 401);
            }

            req.res.locals = {refresh_token};
            next();
        } catch (e) {
            next(e);
        }
    },

    isDataPresentByToken: async (req, res, next) => {
        try {
            const {refresh_token} = req.res.locals;

            const userData = tokenService.validateRefreshToken(refresh_token);
            const tokenFromDb = await tokenService.findToken(refresh_token);

            if (!userData || !tokenFromDb) {
                throw new ApiError('Unauthorized', 401);
            }

            req.res.locals = {refresh_token, userData};
            next();
        } catch (e) {
            next(e);
        }
    }
}