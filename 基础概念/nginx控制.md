## CentOS 7 下 yum 安装和配置 Nginx
1. 添加 yum 源 `sudo rpm -ivh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm`
2. 安装 `sudo yum install nginx`


### 设置开机启动
`sudo systemctl enable nginx`

### 启动服务
`sudo systemctl start nginx`

### 停止服务
从容停止服务：`sudo systemctl quit nginx`。 进程完成当前工作后再停止
立即停止服务：`sudo systemctl stop nginx`。 无论进程是否在工作，都直接停止进程
直接杀死进程： `killall nginx`。在上面无效的情况下使用，态度强硬，简单粗暴

### 重启服务
`sudo systemctl restart nginx`

### 重新加载
一般重新配置之后，不需要重启服务，这时可以使用重新加载。

`sudo systemctl reload nginx `

### 查看启动后记录
`ps aux | grep nginx`

> 默认http模块配置 `include /etc/nginx/conf.d/*.conf;` 会读取conf.d下的所有 `.conf` 文件，如果域名服务太多，可以分多个文件管理
