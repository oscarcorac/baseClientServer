'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
	return queryInterface.createTable('Users', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		username: {
			type: Sequelize.DataTypes.STRING,
			unique: true
		},
		email: {
			type: Sequelize.DataTypes.STRING,
			unique: true
		},
		password: Sequelize.DataTypes.STRING,
		lastName: Sequelize.DataTypes.STRING,
		firstName: Sequelize.DataTypes.STRING,
		createdAt: {
			type: Sequelize.DATE
		},
		updatedAt: {
			type: Sequelize.DATE
		}
	})
  },

  down: async (queryInterface) => {
	return queryInterface.dropTable('Users');
  }
};
