const { DataTypes } = require('sequelize');

const { sequelize } = require('../configs/database');

const Admin = sequelize.define('Admin', {
    admin_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
}, {
    timestamps : false
})

module.exports = Admin;
