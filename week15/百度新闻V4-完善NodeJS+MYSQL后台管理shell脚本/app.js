/**
 * Created by liuhongyu on 16/9/29.
 */
var restify = require('restify');
//var orm = require('orm');
var config = require('./config/config');
var htmlencoder = require('htmlencode');
var sanitizeHtml = require('sanitize-html');
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

var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.CORS());
// 使post请求生效
server.use(restify.bodyParser({
    maxBodySize: 0,
    mapParams: true,
    mapFiles: false,
    overrideParams: false,
}));
//添加数据
function addData(req,res,next){
    if(req.method == 'OPTIONS'){
        res.send(200);
    }else
    {
        next();
    }
    /*本地文件内部的封装*/
    // createNews()放在connection()调用外面,把函数定义和执行分开
    function createNews(tableObj){
        tableObj.create({
            title: htmlencoder.htmlEncode(req.params.title),
            newsContent : sanitizeHtml(req.params.newsContent,whitelist),
            newsLink : htmlencoder.htmlEncode(req.params.newsLink),
            imgSrc0 : htmlencoder.htmlEncode(req.params.imgSrc0),
            imgSrc1 : htmlencoder.htmlEncode(req.params.imgSrc1),
            imgSrc2 : htmlencoder.htmlEncode(req.params.imgSrc2),
            srcNet : htmlencoder.htmlEncode(req.params.srcNet),
            srcTime : htmlencoder.htmlEncode(req.params.srcTime),
            srcIcon0 : htmlencoder.htmlEncode(req.params.srcIcon0)
        }, function (err, news) {
            console.log(news);
            res.charSet('utf-8');
            res.json(news);
        });
    }
    config.connection(function(err,db){
        if(err) throw err;
        var News = db.define(req.params.table,config.newsScheme);
        var NewsBaijia = db.define(req.params.table,config.newsScheme);

        if(req.params.table == 'news'){
            createNews(News);
        }
        else if(req.params.table == 'newsBaijia'){
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
    if (req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
    /*本地文件内部的封装*/
    function findData(tableObj){
        tableObj.find({  }, function (err, news) {
            console.log(news);
            res.charSet('utf-8');
            res.json(news);
        });
    }
    config.connection(function(err,db){
        if(err) throw err;
        var News = db.define(req.params.table,config.newsScheme);
        var NewsBaijia = db.define(req.params.table,config.newsScheme);

        if(req.params.table == 'news'){
            findData(News);
        }
        else if(req.params.table == 'newsBaijia'){
            findData(NewsBaijia);
        }
        else{
            res.send({ 'status': 1, 'errorcode': '未建立的table' });
        }
    });
    /*end本地文件内部的封装*/
}
// 删除数据
function deleteData(req,res,next) {
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
    /*本地文件内部的封装*/
    function removeData(tabeObj){
        tabeObj.find({
            newsid: req.params.rowSlected
        }).remove( function (err, news) {
            console.log(news);
            res.charSet('utf-8');
            res.json(news);
        });
    }
    config.connection(function(err,db){
        if(err) throw err;
        var News = db.define(req.params.table,config.newsScheme);
        var NewsBaijia = db.define(req.params.table,config.newsScheme);

        if(req.params.table == 'news'){
            removeData(News);
        }
        else if(req.params.table == 'newsBaijia'){
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
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
    /*本地文件内部的封装*/
    function editData(tableObj){
        tableObj.get(req.params.newsid,function(err,news){
            news.title = htmlencoder.htmlEncode(req.params.title);
            news.newsContent = sanitizeHtml(req.params.newsContent,whitelist);
            news.newsLink = htmlencoder.htmlEncode(req.params.newsLink);
            news.imgSrc0 = htmlencoder.htmlEncode(req.params.imgSrc0);
            news.imgSrc1 = htmlencoder.htmlEncode(req.params.imgSrc1);
            news.imgSrc2 = htmlencoder.htmlEncode(req.params.imgSrc2);
            news.srcNet = htmlencoder.htmlEncode(req.params.srcNet);
            news.srcTime = htmlencoder.htmlEncode(req.params.srcTime);
            news.srcIcon0 = htmlencoder.htmlEncode(req.params.srcIcon0);
            news.save(function(err){

            });
            console.log(news);
            res.charSet('utf-8');
            res.json(news);
        });
    }
    config.connection(function(err,db){
        if(err) throw err;
        var News = db.define(req.params.table,config.newsScheme);
        var NewsBaijia = db.define(req.params.table,config.newsScheme);

        if(req.params.table == 'news'){
            editData(News);
        }
        else if(req.params.table == 'newsBaijia'){
            editData(NewsBaijia);
        }
        else{
            res.send({ 'status': 1, 'errorcode': '未建立的table' });
        }
    });
    /*end本地文件内部的封装*/
}
// 前端查询数据
function selectDataFront(req,res,next) {
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
    /*本地文件内部的封装*/
    function findDataFront(tableObj){
        tableObj.find({}).limit(req.params.pageItem).offset((req.params.page-1)*(req.params.pageItem)).run(function(err,news){
            console.log(news);
            res.charSet('utf-8');
            res.json(news);
        });
    }
    config.connection(function(err,db){
        if(err) throw err;
        var News = db.define(req.params.table,config.newsScheme);
        var NewsBaijia = db.define(req.params.table,config.newsScheme);

        if(req.params.table == 'news'){
            findDataFront(News);
        }
        else if(req.params.table == 'newsBaijia'){
            findDataFront(NewsBaijia);
        }
        else{
            res.send({ 'status': 1, 'errorcode': '未建立的table' });
        }
    });
    /*end本地文件内部的封装*/
}
server.post('/select/',queryData);
server.post('/add/',addData);
server.post('/delete/',deleteData);
server.post('/update/',updateData);
server.post('/selectFront/',selectDataFront);
server.listen(9000,function(){
    console.log("%s listening at %s",server.name,server.url);
});
// 路由注册--后的静态文件服务路由
server.get(/\/backEndManager\/{1,}.*/, restify.serveStatic({
    directory: './webapp/',
    default: 'index.html'
}));
// 路由注册--前端的静态文件服务路由
server.get(/\/?.*/, restify.serveStatic({
    directory: './webapp/frontNews/',
    default: 'index.html'
}));

