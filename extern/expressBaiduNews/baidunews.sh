#!/bin/sh
# 编写shell脚本管理你的nodejs百度新闻后台，配合pm2启动监测CPU占用重启PM2

echo "脚本开始执行"
echo "检查依赖"
# 检查是否有node
node -v
outNode=`echo $?`
if [ "$outNode" != 0 ]
then
    echo 'node is required'
fi

# 检查是否有pm2
pm2 -v
outPm2=`echo $?`
if [ "$outPm2" != 0 ]
then
    echo 'pm2 is required'
fi

pm2 start app.js

# cpu最大占用率
maxCpuOccupancyRate=80

while true
do
    #计算pid,$1才是pid
    pid=`ps -e|grep '[0-9].node./'|awk '{print $1}'`
    # 检查是否有node进程
    if [ ! $pid ]
    then
        echo 'there is no node process running'
        break
    fi
    #计算node的cpu占用率,取整
    cpuRate=`ps -p $pid -o pcpu|grep -v CPU|cut -d . -f 1|awk '{print $1}'`
    #重启判断
    echo '当前node的cpu占用率'$cpuRate
    if [ "$cpuRate" -gt "$maxCpuOccupancyRate" ]
    then
        echo "cpu占用率过大,node需要重启"
        pm2 restart all
    else
        echo "node服务正常,10s后重新检测"
        pm2 list
    fi
    #10s后重新执行
    sleep 10s
done

