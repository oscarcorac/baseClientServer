module.exports = {
	port: 8084,
	dialect: process.env.DIALECT || 'sqlite',
	host: process.env.HOST || 'localhost',
	storage: './tabtracker.sqlite',
	db:{
		database: process.env.DB_NAME || 'tabtracker',
		user: process.env.DB_USER || 'tabtracker',
		password: process.env.DB_PASS || 'tabtracker',
		options: {
			dialect: process.env.DIALECT || 'sqlite',
			host: process.env.HOST || 'localhost',
			storage: './tabtracker.sqlite'
		}
	}
}