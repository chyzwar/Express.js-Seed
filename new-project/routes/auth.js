    var express = require('express');
    var router = express.Router();


    var isAuthenticated = function(req, res, next) {
        // if user is authenticated in the session, call the next() to call the next request handler 
        // Passport adds this method to request object. A middleware is allowed to add properties to
        // request and response objects
        if (req.isAuthenticated())
            return next();
        // if the user is not authenticated then redirect him to the login page
        res.redirect('/auth/login');
    }

    module.exports = function(passport) {

        /* GET login page. */
        router.get('/login', function(req, res) {
            // Display the Login page with any flash message, if any
            res.render('auth/login', {
                message: req.flash('message')
            });
        });
        /* Handle Login POST */
        router.post('/login', passport.authenticate('login', {
            successRedirect: '/home',
            failureRedirect: '/auth/login',
            failureFlash: true
        }));


        /* GET Registration Page */
        router.get('/signup', function(req, res) {
            res.render('auth/signup', {
                message: req.flash('message')
            });
        });
        /* Handle Registration POST */
        router.post('/signup', passport.authenticate('signup', {
            successRedirect: '/home',
            failureRedirect: '/auth/signup',
            failureFlash: true
        }));


        /* Handle Logout */
        router.get('/signout', function(req, res) {
            req.logout();
            res.redirect('/');
        });

        return router;
    }
