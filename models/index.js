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

db.users = require("./users.model")(sequelize, Sequelize)
db.posts = require("./posts.model")(sequelize, Sequelize)
db.comments = require("./comments.model")(sequelize, Sequelize)

db.users.hasMany(db.posts);
db.posts.belongsTo(db.users, {
    foreignKey: 'userId',
    allowNull: false,
});

db.users.hasMany(db.comments);
db.comments.belongsTo(db.users, {
    foreignKey: 'userId',
    allowNull: false,

});

db.posts.hasMany(db.comments);
db.comments.belongsTo(db.posts, {
    foreignKey: 'postId',
    allowNull: false,
});

module.exports = db;