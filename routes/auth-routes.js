var authController = require("../controllers/authcontroller.js");
var flash = require("connect-flash");


module.exports = function(app, passport) {
    app.get("/register", authController.register);

    app.get("/login", authController.login);

    app.post("/register", passport.authenticate("local-register", {
        successRedirect: "/index",
        failureRedirect: "/register",
        failureFlash: true,
    }));

    app.get("/logout", authController.logout);

    app.post("/login", passport.authenticate("local-login", {
        successRedirect: "/index",
        failureRedirect: "/login",
        failureFlash: true,
    }));

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect("/login");
    };
}