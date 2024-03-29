var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/User');

module.exports = function(passport) {

    passport.use('login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            // check in mongo if a user with username exists or not
            User.findOne({
                    'email': email
                },
                function(err, user) {
                    // In case of any error, return using the done method
                    if (err) return done(err);
                    
                    // Username does not exist, log the error and redirect back
                    if (!user) {
                        console.log('User Not Found with username ' + email);
                        return done(null, false, req.flash('message', 'User Not found.'));
                    }
                    // User exists but wrong password, log the error 
                    if (!user.isValidPassword(password)) {
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
                    }
                    // User and password both match, return user from done method
                    // which will be treated like success
                    return done(null, user);
                }
            );

        }));


}
