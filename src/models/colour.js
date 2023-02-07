const { DataTypes } = require('sequelize');

const { sequelize } = require('../configs/database');

const Colour = sequelize.define('Colour', {
    colour_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    colour_name: DataTypes.STRING,
}, {
    timestamps : false
})

module.exports = Colour;
