import { ApiError } from '../errors/api.error.js';
import { categoryService } from '../services/category.service.js';

export const categoryMiddleware = {
    isCategoryUnique: async (req, res, next) => {
        try {
            const {name} = req.body;

            const category = await categoryService.findByName(name);
            if (category) {
                throw new ApiError('Category is already present', 400);
            }

            req.res.locals = {name};
            next();
        } catch (e) {
            next(e);
        }
    },

    isPresentById: async (req, res, next) => {
        try {
            const {id} = req.params;

            const category = await categoryService.getById(id);
            if (!category) {
                throw new ApiError('Not found category with this id', 400);
            }

            req.res.locals = {category};
            next();
        } catch (e) {
            next(e);
        }
    }
};