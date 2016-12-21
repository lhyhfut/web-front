// 加 md5
fis.match('*.{js,css,png}', {
    useHash: true
});
// seajs部分
// 导入基本的seajs模块配置。
fis.hook('cmd', {
    forwardDeclaration: true,
    baseUrl: "./js/",
    paths: {
        'jquery': 'jquery.js',
        'lunarCalendar':'lunarCalendar.js'
    }
});
// 使用CMD规范解析所有与seajs有关的JS文件。
fis.match('seajs/*.js',{
    isMod:true
});
// 定义CMD规范，排除seajs本身,以及一些没有用到seajs的js文件
/*fis.match('js/!*.js',{
    isMod:false
});*/
fis.match('js/sea.js',{
    isMod:false
});
// 对依赖资源进行打包处理，生成map文件。
fis.match('::packager',{
    postpackager: fis.plugin('loader')
});


// end seajs部分
// 启用 fis-spriter-csssprites 插件
fis.match('::package', {
    spriter: fis.plugin('csssprites')
});

fis.media('prod')
    .match('/seajs/**.js', {
        // 通过 uglify 压缩 js
        // 记得先安装：
        // npm install [-g] fis-optimizer-uglify-js
        optimizer: fis.plugin('uglify-js')
    })
    .match('::packager', {
        postpackager: fis.plugin('loader', {
            allInOne: {
                includeAsyncs: true
                // ,ignore: ['/seajs/jquery.js']
            }
        })
    });

// 对 CSS 进行图片合并
fis.match('*.css', {
    // 给匹配到的文件分配属性 `useSprite`
    useSprite: true
});
fis.match('*.html', {
    //invoke fis-optimizer-html-minifier
    optimizer: fis.plugin('html-minifier')
});
fis.match('*.js', {
    // fis-optimizer-uglify-js 插件进行压缩，已内置
    optimizer: fis.plugin('uglify-js')
});

fis.match('*.css', {
    // fis-optimizer-clean-css 插件进行压缩，已内置
    optimizer: fis.plugin('clean-css')
});

fis.match('*.png', {
    // fis-optimizer-png-compressor 插件进行压缩，已内置
    optimizer: fis.plugin('png-compressor')
});
fis.media('debug').match('*.{js,css,png}', {
    useHash: false,
    useSprite: false,
    optimizer: null
})