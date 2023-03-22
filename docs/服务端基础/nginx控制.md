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

`sudo systemctl reload nginx`

### 查看启动后记录
`ps aux | grep nginx`

> 默认http模块配置 `include /etc/nginx/conf.d/*.conf;` 会读取conf.d下的所有 `.conf` 文件，如果域名服务太多，可以分多个文件管理


### nginx原生常用命令
```bash
nginx #启动nginx
nginx -s reload #重新加载配置文件 ，热加载配置文件
nginx -s quit #:推荐 待nginx进程处理任务完毕进行停止
nginx -s stop #:先查出nginx进程id再使用kill命令强制杀掉进程。
```

### mac下nginx
1. 使用 `brew` 安装 `ng`: `brew install nginx`
2. 查看ng的信息 `brew info nginx`
   - nginx的配置文件路径：`/usr/local/etc/nginx/nginx.conf`
   - nginx的服务器默认路径：`/usr/local/var/www`
   - nginx的安装路径：`/usr/local/Cellar/nginx/ng版本号`
3. 查看ng的安装目录`open /usr/local/etc/nginx/`

```bash
brew services start nginx
brew services stop nginx
brew services restart nginx
```

### 个人常用配置
虽然已经3202年了，作为一个前端er更应该去使用更易用的`webpack-dev-server`，而且vscode有现成的插件，但是毕竟前端最终打包的物料还是需要通过`nginx`来承载的，所以可以“模拟”一些线上场景，也方便与后端“拉扯”
#### nginx.conf根配置
本地起一个ng服务，方便自己写一些小demo访问，顺便还可以作为一个局域网类似云盘的作用，给同事分享一些大点的文件~

```conf
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

    keepalive_timeout  65;

    # 全局配置
    server {
        listen       8080;
        server_name  localhost;

        root /Users/debugger/bugfolder/www; # 把该目录改成代码的根目录

        location / {
          charset utf-8,gbk; # 展示中文文件名
          autoindex on; # 打开目录浏览功能
          autoindex_exact_size off;# 以可读的方式显示文件大小，单位为 KB、MB 或者 GB，autoindex_format为html格式时有效
          autoindex_localtime on; # 以服务器的文件时间作为显示的时间,autoindex_format为html格式时有效
          # autoindex_format html; # 以网页的风格展示目录内容。该属性在1.7.9及以上适用
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
    include servers/*;
}
```

#### 搞一个子域名
全局配置下有一行 `include servers/*;`，ng会读取servers下的配置文件，为了后续维护清晰，就在这个目录下创建子域名: `touch test.conf`
```conf
# 作为单页应用（前端静态）
server
{
    listen 80;
    server_name dist.com;

    location / { # 如果有根路由 /h5，需要将/改为/h5
      alias /Users/debugger/bugfolder/www/gx/embed-h5-static/dist/; # alias末尾需要有 / 否则在mac下资源会无法正确匹配导致类似403的错误码
      index index.php index.html index.htm default.php default.htm default.html;
      try_files $uri $uri/ /index.html; （history模式配置）
    }
}
# 反向代理(如node服务)
server
{
    listen 80;
    server_name serve.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
        proxy_redirect off;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
然后在host中将`127.0.0.1 dist.com serve.com`回源到本地，浏览器访问这两个域名就好了


| 路径                   | 类型     | 介绍                                      |
| ---------------------- | -------- | ----------------------------------------- |
| /etc/logrotate.d/nginx | 配置文件 | Nginx 日志轮转，用于logrotate服务日志切割 |
https://www.cnblogs.com/jogen/p/8127295.html