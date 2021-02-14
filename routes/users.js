const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const cors = require('cors');
// router.get('/login', (req, res) => res.render('login.html'));

// router.get('/register', (req, res) => res.render('login.html'));

//Register handles
router.post('/register', cors(), (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];
    if( !name || !email || !password || !password2 ) {
        errors.push({ msg: "Please fill in all fields"});
        console.log(errors);
    }
    if (password !== password2) {
        errors.push({ msg: "Passwords do not match" });
        console.log(errors);
    }
    if (password.length < 6) {
        errors.push({ msg: "Password must be 6+ characters long"});
        console.log(errors);
    }

    if (errors.length > 0) {
        res.render('register', {
            errors, 
            name,
            email,
            password,
            password2
        })
    } else {
        User.findOne({ email: email })
        .then(user => {
            if(user) {
                errors.push({ msg: 'Email is already registered' });
                console.log(errors);
                res.render('register', {
                    errors, 
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                })
                //Hash password
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) {
                        throw(err);
                    };
                    newUser.password = hash;
                    newUser.save()
                    .then(user => {
                        //req.flash('success_msg', "You are now registered, and can log in!");
                        console.log("Successfully registered");
                        res.redirect('/users/login');
                    })
                    .catch(err => console.log(err));
                }))
                
            }
        });
    }
})

//Login handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        // failureFlash: true
    })(req, res, next);
});

//Logout handle
router.get('/logout', (req, res) => {
    req.logout();
    console.log("Logged out!");
    res.redirect('/users/login');
});

module.exports = router;