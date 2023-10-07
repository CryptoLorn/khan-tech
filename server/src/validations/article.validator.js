import Joi from 'joi';

export const articleValidator = {
    create: Joi.object({
        title: Joi
            .string()
            .required()
            .messages({'string.empty': 'Title not be empty'}),
        description: Joi
            .string()
            .required()
            .messages({'string.empty': 'Description not be empty'}),
        userId: Joi
            .number()
            .integer()
            .required(),
        categoryId: Joi
            .number()
            .integer()
            .required()
    }),

    update: Joi.object({
        title: Joi
            .string()
            .optional(),
        description: Joi
            .string()
            .optional()
    })
};