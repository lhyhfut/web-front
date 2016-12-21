/**
 * Created by liuhongyu on 16/9/30.
 */
var orm = require('orm');
var conObj={
    'usr':'root',
    'server':'127.0.0.1',
    'port':9000,
    'password':'',
    'database':'baidunews'
};
var newsScheme = {
    newsid:{type:'serial',key:true},
    title: String,
    newsContent : String,
    newsLink : String,
    imgSrc0 : String,
    imgSrc1 : String,
    imgSrc2 : String,
    srcNet : String,
    srcTime : Date,
    srcIcon0 : String
};
function connection(callback){
    var conStr = "mysql://" + conObj.usr + ":" + conObj.password + "@" + conObj.server + "/" + conObj.database;
    orm.connect(conStr,callback);
}
module.exports = {
    'newsScheme':newsScheme,
    'connection':connection
};
