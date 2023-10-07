import { articleService } from '../services/article.service.js';

export const articleController = {
    getAll: async (req, res, next) => {
        try {
            const articles = await articleService.getAll();

            return res.json(articles);
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const {title, description, time, userId, categoryId} = req.body;
            const {img} = req.files;

            const article = await articleService.create({
                title,
                description,
                img,
                time,
                userId,
                categoryId
            });

            return res.json(article);
        } catch (e) {
            next(e);
        }
    },

    updateById: async (req, res, next) => {
        try {
            const {id} = req.params;
            const {title, description, time} = req.body;
            const img = req.files?.img;
            const {article} = req.res.locals;

            const updatedArticle = await articleService.updateById(
                title,
                description,
                time,
                img,
                id,
                article
            );

            return res.json(updatedArticle);
        } catch (e) {
            next(e);
        }
    },

    deleteById: async (req, res, next) => {
        try {
            const {id} = req.params;
            const {article} = req.res.locals;

            await articleService.deleteById(id, article);

            return res.status(204).json({message: 'Deleted successfully'});
        } catch (e) {
            next(e);
        }
    }
};