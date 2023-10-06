import { DataTypes } from 'sequelize';

import { sequelize } from '../db.js';

export const Token = sequelize.define('token', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    access_token: {type: DataTypes.STRING, allowNull: false},
    refresh_token: {type: DataTypes.STRING, allowNull: false}
});