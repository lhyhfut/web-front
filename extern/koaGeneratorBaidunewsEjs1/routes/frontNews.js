//var express = require('express');
//var router = express.Router();
var router = require('koa-router')();
var sanitizeHtml = require('sanitize-html');
//var config = require('./config/config');
var config = require('../public/config/config');

router.get('/',function*(next){
  yield this.render('frontNews',{});
});

//function* selectDataFront(next){
var selectDataFront = function*(next){
  console.log(1111);
  console.log(this.request.body);
  var table = this.request.body.table,
      //page = this.request.body.page,
      page = Number(this.request.body.page),
      //pageItem = this.request.body.pageItem;
      pageItem = Number(this.request.body.pageItem);
  var limit = pageItem;
  var offset = (page-1)*pageItem;
  var tableModel = config.createTable(table);
  var news = yield config.findFrontNews(tableModel,limit,offset);
  this.status = 200;
  this.body = news;
};

router.post('/selectFront',selectDataFront);   //webstorm中找不到这个post定义
console.log(222);
module.exports = router;
