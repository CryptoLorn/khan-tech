import { Category } from '../models/category.model.js';

export const categoryService = {
    create: async (name) => {
        return await Category.create({name});
    },

    findByName: async (name) => {
        return await Category.findOne({where: {name}});
    },

    getById: async (id) => {
        return await Category.findByPk(id);
    }
};