import { authService } from '../services/auth.service.js';
import { tokenEnum } from '../constants/token.enum.js';

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
}