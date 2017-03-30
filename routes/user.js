var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var async = require('async');

var crypto = require('crypto');
var User = require('../models/user');



module.exports = (app, passport) => {
    
    app.get('/', function(req, res){
    res.render('index', {title: 'Welcome || Rate Me'});
});
    
    
  app.get('/signup', (req, res) => {
        var errors = req.flash('error');
      console.log(errors);
        res.render('user/signup', {title: 'Sign Up || RateMe', messages: errors, hasErrors: errors.length > 0});
    });
    
    app.post('/signup', validate, passport.authenticate('local.signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }));
    
    
     app.get('/login', (req, res, next) => {
         var errors = req.flash('error');
        res.render('user/login', {title: 'Login || Reate Me', messages: errors, hasErrors: errors.length > 0});
    });
    
     app.post('/login', LoginValidate, passport.authenticate('local.login', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    }));
    
    app.get('/home', (req, res, next) => {
        res.render('home', {title: 'Home || RateMe'});
    });
    
     app.get('/forgot', (req, res) => {
        var errors = req.flash('error');
        
        var info = req.flash('info');
        
		res.render('user/forgot', {title: 'Request Password Reset', messages: errors, hasErrors: errors.length > 0, info: info, noErrors: info.length > 0});
	});
    
    
    
    
};






function LoginValidate(req, res, next){

   req.checkBody('email', 'Email is Required').notEmpty();
   req.checkBody('email', 'Email is Invalid').isEmail();
   req.checkBody('password', 'Password is Required').notEmpty();
   req.checkBody('password', 'Password Must Not Be Less Than 5').isLength({min:5});
   req.check("password", "Password Must Contain at least 1 Number.").matches(/^(?=.*\d)(?=.*[a-z])[0-9a-z]{5,}$/, "i");

   var LoginErrors = req.validationErrors();

   if(LoginErrors){
       var messages = [];
       LoginErrors.forEach((error) => {
           messages.push(error.msg);
       });

       req.flash('error', messages);
       res.redirect('/login');
   }else{
       return next();
   }
}



function validate(req, res, next){
   req.checkBody('fullname', 'Fullname is Required').notEmpty();
   req.checkBody('fullname', 'Fullname Must Not Be Less Than 5').isLength({min:5});
   req.checkBody('email', 'Email is Required').notEmpty();
   req.checkBody('email', 'Email is Invalid').isEmail();
   req.checkBody('password', 'Password is Required').notEmpty();
   req.checkBody('password', 'Password Must Not Be Less Than 5').isLength({min:5});
   req.check("password", "Password Must Contain at least 1 Number.").matches(/^(?=.*\d)(?=.*[a-z])[0-9a-z]{5,}$/, "i");

   var errors = req.validationErrors();

   if(errors){
       var messages = [];
       errors.forEach((error) => {
           messages.push(error.msg);
       });

       req.flash('error', messages);
       res.redirect('/signup');
   }else{
       return next();
   }
}