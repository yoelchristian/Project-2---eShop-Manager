var path = require("path");
var csrf = require("csurf");
var passport = require("passport");

var flash = require("connect-flash");


module.exports = function(app) {
    app.get("/index", isLoggedIn, function(req, res) {
        console.log(req.user)
        res.render("index", {title: "Index Page", user: req.user});
    });

    app.get("/asd", isLoggedIn, function(req, res) {
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