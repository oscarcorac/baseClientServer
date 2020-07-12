const {User} = require('../models')

const responses = {
	username: 'The username is already taken',
	email: 'The email is already taken',
}

module.exports = {
	register (req, res){
		User.create(req.body).then((response)=>{
			res.send(response.toJSON())
		}).catch((error) => {
			let errors = {}
			error.fields.map(element => {
				errors[element] = responses[element]
			});
			res.status(400).send({
				errors: {
					fields: errors
				}
			})
		})
	}
}