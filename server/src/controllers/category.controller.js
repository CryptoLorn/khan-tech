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
    }
};