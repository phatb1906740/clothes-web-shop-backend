const { DataTypes } = require('sequelize');

const { sequelize } = require('../configs/database');
const User = require('./user');
const Product_Variant = require('./product_variant');

const Feedback = sequelize.define('Feedback', {
	user_id: { type: DataTypes.UUID, primaryKey: true },
	product_variant_id: { type: DataTypes.INTEGER, primaryKey: true },
	rate: { type: DataTypes.INTEGER, allowNull: false },
	content: { type: DataTypes.TEXT, defaultValue: "" },
}, {
	timestamps: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at',
})

User.belongsToMany(Feedback, {
	through: Feedback,
	foreignKey: 'user_id',
	otherKey: 'product_variant_id'
});
Product_Variant.belongsToMany(User, {
	through: Feedback,
	foreignKey: 'product_variant_id',
	otherKey: 'user_id'
});

User.hasMany(Feedback, {
	foreignKey: { name: 'user_id', type: DataTypes.UUID }
});
Feedback.belongsTo(User, {
	foreignKey: { name: 'user_id', type: DataTypes.UUID }
});

Product_Variant.hasMany(Feedback, {
	foreignKey: { name: 'product_variant_id', type: DataTypes.INTEGER }
});
Feedback.belongsTo(Product_Variant, {
	foreignKey: { name: 'product_variant_id', type: DataTypes.INTEGER }
});

module.exports = Feedback;
