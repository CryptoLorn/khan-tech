import { User } from './user.model.js';
import { Token } from './token.model.js';

User.hasOne(Token);
Token.belongsTo(User);