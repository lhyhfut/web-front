/**
 * Created by liuhongyu on 16/9/30.
 */
/*使用sequelize*/
var Sequelize = require('sequelize');
var conObj={
    'usr':'root',
    'server':'127.0.0.1',
    'port':9000,
    'password':'',
    'database':'baidunews'
};
var newsScheme = {
    //即使下面删除了3个自带的属性,还是不能加autoIncrement: true,但可以加primaryKeys: true
    //newsid:{type: Sequelize.INTEGER, autoIncrement: true, primaryKeys: true, unique: true},
    newsid:{type: Sequelize.INTEGER,primaryKeys: true, unique: true},
    title: Sequelize.STRING,
    newsContent : Sequelize.TEXT,
    newsLink : Sequelize.TEXT,
    imgSrc0 : Sequelize.TEXT,
    imgSrc1 : Sequelize.TEXT,
    imgSrc2 : Sequelize.TEXT,
    srcNet : Sequelize.STRING,
    srcTime : Sequelize.DATEONLY,
    srcIcon0 : Sequelize.STRING
};

function createTable(table){
    var newSequelize = new Sequelize(conObj.database,conObj.usr,conObj.password,{
        host: conObj.server,
        dialect: "mysql",
        port: 3306
    });
    newSequelize.sync({ force: false })
        .then(function () {
            console.log('success');
        })
        .catch(function (err) {
            console.error('[models/init_script.js] sequelize sync fail');
            console.error(err);
            throw err;
        });

    if(table=='news')
    {
        var News = newSequelize.define('news',newsScheme,{underscored: false,
            timestamps: false});
        //删除自带的3个属性
        News.removeAttribute('id');
        return News;
    }
    else if(table=='newsBaijia')
    {
        var NewsBaijia = newSequelize.define('newsBaijia',newsScheme,{underscored: false,
            timestamps: false});
        //删除自带的3个属性
        NewsBaijia.removeAttribute('id');
        return NewsBaijia;
    }else
    {
        this.send({ 'status': 1, 'errorcode': '未建立的table' });
        return false;
    }
}

async function addNews(tableModel,scheme){
    return tableModel.create(scheme)
};

async function findAllNews(tableModel){
    return tableModel.findAll();  //是否带yield都是可以的
};

async function updateNews(tableModel,id,scheme) {
    var news = await tableModel.find({where:{newsid:id}}); //这一步必须yield异步
    var updateNews = news.updateAttributes(scheme);//这一步yield与否都可以
    return updateNews;
};

async function deleteNews(tableModel,id){
    var news = await tableModel.find({where:{newsid:id}}); //这一步必须yield异步
    var deleteNews = news.destroy();//这一步yield与否都可以
    return deleteNews;
}

async function findFrontNews(tableModel,limit,offset){
    var news = await tableModel.findAll({
        //return tableModel.findAll({
        order: [["newsid","ASC"]],
        limit:limit,
        offset:offset
    });
    console.log(news);
    return news;
}

module.exports = {
    'newsScheme':newsScheme,
    'createTable':createTable,
    'addNews':addNews,
    'findAllNews':findAllNews,
    'updateNews':updateNews,
    'deleteNews':deleteNews,
    'findFrontNews':findFrontNews,
    'conObj':conObj
};








