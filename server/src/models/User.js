module.exports = (sequelize, DataTypes) => 
	sequelize.define('User', {
		name: DataTypes.STRING,
		age: DataTypes.INTEGER,
		country: DataTypes.STRING,
		state: DataTypes.STRING,
		city: DataTypes.STRING
	})