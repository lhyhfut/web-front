var router = require('koa-router')();
var htmlencoder = require('htmlencode');
var sanitizeHtml = require('sanitize-html');
var config = require('../public/config/config');
// setup route middlewares
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

router.get('/',async function(ctx,next){
  await ctx.render('bgManager',{});
});

var addData = async function(ctx,next){
  var table = ctx.request.body.table;
  console.log(ctx.request.body.table);
  //console.log(ctx.body.table);
  var tableModel =  config.createTable(table);
  var scheme ={
    title: htmlencoder.htmlEncode(ctx.request.body.title),
    newsContent : sanitizeHtml(ctx.request.body.newsContent,whitelist),
    newsLink : htmlencoder.htmlEncode(ctx.request.body.newsLink),
    imgSrc0 : htmlencoder.htmlEncode(ctx.request.body.imgSrc0),
    imgSrc1 : htmlencoder.htmlEncode(ctx.request.body.imgSrc1),
    imgSrc2 : htmlencoder.htmlEncode(ctx.request.body.imgSrc2),
    srcNet : htmlencoder.htmlEncode(ctx.request.body.srcNet),
    srcTime : htmlencoder.htmlEncode(ctx.request.body.srcTime),
    srcIcon0 : htmlencoder.htmlEncode(ctx.request.body.srcIcon0)
  };
  var news = await config.addNews(tableModel,scheme);
  ctx.status = 200;
  ctx.body = news;
};
// 查询数据
var queryData = async function(ctx,next){
  var table = ctx.request.body.table;
  var tableModel = config.createTable(table);
//查询全部
//  var news = config.findAllNews(tableModel);  //不带 yield则返回的是 { },空值
  var news = await config.findAllNews(tableModel);
  //console.log(news); //不带 yield则返回的是 { },空值
  ctx.status = 200;
  ctx.body = news;
};
// 删除数据
var deleteData = async function(ctx,next) {
  var table = ctx.request.body.table;
  var tableModel = config.createTable(table);
  var newsid = ctx.request.body.rowSlected;
  console.log('deleteData'+newsid);
  var news = await config.deleteNews(tableModel,newsid);
  //console.log(news); //不带 yield则返回的是 { },空值
  ctx.status = 200;
  ctx.body = news;
};
//更新数据
var updateData = async function(ctx,next) {
  var table = ctx.request.body.table;
  var tableModel = config.createTable(table);
  var newsid = ctx.request.body.newsid;
  //console.log('updateData'+newsid);
  var scheme = {
    title : htmlencoder.htmlEncode(ctx.request.body.title),
    newsContent : sanitizeHtml(ctx.request.body.newsContent, whitelist),
    newsLink : htmlencoder.htmlEncode(ctx.request.body.newsLink),
    imgSrc0 : htmlencoder.htmlEncode(ctx.request.body.imgSrc0),
    imgSrc1 : htmlencoder.htmlEncode(ctx.request.body.imgSrc1),
    imgSrc2 : htmlencoder.htmlEncode(ctx.request.body.imgSrc2),
    srcNet : htmlencoder.htmlEncode(ctx.request.body.srcNet),
    srcTime : htmlencoder.htmlEncode(ctx.request.body.srcTime),
    srcIcon0 : htmlencoder.htmlEncode(ctx.request.body.srcIcon0)
  };
  var news = await config.updateNews(tableModel,newsid,scheme);
  //console.log(news); //不带 yield则返回的是 { },空值
  ctx.status = 200;
  ctx.body = news;
};
router.post('/select',queryData);
//router.post('/add/',parseForm, csrfProtection,addData);
router.post('/add/',addData);
router.post('/delete/',deleteData);
//router.post('/update/',parseForm, csrfProtection,updateData);
router.post('/update/',updateData);
module.exports = router;
