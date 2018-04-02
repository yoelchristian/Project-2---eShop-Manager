var db = require("../models");
var Cart = require("../constructor/cart.js")
var Op = db.Sequelize.Op;
var flash = require("connect-flash");

module.exports = function(app) {
    app.post("/api/products", function(req, res) {
        var productData = {
            productName: req.body.productName,
            productDescription: req.body.productDescription,
            productPrice: req.body.productPrice,
            productPurchasePrice: req.body.productPurchasePrice,
            productImage: req.body.productImage,
            activeStatus: 1,
        };

        db.Product.create(productData)
    })

    app.get("/add-to-cart/:id", function(req, res) {
        var productId = req.params.id;
        var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

        db.Product.findById(productId).then(function(product) {
            cart.add(product, product.productId);
            req.session.cart = cart;
            res.redirect("/");
        })
    })

    app.post("/checkout", function(req, res) {
        var cart = req.session.cart.items;
        var cartLength = Object.keys(cart);

        for(var i = 0; i < cartLength.length; i ++) {
            var itemId = cartLength[i]
            var orderData = {
                orderedItemName: cart[itemId].item.productName,
                orderedItemQty: cart[itemId].qty,
                orderedItemPrice: cart[itemId].item.productPrice,
                orderedItemPriceTotal: cart[itemId].price,
                userUserId: req.user.userId
            }
            db.Orders.create(orderData)     
        }
        req.session.cart = null;
        res.redirect("/");         
    })

    app.get("/api/orders", function(req, res) {
        db.Orders.findAll({
            where: {userUserId: req.user.userId},
        }).then(function(result) {
            res.json(result); 
        })
    })
}