import path from 'node:path';
import fs from 'node:fs';
import { v4 as uuidv4 } from 'uuid';

import { ApiError } from '../errors/api.error.js';
import { Article } from '../models/article.model.js';

export const articleService = {
    getAll: async (limit, page) => {
        try {
            page = page || 1;
            limit = limit || 6;
            let offset = page * limit - limit;
            let correctLimit = Number(limit);

            return await Article.findAndCountAll(
                {
                    order: [['createdAt', 'DESC']],
                    limit: correctLimit,
                    offset
                }
            );
        } catch (e) {
            throw new ApiError(e.message);
        }
    },

    create: async (article) => {
        // generate correctly unique image name
        let fileName = uuidv4() + '.jpg';
        const __dirname = path.resolve();
        article.img.mv(path.resolve(__dirname, 'src/static', fileName));

        return await Article.create({...article, img: fileName});
    },

    updateById: async (title, description, time, img, id, article) => {
        // if user send new img
        if (img) {
            // remove old img from directory static
            await articleService.removeImg(article);

            let fileName = uuidv4() + '.jpg';
            const __dirname = path.resolve();
            await img.img.mv(path.resolve(__dirname, 'src/static', fileName));

            return await Article.update({title, description, time, img: fileName}, {where: {id}});
        } else {
            return await Article.update({title, description, time}, {where: {id}});
        }
    },

    deleteById: async (id, article) => {
        // remove img from directory static
        await articleService.removeImg(article);

        return await Article.destroy({where: {id}});
    },

    getById: async (id) => {
        const article = await Article.findByPk(id);
        if (!article) {
            throw new ApiError('Not found article by id', 404);
        }

        return article;
    },

    getByTitle: async (title) => {
        return await Article.findOne({where: {title}});
    },

    removeImg: async (article) => {
        const __dirname = path.resolve();
        const fullPath = path.resolve(__dirname);
        const parsePath = path.parse(fullPath);
        const dirPath = parsePath.dir;

        const folderPath = `${dirPath}/server/src/static/`;
        const fileName = article.img;
        const filePath = path.join(folderPath, fileName);

        fs.access(filePath, fs.constants.F_OK, async (err) => {
            if (err) {
                console.error(`Файл ${fileName} відсутній в папці.`);
            } else {
                console.log(`Файл ${fileName} присутній в папці.`);
                await fs.unlink(`${dirPath}/server/src/static/${article.img}`, (err) => {
                    if (err) {
                        throw new ApiError('Path not found', 404);
                    }
                })
            }
        });
    }
};