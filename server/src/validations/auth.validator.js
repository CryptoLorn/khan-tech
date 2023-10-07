import Joi from 'joi';

import { regexConstants } from '../constants/regex.const.js';
import { roleEnum } from '../constants/role.enum.js';

export const authValidator = {
    registration: Joi.object({
        name: Joi
            .string()
            .required()
            .messages({'string.empty': 'Name can not be empty'}),
        email: Joi
            .string()
            .required()
            .regex(regexConstants.EMAIL)
            .message('Email is not valid'),
        password: Joi
            .string()
            .required()
            .regex(regexConstants.PASSWORD)
            .message('Password must be 5-15 characters long and contain at least one capital letter and one number'),
        role: Joi
            .string()
            .valid(roleEnum.ADMIN, roleEnum.USER)
            .optional()
    }),
    login: Joi.object({
        email: Joi
            .string()
            .required()
            .regex(regexConstants.EMAIL)
            .message('Email is not valid'),
        password: Joi
            .string()
            .required()
            .regex(regexConstants.PASSWORD)
            .message('Password must be 5-15 characters long and contain at least one capital letter and one number')
    })
};