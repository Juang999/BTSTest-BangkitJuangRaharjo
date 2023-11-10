require('dotenv').config()
let jwt = require('jsonwebtoken')

let authenticate = (req, res, next) => {
	let authHeader = req.headers['authorization']
	let token = authHeader && authHeader.split(' ')[1]

	if (!token) {
		res.status(300)
			.json({
				status: 'failed',
				message: 'unauthorize',
				error: 'unauthorize',
			})
	}

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) {
            res.status(400)
                .json({
                    code: 400,
                    status: 'failed',
                    error: err.message
                })

            return
        }

        next()
    })
}

module.exports = authenticate