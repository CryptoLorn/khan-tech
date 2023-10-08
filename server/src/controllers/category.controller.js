import { categoryService } from '../services/category.service.js';

export const categoryController = {
    create: async (req, res, next) => {
        try {
            const {name} = req.res.locals;

            const newCategory = await categoryService.create(name);

            return res.json(newCategory);
        } catch (e) {
            next(e);
        }
    },

    getById: async (req, res, next) => {
        try {
            const {category} = req.res.locals;

            return res.json(category);
        } catch (e) {
            next(e);
        }
    },

    getAll: async (req, res, next) => {
        try {
            const categories = await categoryService.getAll();

            return res.json(categories);
        } catch (e) {
            next(e);
        }
    }
};