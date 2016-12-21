* 使用koa1+sequelize重构baidunews
1. co generator
    1. 以bgManager.js中的 queryData为例。
    路由控制函数需写为
    queryData = function* (next){  }形式
    里面如果某些步骤需要异步处理,如调用config.js中的  findAllNews()
    则应写为function* findAllNews(tableModel){ }形式。  //如果少了*,一般会报HTTP 500
    queryData中使用 yield。yield config.findAllNews(tableModel);
    findAllNews()中则把查询到的数据return回去。
    2. 某些函数如createTable(),不需要写为createTable*(),调用时也不需要 yield 
    3. 接收数据 this.request.body
    发送数据this.body 
2. 路由koa-router中间件需要手动安装
3. sequelize
   会自动添加id，createdAt，updatedAt三列属性。
   id可以使用News.removeAttribute('id');删除。
   其他的2项可以在define scheme的时候添加
   {underscored: false,
    timestamps: false}
    选项。
4. 使用了[koa-generator](https://github.com/17koa/koa-generator)
