const db = require("../db");
const Admin = require("../models/Admins")

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

            res.status(200).send({ message: "Welcome Admin!" });
        } catch (err) {
            res.send(err);
        }
    }
};
