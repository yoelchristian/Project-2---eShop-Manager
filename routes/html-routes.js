var path = require("path");
var csrf = require("csurf");
var passport = require("passport");

var flash = require("connect-flash");

module.exports = function(app) {
    app.get("/index", isLoggedIn, function(req, res) {
        res.render("index", {title: "Index Page"});
    });

    app.get("/api/current-user", isLoggedIn, function(req, res) {
        delete req.user.password;
        res.send(req.user);
    })

    app.get("/private", isLoggedIn, function(req, res) {
        res.render("index", {title: "private"});
    })

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect("/login");
    };
};