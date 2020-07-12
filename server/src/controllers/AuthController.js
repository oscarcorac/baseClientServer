const {User} = require('../models')

const responses = {
	server_error: 'An internal error has occured'
}

module.exports = {
	register (req, res){
		User.create(req.body).then((response)=>{
			res.send(response.toJSON())
		}).catch((err) => {
			console.log(err);
			res.status(500).send({
				errors: {
					message: responses.server_error
				}
			})
		})
	}
}