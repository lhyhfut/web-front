var express = require('express');
var router = express.Router();
var sanitizeHtml = require('sanitize-html');
//var config = require('./config/config');
var config = require('../public/config/config');


router.get('/', function(req, res, next) {
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);
  res.render('frontNews', {});
});

// 前端查询数据
function selectDataFront(req,res,next) {
  /*if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }*/
  /*本地文件内部的封装*/
  function findDataFront(tableObj){
    tableObj.find({}).limit(req.body.pageItem).offset((req.body.page-1)*(req.body.pageItem)).run(function(err,news){
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
      findDataFront(News);
    }
    else if(req.body.table == 'newsBaijia'){
      findDataFront(NewsBaijia);
    }
    else{
      res.send({ 'status': 1, 'errorcode': '未建立的table' });
    }
  });
  /*end本地文件内部的封装*/
}

router.post('/selectFront/',selectDataFront);   //webstorm中找不到这个post定义

module.exports = router;
