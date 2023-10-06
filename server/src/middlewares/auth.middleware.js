import { ApiError } from '../errors/api.error.js';
import { authValidator } from '../validations/auth.validator.js';
import { userService } from '../services/user.service.js';

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
    }
}