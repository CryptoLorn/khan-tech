import { DataTypes } from 'sequelize';

import { sequelize } from '../db.js';
import { roleEnum } from '../constants/role.enum.js';

export const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, trim: true, lowercase: true, unique: true, require: true},
    password: {type: DataTypes.STRING, require: true},
    role: {type: DataTypes.STRING, defaultValue: roleEnum.USER}
});