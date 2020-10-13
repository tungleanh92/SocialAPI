const express = require("express");
const bodyParser = require("body-parser");
const passport = require('passport');
const app = express();
const logger = require('morgan');
const cors = require('cors');
const db = require("./models/index");

db.sequelize.sync().then(() => {
    console.log("Drop and re-sync db.");
});
var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
// simple route
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
const apiLogin = require('./api/routes/login.route')
const apiSignup = require('./api/routes/signup.route')
const apiCreateCmt = require('./api/routes/createCmt.route')
const apiCreatePost = require('./api/routes/createPost.route')
const apiShowCmts = require('./api/routes/showCmts.route')
const apiShowPersonalPosts = require('./api/routes/showPersonalPosts.route')
const apiShowPosts = require('./api/routes/showPosts.route')

const authToken = require('./middlewares/auth.middleware');

app.use('/api/signup', apiSignup);
app.use('/api/login', apiLogin);
app.use('/api/createCmt', authToken.checkToken, authToken.protectedRoute, apiCreateCmt);
app.use('/api/createPost', authToken.checkToken, authToken.protectedRoute, apiCreatePost);
app.use('/api/showPersonalPosts', authToken.checkToken, authToken.protectedRoute, apiShowPersonalPosts);
app.use('/api/showPosts', apiShowPosts);
app.use('/api/showCmts', apiShowCmts);