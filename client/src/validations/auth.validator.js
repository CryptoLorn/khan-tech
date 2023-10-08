import Joi from 'joi';

import { EMAIL, PASSWORD } from '../constants/regex.const';
import { ADMIN, USER } from '../constants/role.enum';

export const authValidator = {
    registration: Joi.object({
        name: Joi
            .string()
            .required()
            .messages({'string.empty': 'Name can not be empty'}),
        email: Joi
            .string()
            .required()
            .regex(EMAIL)
            .messages({
                'string.empty': 'Email can not be empty',
                'string.pattern.base': 'Invalid email'
            }),
        password: Joi
            .string()
            .required()
            .regex(PASSWORD)
            .messages({
                'string.empty': 'Password can not be empty',
                'string.pattern.base': 'Password mus be 5-15 characters long'
            }),
        role: Joi
            .string()
            .valid(ADMIN, USER)
            .optional()
    }),
    login: Joi.object({
        email: Joi
            .string()
            .required()
            .regex(EMAIL)
            .messages({
                'string.empty': 'Email can not be empty',
                'string.pattern.base': 'Invalid email'
            }),
        password: Joi
            .string()
            .required()
            .regex(PASSWORD)
            .messages({
                'string.empty': 'Password can not be empty',
                'string.pattern.base': 'Password mus be 5-15 characters long'
            })
    })
};