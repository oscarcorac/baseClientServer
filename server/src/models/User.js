module.exports = (sequelize, DataTypes) => 
	sequelize.define('User', {
		username: {
			type: DataTypes.STRING,
			unique: true
		},
		email: {
			type: DataTypes.STRING,
			unique: true
		},
		password: DataTypes.STRING,
		lastName: DataTypes.STRING,
		firstName: DataTypes.STRING
	})