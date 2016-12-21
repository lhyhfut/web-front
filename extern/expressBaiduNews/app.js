var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var jumanji = require('jumanji');
var session = require('express-session');
var routes = require('./routes/index');
var users = require('./routes/users');
var bgManager = require('./routes/bgManager');
var frontNews = require('./routes/frontNews');

var app = express();
//app.use(jumanji);
//app.disable('etag');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  cookie: { maxAge: 60000 }, //1min   1000*60
  resave: false,
  saveUninitialized: true
}));
//将静态文件目录设置为public文件夹
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);
//app.use('/', bgManager); //一个路径可以有多个handler,那多条路径共用1个handler是否可以呢
app.use('/bgManager',bgManager);  //在3000端口监听到发往/bgManager的请求的时候,进入到./routes/bgManager.js这个路由文件中
//app.use('/frontNews',frontNews);
app.use('/',frontNews);
//app.use(express.static(path.join(__dirname, 'public')));

// node app.js
var server = app.listen(3000,function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log("app listening at http://%s:%s",host,port);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
