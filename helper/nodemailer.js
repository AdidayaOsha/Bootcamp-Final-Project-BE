const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'play.auronempire@gmail.com',
        pass: 'titoaunnfhqyxdhz'
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter