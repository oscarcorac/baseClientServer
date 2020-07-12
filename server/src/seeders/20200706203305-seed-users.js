'use strict';

const faker = require('faker')

module.exports = {
	up: async (queryInterface) => {
		const currentDate = new Date()
		for (let i = 0; i < 100; i++) {
			await queryInterface.bulkInsert('Users', [{
				username: faker.internet.userName(),
				email: faker.internet.email(),
				password: faker.internet.password(),
				lastName: faker.name.firstName(),
				firstName: faker.name.lastName(),
				createdAt: currentDate,
				updatedAt: currentDate
			}])
		}
	},
	down: async (queryInterface) => {
		await queryInterface.bulkDelete('Users', null, {});
	}
};
