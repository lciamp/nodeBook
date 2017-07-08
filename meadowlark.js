// import express
var express = require('express');
// import fortune.js
var fortune = require('./lib/fortune.js');

// create app
var app = express();
// static files
/*jslint nomen: true*/
app.use(express.static(__dirname + '/public'));
/*jslint nomen: false*/

// set up handlebars view engine
var handlebars = require('express-handlebars').create({
    defaultLayout: 'main',
    helpers: {
        section: function (name, options) {
            "use strict";
            /*jslint nomen: true */
            if (!this._sections) {
                this._sections = {};
            }
            this._sections[name] = options.fn(this);
            /*jslint nomen: false */
            return null;
        }
    }
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// set the port
app.set('port', process.env.PORT || 3000);


// testing middlewear - shows test with query string '?test=1'
app.use(function (req, res, next){
    res.locals.showTests = app.get('env') !== 'production' && 
        req.query.test === '1';
    next();
});

// disable header system information
app.disable('x-powered-by');

// routes:
//index page
app.get('/', function (req, res){
    res.render('home');
});
// about page with test
app.get('/about', function (req, res){
    res.render('about', {
        fortune: fortune.getFortune(),
        // tells which tests.js should be ran on this route
        pageTestScript: "/qa/tests-about.js"
    } );
});
// request headers 
app.get('/headers', function(req, res){
    res.set('Content-Type', 'text/plain');
    var s = '';
    for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
    s += req.ip;
    res.send(s);
});

//catch-all middlewear
// 404 error
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});
// 500 error
app.use(function(err, req, res, next){
    "use strict";
    console.log(err.stack);
    res.status(500);
    res.render('500');
});

// start server
app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
}); 