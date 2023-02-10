const { DataTypes } = require('sequelize');

const { sequelize } = require('../configs/database');

const Size = sequelize.define('Size', {
    size_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    size_name: DataTypes.STRING,
}, {
    timestamps : true,
    createdAt: 'created_at',
    updatedAt: false
})

module.exports = Size;
