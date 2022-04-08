const jwt = require('jsonwebtoken')

module.exports = {
    auth: (req, res, next) => {
        jwt.verify(req.token, "pwdpwdpwd", (err, decode) => {
            if (err) {
                return res.status(401).send("Unauthorized! User is not Authenticated!")
            }
            req.user = decode

            next()
        })
    }
}