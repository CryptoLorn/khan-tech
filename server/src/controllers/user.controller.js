import {userService} from "../services/user.service.js";

export const userController = {
    getById: async (req, res, next) => {
        try {
            const {user} = req.res.locals;

            return res.json(user);
        } catch (e) {
            next(e);
        }
    },

    getAll: async (req, res, next) => {
        try {
            const users = await userService.getAll();

            return res.json(users);
        } catch (e) {
            next(e);
        }
    }
};