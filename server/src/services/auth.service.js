import { tokenService } from './token.service.js';
import { roleEnum } from '../constants/role.enum.js';
import { User } from '../models/user.model.js';
import { Token } from '../models/token.model.js';

export const authService = {
    registration: async (email, role, password) => {
        // check that first registered user is an administrator
        const isAdmin = await User.findOne({where: {role: roleEnum.ADMIN}});
        if (isAdmin && role === roleEnum.ADMIN) {
            throw ApiError.internal('Failed to register');
        }

        const hashPassword = await tokenService.hashPassword(password);

        let user;
        if (isAdmin) {
            user = await User.create({email, role, password: hashPassword});
        } else {
            user = await User.create({email, role: roleEnum.ADMIN, password: hashPassword});
        }

        const tokens = tokenService.generateJwt({id: user.id, email: user.email, role: user.role});

        return {...user, tokens};
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