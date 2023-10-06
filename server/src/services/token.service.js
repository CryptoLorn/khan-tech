import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { configs } from '../configs/config.js';
import { ApiError } from '../errors/api.error.js';
import { Token } from '../models/token.model.js';

export const tokenService = {
    hashPassword: async (password) => await bcrypt.hash(password, 10),

    comparePassword: async (password, hashPassword) => {
        const isPasswordSame = await bcrypt.compare(password, hashPassword);

        if (!isPasswordSame) {
            throw new ApiError('Invalid email or password', 400);
        }
    },

    generateJwt: (payload = {}) => {
        const access_token = jwt.sign(payload, configs.ACCESS_KEY_SECRET, {expiresIn: '24h'});
        const refresh_token = jwt.sign(payload, configs.REFRESH_KEY_SECRET, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        }
    },

    validateRefreshToken: (refreshToken) => {
        try {
            return jwt.verify(refreshToken, configs.REFRESH_KEY_SECRET);
        } catch (e) {
            throw new ApiError('Token not valid');
        }
    },

    findToken: async (refreshToken) => {
        return await Token.findOne({where: {refresh_token: refreshToken}});
    },

    removeToken: async (refreshToken) => {
        return await Token.destroy({where: {refresh_token: refreshToken}});
    }
}