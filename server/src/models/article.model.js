import { DataTypes } from 'sequelize';

import { sequelize } from '../db.js';

export const Article = sequelize.define('article', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, unique: true, require: true},
    description: {type: DataTypes.TEXT, require: true},
    img: {type: DataTypes.STRING, require: true},
    time: {type: DataTypes.INTEGER, require: true}
});