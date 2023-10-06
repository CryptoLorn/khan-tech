import { ApiError } from '../errors/api.error.js';
import { authValidator } from '../validations/auth.validator.js';
import { userService } from '../services/user.service.js';
import { tokenService } from '../services/token.service.js';

export const authMiddleware = {
    isBodyForRegistrationValid: async (req, res, next) => {
        try {
            const validate = await authValidator.registration.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isBodyForLoginValid: async (req, res, next) => {
        try {
            const validate = await authValidator.login.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isEmailUnique: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userByEmail = await userService.findOneByEmail(email);

            if (userByEmail) {
                throw new ApiError('User with this email is already exist', 409);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isPasswordMatch: async (req, res, next) => {
        try {
            const {password} = req.body;
            const {user} = req.res.locals;

            await tokenService.comparePassword(password, user.password);

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsAuth: async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                throw new ApiError('Unauthorized', 401);
            }

            const userData = tokenService.validateAccessToken(token);
            if (!userData) {
                throw new ApiError('Unauthorized', 401);
            }

            req.res.locals = {userData, token};
            next();
        } catch (e) {
            next(e);
        }
    }
};