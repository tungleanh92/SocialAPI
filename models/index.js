const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const Users = require("./users.model")(sequelize, Sequelize)
const Posts = require("./posts.model")(sequelize, Sequelize)
const Comments = require("./comments.model")(sequelize, Sequelize)
Users.hasMany(Posts, { as: "posts" });
Posts.belongsTo(Users, {
    foreignKey: 'userId',
    allowNull: false,
});

Users.hasMany(Comments, { as: "comments" });
Comments.belongsTo(Users, {
    foreignKey: 'userId',
    allowNull: false,

});

Posts.hasMany(Comments, { as: "comments" });
Comments.belongsTo(Posts, {
    foreignKey: 'postId',
    allowNull: false,
    as: "post"
});
Users.sync();
Posts.sync();
Comments.sync();

module.exports = db;