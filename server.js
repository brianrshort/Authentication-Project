const express = require('express');
//const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
//const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

require('./config/passport')(passport);

const db = require('./config/keys').MongoURI;

mongoose.connect(db, {  useNewUrlParser: true })
.then(() => console.log("MongoDB connected!"))
.catch(err => console.log(err));

//app.use(expressLayouts);
//app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

//Express Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))

// //Connect flash
// app.use(flash());

// //Global variables
// app.use(() => (req, res, next) => {
//     res.locals.success_msg = req.flash("success_msg");
//     res.locals.errors.msg = req.flash('error_msg');
//     next();
// })

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//app.use("/", require('./routes/index'));
app.use("/api/users", require('./routes/users'));

const PORT = process.env.PORT || 3001; 

app.listen(PORT, console.log(`Server listening on ${PORT}`));

