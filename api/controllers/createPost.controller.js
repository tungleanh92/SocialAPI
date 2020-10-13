const db = require('../../models');
const Posts = db.posts;
module.exports.createPost = async function (req, res, next) {
    try {
        if (!req.body.title || !req.body.content) {
            return res.status(400).send({
                message: "Content can not be empty!"
            });
        }
        const post = {
            title: req.body.title,
            content: req.body.content,
            userId: req.user.userId
        };
        const existedPost = await Posts.findOne({ where: { title: req.body.title } })

        if (existedPost) {
            return res.json({ success: false, msg: 'Post title already exists.' });
        } else {
            const newPost = await Posts.create(post);
            res.send(newPost);
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
}