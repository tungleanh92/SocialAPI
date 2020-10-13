const db = require('../../models');
const Posts = db.posts;
module.exports.showPersonalPosts = async function (req, res, next) {
    try {
        const existedPost = await Posts.findAll({ where: { userId: req.user.userId } })

        if (existedPost) {
            res.send(existedPost);
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
}