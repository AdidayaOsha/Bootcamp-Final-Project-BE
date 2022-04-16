const db = require("../db");
const Admin = require("../models/Admins")
const { createToken } = require("../helper/createToken");
const bcrypt = require("bcrypt");
const { hash } = require("bcrypt");
const transporter = require("../helper/nodemailer");

module.exports = {
    getAdmins: async (req, res) => {
        Admin.sync({ alter: true });
        try {
            let admins = await Admin.findAll({
            });
            res.status(200).send(admins);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    getAdminById: async (req, res) => {
        Admin.sync({ alter: true });
        try {
            let id = req.params.id;
            let admin = await Admin.findOne({ where: { id: id } });
            res.status(200).send(admin);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    register: async (req, res) => {
        Admin.sync({ alter: true });
        try {
            const { full_name, username, email, password } = req.body;
            const usernameAlreadyExist = await Admin.findOne({ where: { username } });
            const emailAlreadyExist = await Admin.findOne({ where: { email } });
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
            }
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            let admin = await Admin.create({
                full_name,
                username,
                email,
                password: hashedPassword,
            });
            console.log(admin)
            let idNewAdmin = admin.dataValues.id;
            let newAdmin = await Admin.findOne({ where: { id: idNewAdmin } });

            // making token
            delete newAdmin.dataValues.password;
            let token = createToken(newAdmin.dataValues);

            // make email
            let mail = {
                from: `Super Admin <play.auronempire@gmail.com>`,
                to: `${newAdmin.dataValues.email}`,
                subject: `Admin Account Verification for ${newAdmin.dataValues.full_name}`,
                html: `<a href='http://localhost:3000/adminauthentication/${token}'>Click here to verify your Account.</a>`,
            };

            // // send mail
            transporter.sendMail(mail, (errMail, resMail) => {
                if (errMail) {
                    throw { code: 500, message: "Mail Failed!", err: null };
                }
            });
            res.status(200).send(admin);
        } catch (err) {
            res.send(err);
        }
    },
    verification: async (req, res) => {
        try {
            const updateVerification = await Admin.update(
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
        Admin.sync({ alter: true });
        try {
            const { email, password } = req.body;

            const adminWithEmail = await Admin.findOne({ where: { email } }).catch((err) => {
                console.log(err)
            })

            if (!adminWithEmail)
                return res.json({ message: "Email or password does not match!" });
            if (adminWithEmail.dataValues.password !== password)
                return res.json({ message: "Email or password does not match!" })


            delete adminWithEmail.dataValues.password;
            let token = createToken(adminWithEmail.dataValues);
            console.log(token)
            console.log(adminWithEmail.dataValues)
            res.status(200).send({ message: "Welcome Admin!", token, dataAdmin: adminWithEmail.dataValues });
        } catch (err) {
            res.send(err);
        }
    },
    getDataAdmin: async (req, res) => {
        Admin.sync({ alter: true });
        console.log(req.user)
        let user = await Admin.findOne({
            where: {
                id: req.user.id,
            },
        });
        res.status(200).send(user)
    }
};
