## CentOS 7 下 yum 安装和配置 Nginx
1. 添加 yum 源 `sudo rpm -ivh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm`
2. 安装 `sudo yum install nginx`


### 设置开机启动
`sudo systemctl enable nginx`

### 启动服务
`sudo systemctl start nginx`

### 停止服务
`sudo systemctl restart nginx`

### 重新加载
一般重新配置之后，不需要重启服务，这时可以使用重新加载。

`sudo systemctl reload nginx `
