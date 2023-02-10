const { DataTypes } = require('sequelize');

const { sequelize } = require('../configs/database');

const Colour = sequelize.define('Colour', {
    colour_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    colour_name: DataTypes.STRING,
}, {
    timestamps : true,
    createdAt: 'created_at',
    updatedAt: false
})

module.exports = Colour;
