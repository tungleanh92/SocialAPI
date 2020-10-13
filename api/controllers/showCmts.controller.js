const db = require('../../models');
const Comments = db.comments;
module.exports.showCmts = async function (req, res, next) {
    try {
        if (req.body.postId !== null) {
            const existedPost = await Comments.findAll({ where: { postId: req.body.postId } })

            if (existedPost) {
                res.send(existedPost);
            }
        } else {
            res.send("Invalid postId");
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
}