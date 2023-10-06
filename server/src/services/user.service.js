import { User } from '../models/user.model.js';

export const userService = {
    findOneByEmail: async (email) => {
        return await User.findOne({where: {email}});
    }
};