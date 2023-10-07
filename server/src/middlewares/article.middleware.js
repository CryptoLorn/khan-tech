import { ApiError } from '../errors/api.error.js';
import { articleService } from '../services/article.service.js';
import { articleValidator } from '../validations/article.validator.js';

export const articleMiddleware = {
    isBodyCreateValid: async (req, res, next) => {
        try {
            const validate = await articleValidator.create.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsImg: async (req, res, next) => {
        try {
            const img = req.files?.img;

            if (!img) {
                throw new ApiError('Not found img', 404);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isBodyUpdateValid: async (req, res, next) => {
        try {
            const validate = await articleValidator.update.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isTitleUnique: async (req, res, next) => {
        try {
            const {title} = req.body;

            const article = await articleService.getByTitle(title);
            if (article) {
                throw new ApiError('Article with this title is already present', 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsPresentById: async (req ,res, next) => {
        try {
            const {id} = req.params;

            const article = await articleService.getById(id);

            req.res.locals = {article}
            next();
        } catch (e) {
            next(e);
        }
    }
};