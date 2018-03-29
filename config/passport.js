var bCrypt = require("bcrypt-nodejs");
var flash = require("connect-flash");
var db = require("../models");

var Op = db.Sequelize.Op;

module.exports = function(passport, user){
var User = user;
var LocalStrategy = require("passport-local").Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.userId);
});

passport.deserializeUser(function(id, done) {
  User.findById(id).then(function(user) {
    if(user){
      done(null, user.get());
    }
    else{
      done(user.errors, null);
    }
  });
});

passport.use("local-register", new LocalStrategy(
  {           
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  },

 function(req, email, password, done){
    var generateHash = function(password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    };

    req.checkBody("firstName", "* Please fill out your first name.").notEmpty();
    req.checkBody("lastName", "* Please fill out your last name.").notEmpty();
    req.checkBody("username", "* Please fill out your username.").notEmpty();
    req.checkBody("username", "* Username must be between 4-15 characters.").len(4, 15);
    req.checkBody("email", "* Please fill out your email address.").notEmpty();
    req.checkBody("email", "* Please fill out your email address.").isEmail();
    req.checkBody("password", "* Please fill out your password.").notEmpty();
    req.checkBody("passwordMatch", "* Please re-enter your password.").notEmpty();
    req.checkBody("passwordMatch", "* Sorry, your password does not match.").equals(req.body.password);

    var errors = req.validationErrors();
    if(errors) {
      var messages = [];
      for(var i = 0; i < errors.length; i++) {
        messages.push(errors[i].msg)
      }
      return done(null, false, req.flash("error", messages));
    }

    User.findAll({
                  where: {
                      [Op.or]: [{username: req.body.username}, {email: req.body.email}]
                  }
    }).then(function(user) {
      if(user.length > 0) {
        return done(null, false, {
          message: "* Sorry, the email or username is registered to another account."
        })
      } else {
        var userPassword = generateHash(req.body.password);
              var data = {
                email: req.body.email,
                password: userPassword,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                role: "customer",
                activeStatus: true,
              };

              User.create(data).then(function(newUser, created) {
                if(!newUser) {
                  return done(null, false);
                }

                if(newUser) {
                  return done(null, newUser);
                }
              });
        }
      })      
    }
));
  
passport.use("local-login", new LocalStrategy(
  {
    usernameField : "email",
    passwordField : "password",
    passReqToCallback : true
  },

  function(req, email, password, done) {
    var User = user;

    var isValidPassword = function(userpass, password){
      return bCrypt.compareSync(password, userpass);
    }
    
    User.findAll({
                  where: {
                      [Op.or]: [{username: req.body.email}, {email: req.body.email}]
                  }
              }).then(function(user) {
                if(user.length === 0) {
                  return done(null, false, {
                    message: "* Sorry, the email or username is not found."
                  })
                }

                if(!isValidPassword(user[0].password, req.body.password)) {
                  return done(null, false, {message: "* Sorry, you entered the wrong password."})
                }

                return done(null, user[0]);

              }).catch(function(error) {
                console.log(error)
              })
  }));
}
