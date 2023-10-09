import Joi from 'joi';

export const articleValidator = {
    create: Joi.object({
        title: Joi
            .string()
            .required()
            .messages({'string.empty': 'Title can not be empty'}),
        description: Joi
            .string()
            .required()
            .messages({'string.empty': 'Description can not be empty'}),
        time: Joi
            .number()
            .min(0)
            .required(),
    }),
    update: Joi.object({
        title: Joi
            .string()
            .optional(),
        description: Joi
            .string()
            .optional(),
        time: Joi
            .number()
            .min(0)
            .optional()
    })
};