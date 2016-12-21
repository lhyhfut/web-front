/**
 * Created by liuhongyu on 16/10/12.
 */
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // 压缩html
        htmlmin: { // Task
            dist: { // Target
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: { // Dictionary of files
                    './index.html': './index.html' // 'destination': 'source'
                }
            },
            dev: { // Another target
                files: {
                    './index.html': './index.html'
                }
            }
        },
        //sass
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    compass: true
                },
                files: {
                    "./css/index.css": "./src/index.scss"
                }
            },
            dist: {
                options: {
                    style: 'compressed',
                    compass: true
                },
                files: {
                    "./css/index.css": "./src/index.scss"
                }
            }
        },
        // 观察本地文件的变化,让它可以正常的工作
        watch: {
            files: ['./index.scss'], //观察index.scss
            tasks: ['sass']
        }
    });
    // 加载包含"uglify"任务的插件
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    // 默认被执行的任务列表
    grunt.registerTask('default', ['htmlmin', 'sass', 'watch']);
}
