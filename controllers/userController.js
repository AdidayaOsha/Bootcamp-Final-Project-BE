const db = require("../db");
const bcrypt = require('bcrypt')
const Users = require("../models/Users")
const { createToken } = require("../helper/createToken")
const transporter = require('../helper/nodemailer')

module.exports = {
  getUsers: async (req, res) => {
    Users.sync({ alter: true });
    try {
      let users = await Users.findAll({
      });
      res.status(200).send(users);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getUserById: async (req, res) => {
    Users.sync({ alter: true });
    try {
      let id = req.params.id;
      let user = await Users.findOne({
        where: {
          id: id
        }
      });
      res.status(200).send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  register: async (req, res) => {
    Users.sync({ alter: true });
    try {
      const { full_name, username, email, phone, password } = req.body
      const usernameAlreadyExist = await Users.findOne({ where: { username } })
      const emailAlreadyExist = await Users.findOne({ where: { email } })
      const phoneAlreadyExist = await Users.findOne({ where: { email } })
      if (usernameAlreadyExist) {
        throw { "code": 500, "message": "This Username is already being used!", "err": null }
      } else if (emailAlreadyExist) {
        throw { "code": 500, "message": "This Email is already being used!", "err": null }
      } else if (phoneAlreadyExist) {
        throw { "code": 500, "message": "This Phone Number is already being used!", "err": null }
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      let user = await Users.create({
        full_name,
        username,
        email,
        phone,
        password: hashedPassword
      });
      let idNewUser = user.dataValues.id
      let newUser = await Users.findOne({ where: { id: idNewUser } });

      // making token
      delete newUser.dataValues.password
      let token = createToken(newUser.dataValues)

      // make email
      let mail = {
        from: `Admin <play.auronempire@gmail.com>`,
        to: `${newUser.dataValues.email}`,
        subject: `Account Verification for ${newUser.dataValues.full_name}`,
        html: `<a href='http://localhost:3000/authentication/${token}'>Click here to verify your Account.</a>`
      }

      // send mail
      transporter.sendMail(mail, (errMail, resMail) => {
        if (errMail) {
          throw { "code": 500, "message": "Mail Failed!", "err": null }
        }
      })
      res.status(200).send(user)
    } catch (err) {
      res.status(err.code).send("Error Register: " + err.message)
    }
  },
  verification: async (req, res) => {
    console.log(req.user.id)
    try {
      const updateVerification = await Users.update(
        {
          is_verified: true
        },
        {
          where: { id: req.user.id }
        })
      if (updateVerification[0] == 0) {
        throw { "code": 400, "message": "Verification Failed!", "err": null }
      }
      res.status(200).send({ message: "Account Verification Success!", success: true })
    }
    catch (err) {
      res.status(err.code).send("Error Verification: " + err.message)
    }
  },
  login: async (req, res) => {
    Users.sync({ alter: true });
  },
  delete: async (req, res) => {
    Users.sync({ alter: true });
  }
};
