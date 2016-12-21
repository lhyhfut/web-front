//var express = require('express');
//var router = express.Router();
var router = require('koa-router')();
var koa = require('koa');
var app = koa();
var res_api = require('koa.res.api');
app.use(res_api());
var htmlencoder = require('htmlencode');
var sanitizeHtml = require('sanitize-html');
var csrf = require('csurf');
var config = require('../public/config/config');
var bodyParser = require('body-parser');
//var bodyParser = require('koa-bodyparser');
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

router.get('/', function *(next) {
  //没有yield next代表后面没有需要执行的中间件
  yield this.render('bgManager',{});
  //yield this.render('login', { }); //可以正确渲染login.ejs
});

var addData = function* (next){
  var table = this.request.body.table;
  var tableModel =  config.createTable(table);
  var scheme ={
    title: htmlencoder.htmlEncode(this.request.body.title),
    newsContent : sanitizeHtml(this.request.body.newsContent,whitelist),
    newsLink : htmlencoder.htmlEncode(this.request.body.newsLink),
    imgSrc0 : htmlencoder.htmlEncode(this.request.body.imgSrc0),
    imgSrc1 : htmlencoder.htmlEncode(this.request.body.imgSrc1),
    imgSrc2 : htmlencoder.htmlEncode(this.request.body.imgSrc2),
    srcNet : htmlencoder.htmlEncode(this.request.body.srcNet),
    srcTime : htmlencoder.htmlEncode(this.request.body.srcTime),
    srcIcon0 : htmlencoder.htmlEncode(this.request.body.srcIcon0)
  };
  var news = yield config.addNews(tableModel,scheme);
    this.status = 200;
    this.body = news;
};
// 查询数据
var queryData = function* (next){
    var table = this.request.body.table;
    var tableModel = config.createTable(table);
//查询全部
//  var news = config.findAllNews(tableModel);  //不带 yield则返回的是 { },空值
    var news = yield config.findAllNews(tableModel);
    //console.log(news); //不带 yield则返回的是 { },空值
    this.status = 200;
    this.body = news;
};
// 删除数据
var deleteData = function* (next) {
  var table = this.request.body.table;
  var tableModel = config.createTable(table);
  var newsid = this.request.body.rowSlected;
  console.log('deleteData'+newsid);
  var news = yield config.deleteNews(tableModel,newsid);
  //console.log(news); //不带 yield则返回的是 { },空值
  this.status = 200;
  this.body = news;
};
//更新数据
var updateData = function* (next) {
  var table = this.request.body.table;
  var tableModel = config.createTable(table);
  var newsid = this.request.body.newsid;
  //console.log('updateData'+newsid);
  var scheme = {
    title : htmlencoder.htmlEncode(this.request.body.title),
    newsContent : sanitizeHtml(this.request.body.newsContent, whitelist),
    newsLink : htmlencoder.htmlEncode(this.request.body.newsLink),
    imgSrc0 : htmlencoder.htmlEncode(this.request.body.imgSrc0),
    imgSrc1 : htmlencoder.htmlEncode(this.request.body.imgSrc1),
    imgSrc2 : htmlencoder.htmlEncode(this.request.body.imgSrc2),
    srcNet : htmlencoder.htmlEncode(this.request.body.srcNet),
    srcTime : htmlencoder.htmlEncode(this.request.body.srcTime),
    srcIcon0 : htmlencoder.htmlEncode(this.request.body.srcIcon0)
  };
  var news = yield config.updateNews(tableModel,newsid,scheme);
    //console.log(news); //不带 yield则返回的是 { },空值
    this.status = 200;
    this.body = news;
};
router.post('/select',queryData);
//router.post('/add/',parseForm, csrfProtection,addData);
router.post('/add/',addData);
router.post('/delete/',deleteData);
//router.post('/update/',parseForm, csrfProtection,updateData);
router.post('/update/',updateData);
module.exports = router;
