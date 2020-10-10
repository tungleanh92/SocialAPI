const sequelize = require('../../models/index').sequelize;
const Sequelize = require('../../models/index').Sequelize;
const Posts = require("../../models/posts.model")(sequelize, Sequelize)

module.exports.createPost = async function (req, res, next) {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    console.log(req.user.userId);
    const post = {
        title: req.body.title,
        content: req.body.content,
        userId: req.user.userId
    };
    const existedPost = await Posts.findOne({ where: { title: req.body.title } })

    if (existedPost) {
        return res.json({ success: false, msg: 'Post title already exists.' });
    } else {
        // Posts.create(post)
        //     .then(data => {
        //         res.send(data);
        //     })
        //     .catch(err => {
        //         return res.json(err);
        //     });

        const newPost = await Posts.create(post);

        console.log(post);

        res.send(newPost);
    }
}