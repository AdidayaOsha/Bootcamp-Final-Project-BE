const db = require("../db");
const bcrypt = require("bcrypt");
const Users = require("../models/Users");
const { createToken } = require("../helper/createToken");
const transporter = require("../helper/nodemailer");
const { hash } = require("bcrypt");

module.exports = {
  getUsers: async (req, res) => {
    Users.sync({ alter: true });
    try {
      let users = await Users.findAll({});
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
          id: id,
        },
      });
      res.status(200).send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  register: async (req, res) => {
    Users.sync({ alter: true });
    try {
      const { full_name, username, email, phone, password } = req.body;
      const usernameAlreadyExist = await Users.findOne({ where: { username } });
      const emailAlreadyExist = await Users.findOne({ where: { email } });
      const phoneAlreadyExist = await Users.findOne({ where: { phone } });
      if (usernameAlreadyExist) {
        throw {
          code: 500,
          message: "This Username is already being used!",
          err: null,
        };
      } else if (emailAlreadyExist) {
        throw {
          code: 500,
          message: "This Email is already being used!",
          err: null,
        };
      } else if (phoneAlreadyExist) {
        throw {
          code: 500,
          message: "This Phone Number is already being used!",
          err: null,
        };
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      let user = await Users.create({
        full_name,
        username,
        email,
        phone,
        password: hashedPassword,
      });
      let idNewUser = user.dataValues.id;
      let newUser = await Users.findOne({ where: { id: idNewUser } });

      // making token
      delete newUser.dataValues.password;
      let token = createToken(newUser.dataValues);

      // make email
      let mail = {
        from: `Admin <play.auronempire@gmail.com>`,
        to: `${newUser.dataValues.email}`,
        subject: `Account Verification for ${newUser.dataValues.full_name}`,
        html: `<a href='http://localhost:3000/authentication/${token}'>Click here to verify your Account.</a>`,
      };

      // send mail
      transporter.sendMail(mail, (errMail, resMail) => {
        if (errMail) {
          throw { code: 500, message: "Mail Failed!", err: null };
        }
      });
      res.status(200).send(user);
    } catch (err) {
      res.send(err);
    }
  },
  verification: async (req, res) => {
    Users.sync({ alter: true });
    try {
      const updateVerification = await Users.update(
        {
          is_verified: true,
          is_active: true,
        },
        {
          where: { id: req.user.id },
        }
      );
      if (updateVerification[0] == 0) {
        throw { code: 400, message: "Verification Failed!", err: null };
      }
      res
        .status(200)
        .send({ message: "Account Verification Success!", success: true });
    } catch (err) {
      res.status(err.code).send("Error Verification: " + err.message);
    }
  },
  login: async (req, res) => {
    Users.sync({ alter: true });
    try {
      const { email, password } = req.body;

      const userWithEmail = await Users.findOne({ where: { email } }).catch((err) => {
        console.log(err)
      })
      if (!userWithEmail)
        return res.json({ message: "Email or password does not match!" });
      const validPass = await bcrypt.compare(password, userWithEmail.dataValues.password)
      if (!validPass)
        return res.json({ message: "Email or password does not match!" })

      delete userWithEmail.dataValues.password;
      let token = createToken(userWithEmail.dataValues);
      res.status(200).send({ message: "Welcome back!", token, dataUser: userWithEmail.dataValues });

    } catch (err) {
      res.send(err);
    }
  },
  getDataUser: async (req, res) => {
    Users.sync({ alter: true });
    let user = await Users.findOne({
      where: {
        id: req.user.id,
      },
    });
    res.status(200).send(user)
  },
  forgotPassword: async (req, res) => {
    Users.sync({ alter: true });
    try {
      let email = req.body.email
      const emailExist = await Users.findOne({ where: { email: email } });
      if (emailExist) {

        // // making token
        delete emailExist.dataValues.password;
        let token = createToken(emailExist.dataValues);

        // // make email
        let recoverpasswordmail = {
          from: `Admin <play.auronempire@gmail.com>`,
          to: `${emailExist.dataValues.email}`,
          subject: `Account Password Recovery for ${emailExist.dataValues.full_name}`,
          html: `
          <p>Username: ${emailExist.dataValues.username}</p>
          <a href='http://localhost:3000/recoverpassword/${token}'>Click here to reset your Password.</a>
          `,
        };

        console.log(emailExist.dataValues)

        // // send mail
        transporter.sendMail(recoverpasswordmail, (errMail, resMail) => {
          if (errMail) {
            throw { code: 500, message: "Mail Failed!", err: null };
          }
        });
        res.status(200).send(user);
      } else {
        throw {
          code: 500,
          message: "Email not Found!",
          err: null,
        };
      }
    } catch (err) {
      res.send(err);
    }
  },
  recoverPassword: async (req, res) => {
    Users.sync({ alter: true });
  },
};
