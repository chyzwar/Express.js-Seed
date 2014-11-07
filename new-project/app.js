//Dependanceies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require("passport");
var session = require('express-session');
var mongoose = require('mongoose');

//Routers
var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth')(passport);

//App Initialisation
var app = express();
//DataBase connection
mongoose.connect('mongodb://localhost/lugus-storage');

//View templates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


//Middleware
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/components'));


//For Authentication
app.use(session({
    secret: 'SECRET TAK KURWA'
}));
app.use(passport.initialize());
app.use(passport.session());
var initPassport = require('./middleware/passport/init');
initPassport(passport);


// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());

//Register Routes
app.use('/auth', auth);
app.use('/', routes);
app.use('/users', users);


//Models Declaration
var User = require('./models/User');


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// Production error handler
// No stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
