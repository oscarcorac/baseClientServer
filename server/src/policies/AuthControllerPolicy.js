const Joi = require('@hapi/joi')

const responses = {
	username: 'You must provide a valid username',
	email: 'You must provide a valid email',
	password: 'You must provide a valid password',
	lastName: 'You must provide a valid last name',
	firstName: 'You must provide a valid first name',
}

module.exports = {
	register (req, res, next) {
		const errors = {};
		const schema = Joi.object({
			username: Joi.string().required(),
			email: Joi.string().required().email(),
			password: Joi.string().required().regex(
				new RegExp('^[a-zA-Z0-9]{8,32}$')
			),
			lastName: Joi.string().required(),
			firstName: Joi.string().required()
		})
		
		const { error } = schema.validate(req.body, { abortEarly: false})
		
		if(error){
			error.details.map(element => {
				const {key} = element.context;
				errors[key] = responses[key]
				
			});
			res.status(400).send({
				errors: {
					fields: errors
				}
			})
		} else {
			next()
		}
	}
}