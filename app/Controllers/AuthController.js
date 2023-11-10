require('dotenv').config()
const jwt = require('jsonwebtoken')
const {User} = require('../../models')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';

class AuthController {
	login = async (req, res) => {
		try {
			let user = await User.findOne({
				where: {
					username: req.body.username
				}
			})

			if (user == null) {
				res.status(300)
					.json({
						status: 'failed',
						message: 'wrong username or password!'
					})
			}

			let compareHashPassword = await bcrypt.compare(req.body.password, user['password'])
			
			if (compareHashPassword == false) {
				res.status(300)
					.json({
						status: 'failed',
						message: 'wrong username or password!'
					})
			}

			let token = await jwt.sign(user['dataValues'], process.env.ACCESS_TOKEN_SECRET)

			res.status(200)
				.json({
					status: 'success',
					data: {token},
					error: null
				})
		} catch (error) {
			res.status(400)
				.json({
					status: 'failed',
					data: null,
					error: error.message
				})

		}
	}

	register = async (req, res) => {
		try {
			let salt = await bcrypt.genSalt(10)
			let hash = await bcrypt.hash(req.body.password, salt)

			await User.create({
				email: req.body.email,
				username: req.body.username,
				password: hash
			})

			res.status(200)
				.json({
					status: 'success',
					data: 'you have registered, now go to login'
				})
		} catch (error) {
			res.status(400)
				.json({
					status: 'failed',
					data: null,
					error: error.message
				})
		}
	}
}

module.exports = new AuthController()