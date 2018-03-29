var path = require("path");
var passport = require("passport");
var db = require("../models");
var Op = db.Sequelize.Op;

var flash = require("connect-flash");

module.exports = function(app) {
    app.get("/", isLoggedIn, function(req, res) {
        db.Product.findAll({
            where: {activeStatus: 1}
        }).then(function(result) {
            res.render("index", {title: "Index Page", products: result});
        })
        
    });

    app.get("/api/current-user", isLoggedIn, function(req, res) {
        delete req.user.password;
        res.send(req.user);
    })

    app.get("/private", isLoggedIn, function(req, res) {
        res.render("index", {title: "private"});
    })

    app.get("/products", isLoggedIn, function(req, res) {
        res.render("product", {title: "Manage Product"});
    })

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect("/login");
    };
};