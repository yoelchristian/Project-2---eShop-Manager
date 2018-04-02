var path = require("path");
var passport = require("passport");
var db = require("../models");
var Cart = require("../constructor/cart.js")
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

    app.get("/products", isLoggedIn, function(req, res) {
        res.render("product", {title: "Manage Product"});
    })

    app.get("/cart", function(req, res) {
        if(!req.session.cart) {
            return res.redirect("/");
        }
        var cart = new Cart(req.session.cart);
        res.render("cart", {title: "Shopping Cart", cartContent: cart.generateArray(), totalPrice: (cart.totalPrice).toFixed(2)});
    })

    app.get("/checkout", function(req, res) {
        var cart = new Cart(req.session.cart);
        res.render("checkout", {title: "Checkout", total: cart.totalPrice});
    })

    app.get("/orders", function(req, res) {
        res.render("orders", {title: "Orders"}); 
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect("/login");
    };
};