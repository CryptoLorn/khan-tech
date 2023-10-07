import { ApiError } from '../errors/api.error.js';
import { userService } from '../services/user.service.js';
import { tokenService } from '../services/token.service.js';

export const userMiddleware = {
    isUserPresent: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await userService.findOneByEmail(email);
            if (!user) {
                throw new ApiError('Not found user with this email', 404);
            }

            req.res.locals = {user};
            next();
        } catch (e) {
            next(e);
        }
    },

    checkRole: (role) => async (req, res, next) => {
        try {
            const {token} = req.res.locals;

            const decodeUserData = tokenService.validateAccessToken(token);

            if (decodeUserData.role !== role) {
                throw new ApiError('No access rights', 403);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresentById: async (req, res, next) => {
        try {
            const {id} = req.params;

            const user = await userService.getById(id);
            if (!user) {
                throw new ApiError('Not found user with this email', 404);
            }

            req.res.locals = {user};
            next();
        } catch (e) {
            next(e);
        }
    }
};