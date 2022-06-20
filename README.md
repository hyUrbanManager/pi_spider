# 树莓派项目，构建数据
使用数据库，数据库保存在16G的内存卡上面

# 使用nodejs完成后端搭建。

用守护进程启动，防止node遇到错误退出导致网页不可访问。
npm install forever -g
npm start
npm stop

# 开机启动node

开机启动的话使用node命令，因为forever会失败，不知道原因。把日志放到systemcl里面

```
sudo cp pi_spider.service /usr/lib/systemd/system/
sudo systemctl start pi_spider.service
sudo systemctl enable pi_spider.service

# 限制日志大小
sudo journalctl --vacuum-size=100M
```

# 更新ip

1. 方糖公众号查看当前ip。
2. 使用网络命令查看gitlab上面保存的当前ip。
```
curl https://raw.githubusercontent.com/hyUrbanManager/pi_wan_ip/main/wan_ip.json
```