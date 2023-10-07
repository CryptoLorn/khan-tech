import { tokenService } from './token.service.js';
import { roleEnum } from '../constants/role.enum.js';
import { User } from '../models/user.model.js';
import { Token } from '../models/token.model.js';
import { ApiError } from '../errors/api.error.js';

export const authService = {
    registration: async (name, email, role, password) => {
        // check that first registered user is an administrator
        const isAdmin = await User.findOne({where: {role: roleEnum.ADMIN}});
        if (isAdmin && role === roleEnum.ADMIN) {
            throw new ApiError('Failed to register', 400);
        }

        const hashPassword = await tokenService.hashPassword(password);

        let user;
        if (isAdmin) {
            user = await User.create({full_name: name, email, role, password: hashPassword});
        } else {
            user = await User.create({full_name: name, email, role: roleEnum.ADMIN, password: hashPassword});
        }

        const tokens = tokenService.generateJwt({id: user.id, email: user.email, role: user.role});

        return {...user, tokens};
    },

    refresh: async (refreshToken, userData) => {
        const user = await User.findOne({where: {id: userData.id}});

        const tokens = tokenService.generateJwt({id: user.id, email: user.email, role: user.role});
        await authService.saveTokens({...tokens, userId: user.id});

        return {user: {...user.dataValues}, tokens};
    },

    saveTokens: async (tokens) => {
        const tokensData = await Token.findOne({where: {userId: tokens.userId}});

        if (tokensData) {
            tokensData.access_token = tokens.access_token;
            tokensData.refresh_token = tokens.refresh_token;
            return tokensData.save();
        }

        return Token.create(tokens);
    }
}