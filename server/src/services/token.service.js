import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { configs } from '../configs/config.js';

export const tokenService = {
    hashPassword: async (password) => await bcrypt.hash(password, 10),

    comparePassword: async (password, hashPassword) => {
        const isPasswordSame = await bcrypt.compare(password, hashPassword);

        if (!isPasswordSame) {
            throw ApiError.internal('Invalid email or password');
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
}