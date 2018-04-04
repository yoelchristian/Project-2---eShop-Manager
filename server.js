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

var options;
if (process.env.JAWSDB_URL) {
	options = process.env.JAWSDB_URL;
} else {
    options = {
    host: "localhost",
    port: 3306,
    user: "yoelchristian",
    password: "yoelyoel",
    database: "project2"
    };
}

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
    cookie: {maxAge: 180 * 60 * 1000}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
app.use(flash());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var db = require("./models");

app.use(function(req, res, next) {
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.session = req.session;
    var userData = req.user;
    if(userData) {
        delete userData.password;
    } ;
    res.locals.user = req.user;
    next();
});

require("./routes/html-routes.js")(app);
require("./routes/product-routes.js")(app);
require("./routes/auth-routes.js")(app, passport);
require('./config/passport.js')(passport, db.user);

db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});

