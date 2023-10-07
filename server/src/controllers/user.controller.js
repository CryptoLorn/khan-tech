export const userController = {
    getById: async (req, res, next) => {
        try {
            const {user} = req.res.locals;

            return res.json(user);
        } catch (e) {
            next(e);
        }
    }
};