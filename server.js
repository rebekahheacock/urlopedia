var express = require('express')
  , routes = require('./routes')
  , index = require('./routes/index')
  , services = require('./routes/services')
  ,  http = require('http');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', index.view);
app.get('/herdict', services.herdict);
app.get('/all', services.all);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});