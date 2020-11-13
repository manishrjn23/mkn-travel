const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

const app = express();
app.use(express.static("static"));
app.use(bodyParser.json());

//Setting Up EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//body parsing
app.use(express.urlencoded({ extended: false }));


//Setting up passport
require('./config/passport')(passport);
require('./config/google-auth')(passport);

//Setting up database
const db = require("./config/keys").MongoURI;

//Connect database
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

//express session
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);
//setup passport
app.use(passport.initialize());
app.use(passport.session());

//flash
app.use(flash());

//flash messages
app.use((req, res, next) => {
  res.locals.success_message = req.flash("success_message");
  res.locals.error_message = req.flash("error_message");
  res.locals.error = req.flash("error");
  next();
});

//routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users")); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Running on port ${PORT}`));
