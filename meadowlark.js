// import express
var express = require('express');
// create app
var app = express();
// static files
app.use(express.static(__dirname + '/public'));

// array of fortuine cookies
var fortunes = [
  "Conqure your fears or they will conqure you.",
  "Rivers need springs.",
  "Do not fear what you don't know",
  "You will have a pleasent surprise",
  "Whenever possible, keep it simple."
];

// set up handlebars view engine
var handelbars = require('express-handlebars')
    .create({defaultLayout: 'main'});
app.engine('handlebars', handelbars.engine);
app.set('view engine', 'handlebars');

// set the port
app.set('port', process.env.PORT || 3000);

//index page
app.get('/', function(req, res){
  res.render('home');
});
// about page
app.get('/about', function(req, res){
  // send one of the fortunes
  var randomFortune = 
      fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render('about', {fortune: randomFortune});
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