// import express
var express = require('express');
// import fortune.js
var fortune = require('./lib/fortune.js');

// create app
var app = express();
// static files
app.use(express.static(__dirname + '/public'));

// set up handlebars view engine
var handelbars = require('express-handlebars')
    .create({defaultLayout: 'main'});
app.engine('handlebars', handelbars.engine);
app.set('view engine', 'handlebars');

// set the port
app.set('port', process.env.PORT || 3000);


// testing middlewear
app.use(function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production' && 
        req.query.test === '1';
    next();
});

// routes:
//index page
app.get('/', function(req, res){
    res.render('home');
});
// about page
app.get('/about', function(req, res){
    res.render('about', {fortune: fortune.getFortune() });
});

//catch-all middlewear
// 404 error
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});
// 500 error
app.use(function(err, req, res, next){
    console.log(err.stack);
    res.status(500);
    res.render('500');
});

// start server
app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});