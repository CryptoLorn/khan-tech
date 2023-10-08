import { User } from '../models/user.model.js';

export const userService = {
    findOneByEmail: async (email) => {
        return await User.findOne({where: {email}});
    },

    getById: async (id) => {
        return await User.findByPk(id);
    },

    getAll: async () => {
        return await User.findAll();
    }
};