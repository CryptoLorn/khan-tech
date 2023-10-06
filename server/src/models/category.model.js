import { DataTypes } from 'sequelize';

import { sequelize } from '../db.js';

export const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, require: true}
});