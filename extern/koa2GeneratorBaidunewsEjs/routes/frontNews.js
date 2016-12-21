var router = require('koa-router')();
var sanitizeHtml = require('sanitize-html');
var config = require('../public/config/config');

router.get('/',async function(ctx,next){
  await ctx.render('frontNews',{});
})

var selectDataFront = async function(ctx,next){
  console.log(1111);
  console.log(ctx.request.body);
  var table = ctx.request.body.table,
  //page = this.request.body.page,
      page = Number(ctx.request.body.page),
  //pageItem = this.request.body.pageItem;
      pageItem = Number(ctx.request.body.pageItem);
  var limit = pageItem;
  var offset = (page-1)*pageItem;
  var tableModel = config.createTable(table);
  var news = await config.findFrontNews(tableModel,limit,offset);
  ctx.status = 200;
  ctx.body = news;
};

router.post('/selectFront',selectDataFront);   //webstorm中找不到这个post定义
console.log(222);
module.exports = router;
