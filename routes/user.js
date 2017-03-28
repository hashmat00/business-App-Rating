// var passport      = require("passport");

module.exports = (app, passport) => {
    
    app.get('/', function(req, res){
    res.render('index', {title: 'Welcome || Rate Me'});
});
    
    app.get('/login', (req, res, next) => {
        res.render('user/login', {title: 'Login || Reate Me'});
    });
    
    
     app.get('/signup', (req, res, next) => {
        res.render('user/signup', {title: 'SignUp || Reate Me'});
    });
    
    app.post('/signup', passport.authenticate('local.signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }));
    
    
};


