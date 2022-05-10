const jwt = require('jsonwebtoken')

module.exports = {
    createToken: (payload) => {
        return jwt.sign(payload, "pwdpwdpwd", {
            expiresIn: '12h'
        })
    }
}