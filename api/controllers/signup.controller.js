const db = require('../../models');
const Users = db.users;

module.exports.signup = async function (req, res, next) {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).send({
                message: "Content can not be empty!"
            });
        }
        const user = {
            username: req.body.username,
            password: req.body.password,
        };

        const existedAcc = await Users.findOne({ where: { username: req.body.username } })

        if (existedAcc) {
            return res.json({ success: false, msg: 'Username already exists.' });
        } else {
            const newUser = await Users.create(user);
            res.send(newUser);
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
}