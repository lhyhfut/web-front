var express = require('express');
var router = express.Router();
//var app = express();
var htmlencoder = require('htmlencode');
var sanitizeHtml = require('sanitize-html');
var csrf = require('csurf');
//var config = require('../config/config');   //这里面不是路由,是资源,要写对路径
//var config = require('/config/config');
var config = require('../public/config/config');
var bodyParser = require('body-parser');
// setup route middlewares
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });
//新闻内容的处理, html白名单
var whitelist = {
  allowedTags: ['h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
    'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
    'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre',
    'img', 'font' , 'strike' , 'span', 'u'],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    p: ['style'],
    img: ['src'],
    font: ['size','face'],
    span: ['style']
  },
  selfClosing: ['img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta'],
  allowedSchemes: ['data','http', 'https', 'ftp', 'mailto'],
  allowedSchemesByTag: {}
};

//请求进入后台界面,防止csrf漏洞,向bgManager.ejs中插值
router.get('/',checkLogin, csrfProtection,function(req, res, next) {
//router.get('/', csrfProtection,function(req, res, next) {
  console.log(6);
  /*res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);*/
  res.render('bgManager', { csrfToken: req.csrfToken() });
});
router.post('/',checkLogin, csrfProtection,function(req, res, next) {
  //res.redirect('/bgManager');
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);
  res.render('bgManager', { csrfToken: req.csrfToken() });
  //res.redirect('/bgManager');
});
/*router.post('/',checkLogin,function(req, res, next) {
  res.redirect('/bgManager');
});*/
router.get('/login',csrfProtection,function(req,res){
  res.render('login',{ csrfToken: req.csrfToken() });
});
/*router.post('/login',function(req,res){
  console.log(4);
  //console.log(req.body);
  //console.log(req.body.username);
  res.redirect('/bgManager');
  //res.redirect('/');
  //res.location('/');
  //res.location('/bgManager.ejs');
  //res.location('127.0.0.1:3000/bgManager');
  //res.redirect('127.0.0.1:3000/bgManager');
  //res.statusCode = 200;
  //res.statusCode = 302;
  //res.render('bgManager',{csrfToken: req.csrfToken()});
  console.log(5);
});*/
router.post('/logout',function(req,res,next){
  if(req.session.username){
    req.session.username = ''; //清空
  }
  res.redirect('/bgManager/login');
  //res.render('login',{csrfToken: req.csrfToken()});
  //res.render('login');  //csrfToken is not defined
});
/*router.post('/logout',csrfProtection,function(req,res,next){
  if(req.session.username){
    req.session.username = ''; //清空
  }
  res.render('login',{csrfToken: req.csrfToken()});//ForbiddenError: invalid csrf token
});*/
//添加数据
function addData(req,res,next){
 /* if(req.method == 'OPTIONS'){
    res.send(200);
  }else
  {
    next();
  }*/
  /*本地文件内部的封装*/
  // createNews()放在connection()调用外面,把函数定义和执行分开
  function createNews(tableObj){
    tableObj.create({
      title: htmlencoder.htmlEncode(req.body.title),
      newsContent : sanitizeHtml(req.body.newsContent,whitelist),
      newsLink : htmlencoder.htmlEncode(req.body.newsLink),
      imgSrc0 : htmlencoder.htmlEncode(req.body.imgSrc0),
      imgSrc1 : htmlencoder.htmlEncode(req.body.imgSrc1),
      imgSrc2 : htmlencoder.htmlEncode(req.body.imgSrc2),
      srcNet : htmlencoder.htmlEncode(req.body.srcNet),
      srcTime : htmlencoder.htmlEncode(req.body.srcTime),
      srcIcon0 : htmlencoder.htmlEncode(req.body.srcIcon0)
    }, function (err, news) {
      console.log(news);
      //res.charSet('utf-8');
      res.status(200);
      res.json(news);
    });
  }
  config.connection(function(err,db){
    if(err) throw err;
    var News = db.define(req.body.table,config.newsScheme);
    var NewsBaijia = db.define(req.body.table,config.newsScheme);

    if(req.body.table == 'news'){
      createNews(News);
    }
    else if(req.body.table == 'newsBaijia'){
      createNews(NewsBaijia);
    }
    else{
      res.send({ 'status': 1, 'errorcode': '未建立的table' });
    }
  });
  /*end本地文件内部的封装*/
}
// 查询数据
function queryData(req,res,next){
  /*本地文件内部的封装*/
  function findData(tableObj){
    tableObj.find({  }, function (err, news) {
      console.log(news);
      //res.charSet('utf-8');
      res.status(200);
      //res.acceptsCharsets('utf-8');
      //req.acceptsCharsets('utf-8');
      res.json(news);
    });
  }
  config.connection(function(err,db){
    if(err) throw err;
    //var News = db.define(req.params.table,config.newsScheme);
    //var NewsBaijia = db.define(req.params.table,config.newsScheme);
    var News = db.define(req.body.table,config.newsScheme);
    var NewsBaijia = db.define(req.body.table,config.newsScheme);

    //if(req.params.table == 'news'){
    if(req.body.table == 'news'){
      findData(News);
    }
    //else if(req.params.table == 'newsBaijia'){
    else if(req.body.table == 'newsBaijia'){
      findData(NewsBaijia);
    }
    else{
      res.send({ 'status': 1, 'errorcode': '未建立的table' });
    }
  });
  /*end本地文件内部的封装*/
  //next();
}
// 删除数据
function deleteData(req,res,next) {
  /*if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }*/
  /*本地文件内部的封装*/
  console.log(req.body);
  //console.log(req.body.rowSlected[0]);
  console.log(req.body.rowSlected);
  //console.log(req.body.rowSlected);
  //console.log(req.params.rowSlected);
  //console.log(req.query.rowSlected);
  function removeData(tabeObj){
    tabeObj.find({
      newsid: req.body.rowSlected
    }).remove( function (err, news) {
      console.log(news);
      res.status(200);
      //res.charSet('utf-8');
      res.json(news);
      console.log(5);
    });
  }
  config.connection(function(err,db){
    if(err) throw err;
    var News = db.define(req.body.table,config.newsScheme);
    var NewsBaijia = db.define(req.body.table,config.newsScheme);

    if(req.body.table == 'news'){
      console.log(1);
      removeData(News);
    }
    else if(req.body.table == 'newsBaijia'){
      removeData(NewsBaijia);
    }
    else{
      res.send({ 'status': 1, 'errorcode': '未建立的table' });
    }
  });
  /*end本地文件内部的封装*/
}
//更新数据
function updateData(req,res,next) {
  /*if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }*/
  /*本地文件内部的封装*/
  function editData(tableObj){
    tableObj.get(req.body.newsid,function(err,news){
      news.title = htmlencoder.htmlEncode(req.body.title);
      news.newsContent = sanitizeHtml(req.body.newsContent,whitelist);
      news.newsLink = htmlencoder.htmlEncode(req.body.newsLink);
      news.imgSrc0 = htmlencoder.htmlEncode(req.body.imgSrc0);
      news.imgSrc1 = htmlencoder.htmlEncode(req.body.imgSrc1);
      news.imgSrc2 = htmlencoder.htmlEncode(req.body.imgSrc2);
      news.srcNet = htmlencoder.htmlEncode(req.body.srcNet);
      news.srcTime = htmlencoder.htmlEncode(req.body.srcTime);
      news.srcIcon0 = htmlencoder.htmlEncode(req.body.srcIcon0);
      news.save(function(err){

      });
      console.log(news);
      res.status(200);
      //res.charSet('utf-8');
      res.json(news);
    });
  }
  config.connection(function(err,db){
    if(err) throw err;
    var News = db.define(req.body.table,config.newsScheme);
    var NewsBaijia = db.define(req.body.table,config.newsScheme);

    if(req.body.table == 'news'){
      editData(News);
    }
    else if(req.body.table == 'newsBaijia'){
      editData(NewsBaijia);
    }
    else{
      res.send({ 'status': 1, 'errorcode': '未建立的table' });
    }
  });
  /*end本地文件内部的封装*/
}
//登录认证
function checkLogin(req,res,next){
  console.log("checkLogin");
  console.log(req.body);
  console.log(req.body.username);
  if(req.body.username)
  {
    req.session.username = req.body.username;
    if(req.body.username !== 'admin')
    {
      res.redirect('/bgManager/login');
    }
    else
    {
      next();
    }
    /*else{
      res.redirect('/bgManager');
    }*/
    console.log(1);
  }
  else
  {
    //if(req.session.username !== req.body.username){
    if(req.session.username !== 'admin'){
      res.redirect('/bgManager/login');
    }
    else
    {
      next();
    }
    console.log(2);
    /*else{
      res.redirect('/bgManager');
    }*/
  }

 /* if(req.body.username !== 'admin')
  {
    req.session.username = req.body.username;
    //res.redirect('/login');
    res.redirect('/bgManager/login');
  }*/
  console.log(3);

}

router.post('/select',queryData);
//router.post('/add/',addData);
router.post('/add/',parseForm, csrfProtection,addData);
router.post('/delete/',deleteData);
//router.post('/update/',updateData);
router.post('/update/',parseForm, csrfProtection,updateData);
//router.post('/login',checkLogin);
module.exports = router;
