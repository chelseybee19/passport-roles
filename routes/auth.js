"use strict";

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const passport = require("passport");

/* GET home page */
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10).then(hash => {
    return User.create({
      username: username,
      password: hash
    }).then(user => {
      res.send(user);
    });
  });
});

router.get("/login", (req, res, next) => {
  res.render("auth/login", { message: req.flash("error") });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true
  })
);

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
