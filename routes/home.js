//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const Post = require('../Schema/postSchema')
const User = require('../Schema/userSchema')
const Review = require('../Schema/reviewSchema')
const router=express.Router();
router.get("/", function (req, res) {
    if (req.isAuthenticated()) {
      Review.find({}, function (err, posts) {
        res.render("home", { currentUser: userName, posts: posts });
      });
    } else {
        // res.send("hii");
      res.redirect("/login");
    }
});
router.get("/maths", function (req, res) {
    if (req.isAuthenticated()) {
      Post.find({ subject: "Maths" }, function (err, posts) {
        res.render("maths", {
          posts: posts,
        });
      });
    } else {
      res.redirect("/login");
    }
  });
  
  router.get("/physics", function (req, res) {
    if (req.isAuthenticated()) {
      Post.find({ subject: "Physics" }, function (err, posts) {
        res.render("physics", {
          posts: posts,
        });
      });
    } else {
      res.redirect("/login");
    }
  });
  
  router.get("/chemistry", function (req, res) {
    if (req.isAuthenticated()) {
      Post.find({ subject: "Chemistry" }, function (err, posts) {
        res.render("chemistry", {
          posts: posts,
        });
      });
    } else {
        // res.send("hii");
      res.redirect("/login");
    }
  });
  
  router.get("/biology", function (req, res) {
    if (req.isAuthenticated()) {
      Post.find({ subject: "Biology" }, function (err, posts) {
        res.render("biology", {
          posts: posts,
        });
      });
    } else {
      res.redirect("/login");
    }
  });

  router.delete("/delete",function(req,res){
    Review.deleteOne({
      name: "Tanmi",
    })
      .then(function () {
        console.log("Data deleted"); // Success
      })
      .catch(function (error) {
        console.log(error); // Failure
      });
      res.send("Data Deleted");
    })
    
    router.get("/register", function (req, res) {
      res.render("register");
    });
    
    router.post("/register", function (req, res) {
      User.register(
        { username: req.body.username },
        req.body.password,
        function (err, user) {
          if (err) {
            console.log(err);
            res.redirect("/register");
          } else {
            userName = req.body.username;
            console.log(userName);
            passport.authenticate("local")(req, res, function () {
              res.redirect("/");
            });
          }
        }
      );
    });
    
    router.get("/login", function (req, res) {
      res.render("login");
    });
    
    router.post("/login", function (req, res) {
      const user = new User({
        email: req.body.username,
        password: req.body.password,
      });
      req.login(user, function (err) {
        if (err) {
          console.log(err);
          res.redirect("/login");
        } else {
          userName = req.body.username;
          console.log(userName);
          passport.authenticate("local")(req, res, function () {
            res.redirect("/");
          });
        }
      });
    });
    
    router.get("/logout", (req, res) => {
      req.logout(req.user, (err) => {
        if (err) return next(err);
        res.redirect("/");
      });
    });
  
    router.get("/compose", function (req, res) {
      if (req.isAuthenticated()) {
        res.render("compose");
      } else {
        res.redirect("/login");
      }
    });
    
    router.post("/compose", function (req, res) {
      var subject = req.body.postSubject;
    
      const post = new Post({
        name: req.body.postName,
        subject: req.body.postSubject,
        email: req.body.postEmail,
        fee: req.body.postFee,
        difficulty: req.body.postDifficulty,
        content: req.body.postBody,
      });
      post.save(function (err) {
        if (!err) {
          res.redirect("/" + subject);
        }
      });
    });
    
    router.get("/posts/:postId", function (req, res) {
      const requestedPostId = req.params.postId;
    
      Post.findOne({ _id: requestedPostId }, function (err, post) {
        res.render("post", {
          name: post.name,
          email: post.email,
          fee: post.fee,
          difficulty: post.difficulty,
          subject: post.subject,
          content: post.content,
        });
      });
    });
    
    router.get("/review", function (req, res) {
      res.render("reviews");
    });
    
    router.post("/review", function (req, res) {
      console.log(req.body.con);
      const post = new Review({
        name: req.body.name,
        image: req.body.image,
        con: req.body.con,
      });
      post.save(function (err) {
        if (!err) {
          res.redirect("/");
        }
      });
    });
    
    
module.exports = router;    
    

