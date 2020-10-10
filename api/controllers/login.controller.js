const sequelize = require('../../models/index').sequelize;
const Sequelize = require('../../models/index').Sequelize;
const Users = require("../../models/users.model")(sequelize, Sequelize)
var jwt = require('jsonwebtoken');
var config = require('../../config/db.config');

module.exports.login = async function (req, res, next) {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    } else {
        const existedAcc = await Users.findOne({ where: { username: req.body.username } })
        if (existedAcc) {
            if (existedAcc.password === req.body.password) {
                const token = jwt.sign({ userId: existedAcc.id }, config.secret);
                res.json({ success: true, token: token });
            } else {
                res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
            }
        } else {
            return res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
        }
    }
}