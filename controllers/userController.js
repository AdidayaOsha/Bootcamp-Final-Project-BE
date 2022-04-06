const db = require("../db");

module.exports = {
  getUsers: async (req, res) => {
    Users.sync({ alter: true });
    try {
      let users = await Users.findAll({
        include: {
          model: User_Categories,
          // showing only the name that you want to view
          attributes: ["name", "description"],
        },
      });
      res.status(200).send(users);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getUsersById: async (req, res) => {
    Users.sync({ alter: true });
    try {
      let id = req.params.id;
      let user = await Users.findOne({ where: { id: id } });
      res.status(200).send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
