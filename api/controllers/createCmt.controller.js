const db = require('../../models');
const Comments = db.comments;
const Posts = db.posts;
module.exports.createComment = async function (req, res, next) {
    try {
        if (!req.body.msg) {
            return res.status(400).send({
                message: "Content can not be empty!"
            });
        }
        if (!req.body.postId) {
            return res.status(400).send({
                message: "postId required!"
            });
        }
        const existedPost = await Posts.findOne({ where: { id: req.body.postId } })
        if (!existedPost) {
            return res.status(400).send({
                message: "postId not exist!"
            });
        }
        const cmt = {
            msg: req.body.msg,
            postId: parseInt(req.body.postId),
            userId: req.user.userId
        };
        const newCmt = await Comments.create(cmt);
        res.send(newCmt);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}