module.exports = (sequelize, Sequelize) => {
    const Comments = sequelize.define("comments", {
        msg: {
            type: Sequelize.STRING
        },
    });

    return Comments;
};