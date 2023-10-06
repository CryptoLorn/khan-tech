import { User } from './user.model.js';
import { Token } from './token.model.js';
import { Article } from './article.model.js';
import { Category } from './category.model.js';

User.hasOne(Token);
Token.belongsTo(User);

User.hasMany(Article);
Article.belongsTo(User);

Category.hasMany(Article);
Article.belongsTo(Category);