import { authService } from '../services/auth.service.js';
import { tokenEnum } from '../constants/token.enum.js';
import { tokenService } from '../services/token.service.js';

export const authController = {
    registration: async (req, res, next) => {
        try {
            const {email, password, role} = req.body;

            const data = await authService.registration(email, role, password);

            res.cookie(
                tokenEnum.REFRESH_TOKEN,
                data.tokens.refresh_token,
                {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}
            );
            await authService.saveTokens({...data.tokens, userId: data.dataValues.id});

            return res.json({user: data.dataValues, tokens: {...data.tokens}});
        } catch (e) {
            next(e);
        }
    },

    login: async (req, res, next) => {
        try {
            const {user} = req.res.locals;

            const tokens = tokenService.generateJwt({id: user.id, email: user.email, role: user.role});

            res.cookie(
                tokenEnum.REFRESH_TOKEN,
                tokens.refresh_token,
                {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}
            );
            await authService.saveTokens({...tokens, userId: user.id});

            return res.json({user, ...tokens});
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const {refresh_token, userData} = req.res.locals;

            const user = await authService.refresh(refresh_token, userData);

            res.cookie(
                tokenEnum.REFRESH_TOKEN,
                user.refresh_token,
                {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}
            );

            return res.json(user);
        } catch (e) {
            next(e);
        }
    }
}