const { DataTypes } = require('sequelize');

const { sequelize } = require('../configs/database');

const Category = sequelize.define('Category', {
    category_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: DataTypes.STRING,
    level: { type: DataTypes.INTEGER, defaultValue: 1 },
    parent_id: { type: DataTypes.UUID, defaultValue: null },
}, {
    timestamps : true,
    createdAt: 'created_at',
    updatedAt: false
})

module.exports = Category;
