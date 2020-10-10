const sequelize = require('../../models/index').sequelize;
const Sequelize = require('../../models/index').Sequelize;
const Users = require("../../models/users.model")(sequelize, Sequelize)

module.exports.signup = async function (req, res, next) {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const user = {
        username: req.body.username,
        password: req.body.password,
    };
    const existedAcc = await Users.findOne({ where: { username: req.body.username } })

    if (existedAcc) {
        return res.json({ success: false, msg: 'Username already exists.' });
    } else {
        Users.create(user)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                return res.json(err);
            });
    }
}