//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const Post = require('./Schema/postSchema')
const User = require('./Schema/userSchema')
const routes = require('./routes/home')

const homeStartingContent = "";
const aboutContent = "Welcome to FIND TUTOR here the students  can find local tutors, online teachers, and teachers to help with tutoring, coaching, assignments, academic projects, and dissertations any subjects.";
const imgUrl = "";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);



passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});


app.use('/',routes);


app.listen(3000, function () {
  console.log("Server started on port 3000");
});
