const jwt = require('jsonwebtoken')

module.exports = {
    auth: (req, res, next) => {
        const token = req.header('authorization').split(" ")[1];
        jwt.verify(token, "pwdpwdpwd", (err, decode) => {
            if (err) {
                return res.status(401).send("Unauthorized! User is not Authenticated!")
            }
            req.user = decode

            next()
        })
    }
}