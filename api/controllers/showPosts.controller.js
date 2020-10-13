const db = require('../../models');
const Posts = db.posts;
module.exports.showPosts = async function (req, res, next) {
    try {
        res.send(await Posts.findAll());

    } catch (error) {
        return res.status(500).json(error.message);
    }
}