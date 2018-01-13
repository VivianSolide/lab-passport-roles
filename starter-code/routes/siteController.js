const express = require("express");
const siteController = express.Router();
const User = require("../models/user");
const passport = require("passport");

var checkBoss = checkRoles('Boss');
var checkDeveloper = checkRoles('Developer');
var checkTA = checkRoles('TA');

function checkRoles(role) {
  return function (req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/login')
    }
  }
}

siteController.get("/", (req, res, next) => {
  res.render("index");
});

siteController.get('/login', (req, res, next) => {
  res.render('passport/login', { "message": req.flash("error") });
});

siteController.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

module.exports = siteController;
