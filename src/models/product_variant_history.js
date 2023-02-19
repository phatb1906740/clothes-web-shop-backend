const { DataTypes } = require('sequelize');

const { sequelize } = require('../configs/database');
const Product_Variant = require('./product_variant');

const Product_Variant_History = sequelize.define('Product_Variant_History', {
    product_variant_id: { type: DataTypes.INTEGER, primaryKey: true },
    createdAt: { type: "TIMESTAMP", defaultValue: sequelize.literal("CURRENT_TIMESTAMP"), primaryKey: true },
    price: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
    timestamps : false,
})

Product_Variant.hasMany(Product_Variant_History, {
    foreignKey: {  name: 'product_variant_id', type: DataTypes.INTEGER}
  });
  Product_Variant_History.belongsTo(Product_Variant, {
    foreignKey: {  name: 'product_variant_id', type: DataTypes.INTEGER}
  });

module.exports = Product_Variant_History;
