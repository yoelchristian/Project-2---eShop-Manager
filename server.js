var express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var expressValidator = require("express-validator");
var session = require("express-session");
var passport = require("passport");
var flash = require("connect-flash");
var MySQLStore = require("express-mysql-session")(session);

var PORT = process.env.PORT || 8080;
var app = express();

var options = {
    host: "localhost",
    port: 3306,
    user: "yoelchristian",
    password: "yoelyoel",
    database: "project2"
};
var sessionStore = new MySQLStore(options);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
app.use(session({
    secret: "yoelchristian", 
    resave: false, 
    store: sessionStore,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
app.use(flash());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var db = require("./models");
var authRoute = require("./routes/auth-routes.js")(app, passport);

app.use(function(req, res, next) {
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});

require("./routes/html-routes.js")(app);
require("./routes/auth-routes.js")(app, passport);
require('./config/passport.js')(passport, db.user);
// require("./routes/post-api-routes.js")(app);

db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});

