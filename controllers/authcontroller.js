var exports = module.exports = {}
var flash = require("connect-flash");

exports.register = function(req, res) {
    var messages = req.flash("error");
    res.render("register", {title: "Registration Page", messages: messages, hasErrors: messages.length > 0});
}

exports.login = function(req, res) {
    var messages = req.flash("error");
    res.render("login", {title: "Login Page", messages: messages, hasErrors: messages.length > 0});
}

exports.logout = function(req, res){
    req.logout();
    req.session.destroy();
    res.redirect('/index');
    console.log(req.user);
}