module.exports = (app) => {
    
    app.get('/', function(req, res){
    res.render('index', {title: 'Welcome || Rate Me'});
});
    
    app.get('/login', (req, res, next) => {
        res.render('user/login', {title: 'Login || Reate Me'});
    });
    
    
     app.get('/signup', (req, res, next) => {
        res.render('user/signup', {title: 'SignUp || Reate Me'});
    });
    
    
};


