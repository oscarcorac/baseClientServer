const Joi = require('@hapi/joi')

const responses = {
	name: 'You must provide a valid name, this must not be more the 50 characters',
	age: 'You must provide a valid age between 18 and 99 years',
	country: 'You must provide a valid country',
	state: 'You must provide a valid state',
	city: 'You must provide a valid city',
}

module.exports = {
	register (req, res, next) {
		const errors = {};
		const schema = Joi.object({
			name: Joi.string().max(50).regex(/^[a-zA-Z\u00C0-\u024F .]+$/i).required(),
			age: Joi.number().min(18).max(99).required(),
			country: Joi.number().required(),
			state: Joi.number().required(),
			city: Joi.number().required()
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