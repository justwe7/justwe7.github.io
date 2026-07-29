ge.lihx.top
```
server {
    listen 80;
    server_name gege.lihx.top;
    return 301 https://ge.lihx.top$request_uri;
}
server
{
    listen 443;
    server_name gege.lihx.top;
    # ssl_certificate /www/cert/fullchain.pem;
    # ssl_certificate_key /www/cert/privkey.pem;
    # ssl_trusted_certificate /www/cert/chain.pem;
    # include enable-php-00.conf;
    return 301 http://ge.lihx.top$request_uri;
}

# server
# {
#     listen 80;
#     server_name ge.lihx.top;
#     # ssl_certificate /www/cert/fullchain.pem;
#     # ssl_certificate_key /www/cert/privkey.pem;
#     # ssl_trusted_certificate /www/cert/chain.pem;
#     # include enable-php-00.conf;
#     #PHP-INFO-END
    
#     #REWRITE-START URL重写规则引用,修改后将导致面板设置的伪静态规则失效
#     # include /www/server/panel/vhost/rewrite/t.littl.cn.conf;
#     #REWRITE-END
    
#     #禁止访问的文件或目录
#     location ~ ^/(\.user.ini|\.htaccess|\.git|\.svn|\.project|LICENSE|README.md)
#     {
#         return 404;
#     }
    
#       # 开启 gzip 压缩
#   	gzip on;
#   	gzip_vary on;
  
#   	# 压缩级别，可以设置为 1-9 的数字，数字越大压缩效果越好，但是占用的 CPU 资源也会越多
#   	gzip_comp_level 6;
  
#   	# 压缩文件的最小大小
#   	gzip_min_length 1024;
  
#   	# 压缩类型，支持的类型如下
#   	gzip_types
#   	    text/plain
#   	    text/css
#   	    text/xml
#   	    text/javascript
#   	    application/javascript
#   	    application/x-javascript
#   	    application/json
#   	    application/xml
#   	    application/rss+xml
#   	    image/svg+xml;
  
#   	# 压缩前缀，只有请求的文件名匹配该前缀时才会启用压缩
#   	gzip_proxied any;
  
#   	# 禁用压缩的 User-Agent
#   	gzip_disable "MSIE [1-6]\.";
  
  
#       location / {
#         alias /www/wwwroot/chatgpt-webui/dist/;
#         index index.php index.html index.htm default.php default.htm default.html;
#         # try_files $uri $uri/ /index.html; 
#       }

    
#     location /api {
#         proxy_pass http://127.0.0.1:3002;
#         proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
#         proxy_redirect off;
#         proxy_set_header X-Real-IP $remote_addr;
#         proxy_set_header Host $http_host;
#         proxy_set_header X-NginX-Proxy true;
#         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#         proxy_set_header X-Forwarded-Proto $scheme;
#     }
#     access_log  /www/wwwlogs/t.littl.cn.log;
#     error_log  /www/wwwlogs/t.littl.cn.error.log;
# }
```


t.
```
server
{
    listen 443 ssl;
    server_name t.littl.cn;
    ssl_certificate /www/cert/fullchain.pem;
    ssl_certificate_key /www/cert/privkey.pem;
    ssl_trusted_certificate /www/cert/chain.pem;
    include enable-php-00.conf;
    #PHP-INFO-END
    
    #REWRITE-START URL重写规则引用,修改后将导致面板设置的伪静态规则失效
    include /www/server/panel/vhost/rewrite/t.littl.cn.conf;
    #REWRITE-END
    
    #禁止访问的文件或目录
    location ~ ^/(\.user.ini|\.htaccess|\.git|\.svn|\.project|LICENSE|README.md)
    {
        return 404;
    }
    location / {
         proxy_pass http://127.0.0.1:7778;
         proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
         proxy_redirect off;
         proxy_set_header X-Real-IP $remote_addr;
         proxy_set_header Host $http_host;
         proxy_set_header X-NginX-Proxy true;
         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
         proxy_set_header X-Forwarded-Proto $scheme;
        # if ($request_method = 'OPTIONS') {
        #     add_header 'Access-Control-Allow-Origin' '*';
        #     add_header 'Access-Control-Allow-Credentials' 'true';
        #     add_header 'Access-Control-Allow-Headers' 'Authorization,Accept,Origin,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
        #     add_header 'Access-Control-Allow-Methods' 'GET,POST,OPTIONS,PUT,DELETE,PATCH';
        #     add_header 'Access-Control-Max-Age' 1728000;
        #     add_header 'Content-Type' 'text/plain charset=UTF-8';
        #     add_header 'Content-Length' 0;
        #     return 204;
        #   }
          # add_header 'Access-Control-Allow-Origin' '*';
        # add_header Access-Control-Allow-Origin *;
    }
    access_log  /www/wwwlogs/t.littl.cn.log;
    error_log  /www/wwwlogs/t.littl.cn.error.log;
}
```

static
```
server
{
    listen 80;
    listen 21345;
    server_name static.littl.cn mstatic.littl.cn;
    # index index.php index.html index.htm default.php default.htm default.html;
    root /www/wwwroot/static;
    
    location / {
      charset utf-8,gbk; # 展示中文文件名
      autoindex on; # 打开目录浏览功能
      autoindex_exact_size off;# 以可读的方式显示文件大小，单位为 KB、MB 或者 GB，autoindex_format为html格式时有效
      autoindex_localtime on; # 以服务器的文件时间作为显示的时间,autoindex_format为html格式时有效
    #autoindex_format html; # 以网页的风格展示目录内容。该属性在1.7.9及以上适用
    }
    
    #SSL-START SSL相关配置，请勿删除或修改下一行带注释的404规则
    #error_page 404/404.html;
    #SSL-END
    
    #ERROR-PAGE-START  错误页配置，可以注释、删除或修改
    #error_page 404 /404.html;
    #error_page 502 /502.html;
    #ERROR-PAGE-END
    
    #PHP-INFO-START  PHP引用配置，可以注释或修改
    # include enable-php-00.conf;
    #PHP-INFO-END
    
    #REWRITE-START URL重写规则引用,修改后将导致面板设置的伪静态规则失效
    # include /www/server/panel/vhost/rewrite/static.littl.cn.conf;
    # #REWRITE-END
    
    # #禁止访问的文件或目录
    # location ~ ^/(\.user.ini|\.htaccess|\.git|\.svn|\.project|LICENSE|README.md)
    # {
    #     return 404;
    # }
    
    #一键申请SSL证书验证目录相关设置
    location ~ \.well-known{
        allow all;
    }
    
    # location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
    # {
    #     expires      30d;
    #     error_log /dev/null;
    #     access_log off;
    # }
    
    # location ~ .*\.(js|css)?$
    # {
    #     expires      12h;
    #     error_log /dev/null;
    #     access_log off; 
    # }
    access_log  /www/wwwlogs/static.littl.cn.log;
    error_log  /www/wwwlogs/static.littl.cn.error.log;
}

server {
    listen      443 ssl;
    server_name static.littl.cn;
    ssl_certificate /www/cert/fullchain.pem;
    ssl_certificate_key /www/cert/privkey.pem;
    ssl_trusted_certificate /www/cert/chain.pem;
    
    # index index.php index.html index.htm default.php default.htm default.html;
    root /www/wwwroot/static;
    
    location / {
      charset utf-8,gbk; # 展示中文文件名
      autoindex on; # 打开目录浏览功能
      autoindex_exact_size off;# 以可读的方式显示文件大小，单位为 KB、MB 或者 GB，autoindex_format为html格式时有效
      autoindex_localtime on; # 以服务器的文件时间作为显示的时间,autoindex_format为html格式时有效
    #autoindex_format html; # 以网页的风格展示目录内容。该属性在1.7.9及以上适用
    }
    
    access_log  /www/wwwlogs/static.littl.cn.log;
    error_log  /www/wwwlogs/static.littl.cn.error.log;
}
```

lihx.top
```
server
{
    listen 80;
	  listen 443 ssl http2;
    server_name lihx.top;
    index index.php index.html index.htm default.php default.htm default.html;
    root /www/wwwroot/lihx.top;
    
    #SSL-START SSL相关配置，请勿删除或修改下一行带注释的404规则
    #error_page 404/404.html;
    #HTTP_TO_HTTPS_START
    if ($server_port !~ 443){
        rewrite ^(/.*)$ https://$host$1 permanent;
    }
    #HTTP_TO_HTTPS_END
    # ssl_certificate    /www/server/panel/vhost/cert/lihx.top/fullchain.pem;
    # ssl_certificate_key    /www/server/panel/vhost/cert/lihx.top/privkey.pem;
    # ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;
    # ssl_ciphers EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;
    # ssl_prefer_server_ciphers on;
    # ssl_session_cache shared:SSL:10m;
    # ssl_session_timeout 10m;
    
    #证书文件名称
    ssl_certificate /www/cert/top/lihx.top_bundle.crt;
    #私钥文件名称
    ssl_certificate_key /www/cert/top/lihx.top.key;
    ssl_session_timeout 5m;
    #请按照以下协议配置
    ssl_protocols TLSv1.2 TLSv1.3; 
    #请按照以下套件配置，配置加密套件，写法遵循 openssl 标准。
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE; 
    ssl_prefer_server_ciphers on;
    
    # add_header Strict-Transport-Security "max-age=31536000";
    error_page 497  https://$host$request_uri;

    #SSL-END
    
    #ERROR-PAGE-START  错误页配置，可以注释、删除或修改
    #error_page 404 /404.html;
    #error_page 502 /502.html;
    #ERROR-PAGE-END
    
    #PHP-INFO-START  PHP引用配置，可以注释或修改
    include enable-php-00.conf;
    #PHP-INFO-END
    
    #REWRITE-START URL重写规则引用,修改后将导致面板设置的伪静态规则失效
    include /www/server/panel/vhost/rewrite/lihx.top.conf;
    #REWRITE-END
    
    #禁止访问的文件或目录
    location ~ ^/(\.user.ini|\.htaccess|\.git|\.svn|\.project|LICENSE|README.md)
    {
        return 404;
    }
    
    #一键申请SSL证书验证目录相关设置
    location ~ \.well-known{
        allow all;
    }
    
    location / {
         proxy_pass http://127.0.0.1:2368;
         proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
         proxy_redirect off;
         proxy_set_header X-Real-IP $remote_addr;
         proxy_set_header Host $http_host;
         proxy_set_header X-NginX-Proxy true;
         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
         proxy_set_header X-Forwarded-Proto $scheme;

    }
    access_log  /www/wwwlogs/lihx.top.log;
    error_log  /www/wwwlogs/lihx.top.error.log;
}
```

m163
```
server
{
    listen 80;
    server_name m163.littl.cn;
    index index.php index.html index.htm default.php default.htm default.html;
    root /www/wwwroot/music163;
    
    #SSL-START SSL相关配置，请勿删除或修改下一行带注释的404规则
    #error_page 404/404.html;
    #SSL-END
    
    #ERROR-PAGE-START  错误页配置，可以注释、删除或修改
    #error_page 404 /404.html;
    #error_page 502 /502.html;
    #ERROR-PAGE-END
    
    #PHP-INFO-START  PHP引用配置，可以注释或修改
    include enable-php-71.conf;
    #PHP-INFO-END
    
    #REWRITE-START URL重写规则引用,修改后将导致面板设置的伪静态规则失效
    include /www/server/panel/vhost/rewrite/m163.littl.cn.conf;
    #REWRITE-END
    
    #禁止访问的文件或目录
    location ~ ^/(\.user.ini|\.htaccess|\.git|\.svn|\.project|LICENSE|README.md)
    {
        return 404;
    }
    
    #一键申请SSL证书验证目录相关设置
    location ~ \.well-known{
        allow all;
    }
    
    location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
    {
        expires      30d;
        error_log /dev/null;
        access_log off;
    }
    
    location ~ .*\.(js|css)?$
    {
        expires      12h;
        error_log /dev/null;
        access_log off; 
    }
    access_log  /www/wwwlogs/m163.littl.cn.log;
    error_log  /www/wwwlogs/m163.littl.cn.error.log;
}
```

img
```
server {
    listen       80;
    server_name  image.littl.cn;

    location / {
      # 重定向为https
      return 301 https://image.littl.cn$request_uri;
      # rewrite ^(.*)$  https://$host$1 permanent;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}

server
{
    listen 443 ssl;
    server_name image.littl.cn;
    index index.php index.html index.htm default.php default.htm default.html;
    root /www/wwwroot/chevereto;
    
    #SSL-START SSL相关配置，请勿删除或修改下一行带注释的404规则
    #error_page 404/404.html;
    ssl_certificate    /www/server/panel/vhost/cert/img.littl.cn/fullchain.pem;
    ssl_certificate_key    /www/server/panel/vhost/cert/img.littl.cn/privkey.pem;
    ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;
    ssl_ciphers EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    add_header Strict-Transport-Security "max-age=31536000";
    error_page 497  https://$host$request_uri;



    #SSL-END
    
    #ERROR-PAGE-START  错误页配置，可以注释、删除或修改
    #error_page 404 /404.html;
    #error_page 502 /502.html;
    #ERROR-PAGE-END
    
    #PHP-INFO-START  PHP引用配置，可以注释或修改
    include enable-php-71.conf;
    #PHP-INFO-END
    
    #REWRITE-START URL重写规则引用,修改后将导致面板设置的伪静态规则失效
    # include /www/server/panel/vhost/rewrite/img.lihx.top.conf;
    #REWRITE-END
    
    #禁止访问的文件或目录
    location ~ ^/(\.user.ini|\.htaccess|\.git|\.svn|\.project|LICENSE|README.md)
    {
        return 404;
    }
    
    #一键申请SSL证书验证目录相关设置
    # location ~ \.well-known{
    #     allow all;
    # }
    
    # location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
    # {
    #     expires      30d;
    #     error_log /dev/null;
    #     access_log off;
    # }
    
    # location ~ .*\.(js|css)?$
    # {
    #     expires      12h;
    #     error_log /dev/null;
    #     access_log off; 
    # }
    # access_log  /www/wwwlogs/img.lihx.top.log;
    # error_log  /www/wwwlogs/img.lihx.top.error.log;
    
    
    #
    # server_name  img.lihx.top;
    # root   /home/www/chevereto;

    location ~* (jpe?g|png|gif) {
            log_not_found off;
        error_page 404 /content/images/system/default/404.gif;
    }

    # CORS header (avoids font rendering issues)
    location ~ \.(ttf|ttc|otf|eot|woff|woff2|font.css|css|js)$ {    }

    # Pretty URLs
    location / {
        index  index.php index.html index.htm;
            try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php(.*)$  {
            fastcgi_pass   127.0.0.1:9000;
            proxy_set_header accept-encoding: gzip,deflate,br;
            fastcgi_index  index.php;
            fastcgi_split_path_info  ^((?U).+\.php)(/?.+)$;
            fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
            fastcgi_param  PATH_INFO  $fastcgi_path_info;
            fastcgi_param  PATH_TRANSLATED  $document_root$fastcgi_path_info;
            include        fastcgi_params;
    }
}
```

littl
```
server
{
    listen 80;
	listen 443 ssl http2;
    server_name littl.cn;
    index index.php index.html index.htm default.php default.htm default.html;
    # root /www/wwwroot/littl-navigation;
    
    location ~* (jpe?g|png|gif) {
            log_not_found off;
        error_page 404 /content/images/system/default/404.gif;
    }
    
    location / {
      #proxy_pass http://127.0.0.1:7777;
      # proxy_pass http://127.0.0.1:2368;
      proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
      proxy_redirect off;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header accept-encoding: gzip,deflate,br;
      proxy_set_header Host $http_host;
      proxy_set_header X-NginX-Proxy true;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    #一键申请SSL证书验证目录相关设置
    location ~ \.well-known{
        allow all;
        root /www/wwwroot/littl-navigation;
    }

    access_log  /www/wwwlogs/littl.cn.log;
    error_log  /www/wwwlogs/littl.cn.error.log;
}
```

wx
```
server
{
    listen 80;
    server_name wx.lihx.top wx.littl.cn;
    #index index.php index.html index.htm default.php default.htm default.html;
    #root /www/wwwroot/test;
    
    #SSL-START SSL相关配置，请勿删除或修改下一行带注释的404规则
    #error_page 404/404.html;
    #SSL-END
    
    location / {
      proxy_pass http://127.0.0.1:3000;
      proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
      proxy_redirect off;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header Host $http_host;
      proxy_set_header X-NginX-Proxy true;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    #ERROR-PAGE-START  错误页配置，可以注释、删除或修改
    #error_page 404 /404.html;
    #error_page 502 /502.html;
    #ERROR-PAGE-END
    
    #PHP-INFO-START  PHP引用配置，可以注释或修改
    #include enable-php-00.conf;
    #PHP-INFO-END
    
    #REWRITE-START URL重写规则引用,修改后将导致面板设置的伪静态规则失效
    include /www/server/panel/vhost/rewrite/120.53.221.250.conf;
    #REWRITE-END
    
    #禁止访问的文件或目录
    #location ~ ^/(\.user.ini|\.htaccess|\.git|\.svn|\.project|LICENSE|README.md)
    #{
    #    return 404;
    #}
    
    #一键申请SSL证书验证目录相关设置
    #location ~ \.well-known{
    #    allow all;
    #}
    location /.well-known/ {
        alias /www/wwwroot/test/.well-known/;
    }
    
    
    #location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
    #{
    #    expires      30d;
    #    error_log off;
    #    access_log /dev/null;
    #}
    
    #location ~ .*\.(js|css)?$
    #{
    #    expires      12h;
    #    error_log off;
    #    access_log /dev/null; 
    #}
    access_log  /www/wwwlogs/120.53.221.250.log;
    error_log  /www/wwwlogs/120.53.221.250.error.log;
}
```