"use strict";(self.webpackChunkjustwe7_books=self.webpackChunkjustwe7_books||[]).push([[5268],{15680:(n,e,t)=>{t.d(e,{xA:()=>c,yg:()=>h});var r=t(96540);function o(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function l(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,r)}return t}function i(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?l(Object(t),!0).forEach((function(e){o(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function s(n,e){if(null==n)return{};var t,r,o=function(n,e){if(null==n)return{};var t,r,o={},l=Object.keys(n);for(r=0;r<l.length;r++)t=l[r],e.indexOf(t)>=0||(o[t]=n[t]);return o}(n,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(n);for(r=0;r<l.length;r++)t=l[r],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(o[t]=n[t])}return o}var a=r.createContext({}),p=function(n){var e=r.useContext(a),t=e;return n&&(t="function"==typeof n?n(e):i(i({},e),n)),t},c=function(n){var e=p(n.components);return r.createElement(a.Provider,{value:e},n.children)},w="mdxType",_={inlineCode:"code",wrapper:function(n){var e=n.children;return r.createElement(r.Fragment,{},e)}},d=r.forwardRef((function(n,e){var t=n.components,o=n.mdxType,l=n.originalType,a=n.parentName,c=s(n,["components","mdxType","originalType","parentName"]),w=p(t),d=o,h=w["".concat(a,".").concat(d)]||w[d]||_[d]||l;return t?r.createElement(h,i(i({ref:e},c),{},{components:t})):r.createElement(h,i({ref:e},c))}));function h(n,e){var t=arguments,o=e&&e.mdxType;if("string"==typeof n||o){var l=t.length,i=new Array(l);i[0]=d;var s={};for(var a in e)hasOwnProperty.call(e,a)&&(s[a]=e[a]);s.originalType=n,s[w]="string"==typeof n?n:o,i[1]=s;for(var p=2;p<l;p++)i[p]=t[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},97455:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>a,contentTitle:()=>i,default:()=>_,frontMatter:()=>l,metadata:()=>s,toc:()=>p});var r=t(58168),o=(t(96540),t(15680));const l={},i=void 0,s={unversionedId:"\u670d\u52a1\u7aef\u57fa\u7840/\u5907\u4efd-\u670d\u52a1\u5668ng",id:"\u670d\u52a1\u7aef\u57fa\u7840/\u5907\u4efd-\u670d\u52a1\u5668ng",title:"\u5907\u4efd-\u670d\u52a1\u5668ng",description:"ge.lihx.top",source:"@site/docs/\u670d\u52a1\u7aef\u57fa\u7840/\u5907\u4efd-\u670d\u52a1\u5668ng.md",sourceDirName:"\u670d\u52a1\u7aef\u57fa\u7840",slug:"/\u670d\u52a1\u7aef\u57fa\u7840/\u5907\u4efd-\u670d\u52a1\u5668ng",permalink:"/docs/\u670d\u52a1\u7aef\u57fa\u7840/\u5907\u4efd-\u670d\u52a1\u5668ng",draft:!1,editUrl:"https://github.com/justwe7/justwe7.github.io/blob/feature/docs/\u670d\u52a1\u7aef\u57fa\u7840/\u5907\u4efd-\u670d\u52a1\u5668ng.md",tags:[],version:"current",frontMatter:{},sidebar:"defaultSidebar",previous:{title:"\u540e\u7aef\u626b\u76f2",permalink:"/docs/\u670d\u52a1\u7aef\u57fa\u7840/\u540e\u7aef\u626b\u76f2"},next:{title:"\u670d\u52a1\u5668\u5e26\u5bbd",permalink:"/docs/\u670d\u52a1\u7aef\u57fa\u7840/\u670d\u52a1\u5668\u5e26\u5bbd"}},a={},p=[],c={toc:p},w="wrapper";function _(n){let{components:e,...t}=n;return(0,o.yg)(w,(0,r.A)({},c,t,{components:e,mdxType:"MDXLayout"}),(0,o.yg)("p",null,"ge.lihx.top"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre"},'server {\n    listen 80;\n    server_name gege.lihx.top;\n    return 301 https://ge.lihx.top$request_uri;\n}\nserver\n{\n    listen 443;\n    server_name gege.lihx.top;\n    # ssl_certificate /www/cert/fullchain.pem;\n    # ssl_certificate_key /www/cert/privkey.pem;\n    # ssl_trusted_certificate /www/cert/chain.pem;\n    # include enable-php-00.conf;\n    return 301 http://ge.lihx.top$request_uri;\n}\n\n# server\n# {\n#     listen 80;\n#     server_name ge.lihx.top;\n#     # ssl_certificate /www/cert/fullchain.pem;\n#     # ssl_certificate_key /www/cert/privkey.pem;\n#     # ssl_trusted_certificate /www/cert/chain.pem;\n#     # include enable-php-00.conf;\n#     #PHP-INFO-END\n    \n#     #REWRITE-START URL\u91cd\u5199\u89c4\u5219\u5f15\u7528,\u4fee\u6539\u540e\u5c06\u5bfc\u81f4\u9762\u677f\u8bbe\u7f6e\u7684\u4f2a\u9759\u6001\u89c4\u5219\u5931\u6548\n#     # include /www/server/panel/vhost/rewrite/t.littl.cn.conf;\n#     #REWRITE-END\n    \n#     #\u7981\u6b62\u8bbf\u95ee\u7684\u6587\u4ef6\u6216\u76ee\u5f55\n#     location ~ ^/(\\.user.ini|\\.htaccess|\\.git|\\.svn|\\.project|LICENSE|README.md)\n#     {\n#         return 404;\n#     }\n    \n#       # \u5f00\u542f gzip \u538b\u7f29\n#       gzip on;\n#       gzip_vary on;\n  \n#       # \u538b\u7f29\u7ea7\u522b\uff0c\u53ef\u4ee5\u8bbe\u7f6e\u4e3a 1-9 \u7684\u6570\u5b57\uff0c\u6570\u5b57\u8d8a\u5927\u538b\u7f29\u6548\u679c\u8d8a\u597d\uff0c\u4f46\u662f\u5360\u7528\u7684 CPU \u8d44\u6e90\u4e5f\u4f1a\u8d8a\u591a\n#       gzip_comp_level 6;\n  \n#       # \u538b\u7f29\u6587\u4ef6\u7684\u6700\u5c0f\u5927\u5c0f\n#       gzip_min_length 1024;\n  \n#       # \u538b\u7f29\u7c7b\u578b\uff0c\u652f\u6301\u7684\u7c7b\u578b\u5982\u4e0b\n#       gzip_types\n#           text/plain\n#           text/css\n#           text/xml\n#           text/javascript\n#           application/javascript\n#           application/x-javascript\n#           application/json\n#           application/xml\n#           application/rss+xml\n#           image/svg+xml;\n  \n#       # \u538b\u7f29\u524d\u7f00\uff0c\u53ea\u6709\u8bf7\u6c42\u7684\u6587\u4ef6\u540d\u5339\u914d\u8be5\u524d\u7f00\u65f6\u624d\u4f1a\u542f\u7528\u538b\u7f29\n#       gzip_proxied any;\n  \n#       # \u7981\u7528\u538b\u7f29\u7684 User-Agent\n#       gzip_disable "MSIE [1-6]\\.";\n  \n  \n#       location / {\n#         alias /www/wwwroot/chatgpt-webui/dist/;\n#         index index.php index.html index.htm default.php default.htm default.html;\n#         # try_files $uri $uri/ /index.html; \n#       }\n\n    \n#     location /api {\n#         proxy_pass http://127.0.0.1:3002;\n#         proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;\n#         proxy_redirect off;\n#         proxy_set_header X-Real-IP $remote_addr;\n#         proxy_set_header Host $http_host;\n#         proxy_set_header X-NginX-Proxy true;\n#         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n#         proxy_set_header X-Forwarded-Proto $scheme;\n#     }\n#     access_log  /www/wwwlogs/t.littl.cn.log;\n#     error_log  /www/wwwlogs/t.littl.cn.error.log;\n# }\n')),(0,o.yg)("p",null,"t."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre"},"server\n{\n    listen 443 ssl;\n    server_name t.littl.cn;\n    ssl_certificate /www/cert/fullchain.pem;\n    ssl_certificate_key /www/cert/privkey.pem;\n    ssl_trusted_certificate /www/cert/chain.pem;\n    include enable-php-00.conf;\n    #PHP-INFO-END\n    \n    #REWRITE-START URL\u91cd\u5199\u89c4\u5219\u5f15\u7528,\u4fee\u6539\u540e\u5c06\u5bfc\u81f4\u9762\u677f\u8bbe\u7f6e\u7684\u4f2a\u9759\u6001\u89c4\u5219\u5931\u6548\n    include /www/server/panel/vhost/rewrite/t.littl.cn.conf;\n    #REWRITE-END\n    \n    #\u7981\u6b62\u8bbf\u95ee\u7684\u6587\u4ef6\u6216\u76ee\u5f55\n    location ~ ^/(\\.user.ini|\\.htaccess|\\.git|\\.svn|\\.project|LICENSE|README.md)\n    {\n        return 404;\n    }\n    location / {\n         proxy_pass http://127.0.0.1:7778;\n         proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;\n         proxy_redirect off;\n         proxy_set_header X-Real-IP $remote_addr;\n         proxy_set_header Host $http_host;\n         proxy_set_header X-NginX-Proxy true;\n         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n         proxy_set_header X-Forwarded-Proto $scheme;\n        # if ($request_method = 'OPTIONS') {\n        #     add_header 'Access-Control-Allow-Origin' '*';\n        #     add_header 'Access-Control-Allow-Credentials' 'true';\n        #     add_header 'Access-Control-Allow-Headers' 'Authorization,Accept,Origin,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';\n        #     add_header 'Access-Control-Allow-Methods' 'GET,POST,OPTIONS,PUT,DELETE,PATCH';\n        #     add_header 'Access-Control-Max-Age' 1728000;\n        #     add_header 'Content-Type' 'text/plain charset=UTF-8';\n        #     add_header 'Content-Length' 0;\n        #     return 204;\n        #   }\n          # add_header 'Access-Control-Allow-Origin' '*';\n        # add_header Access-Control-Allow-Origin *;\n    }\n    access_log  /www/wwwlogs/t.littl.cn.log;\n    error_log  /www/wwwlogs/t.littl.cn.error.log;\n}\n")),(0,o.yg)("p",null,"static"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre"},"server\n{\n    listen 80;\n    listen 21345;\n    server_name static.littl.cn mstatic.littl.cn;\n    # index index.php index.html index.htm default.php default.htm default.html;\n    root /www/wwwroot/static;\n    \n    location / {\n      charset utf-8,gbk; # \u5c55\u793a\u4e2d\u6587\u6587\u4ef6\u540d\n      autoindex on; # \u6253\u5f00\u76ee\u5f55\u6d4f\u89c8\u529f\u80fd\n      autoindex_exact_size off;# \u4ee5\u53ef\u8bfb\u7684\u65b9\u5f0f\u663e\u793a\u6587\u4ef6\u5927\u5c0f\uff0c\u5355\u4f4d\u4e3a KB\u3001MB \u6216\u8005 GB\uff0cautoindex_format\u4e3ahtml\u683c\u5f0f\u65f6\u6709\u6548\n      autoindex_localtime on; # \u4ee5\u670d\u52a1\u5668\u7684\u6587\u4ef6\u65f6\u95f4\u4f5c\u4e3a\u663e\u793a\u7684\u65f6\u95f4,autoindex_format\u4e3ahtml\u683c\u5f0f\u65f6\u6709\u6548\n    #autoindex_format html; # \u4ee5\u7f51\u9875\u7684\u98ce\u683c\u5c55\u793a\u76ee\u5f55\u5185\u5bb9\u3002\u8be5\u5c5e\u6027\u57281.7.9\u53ca\u4ee5\u4e0a\u9002\u7528\n    }\n    \n    #SSL-START SSL\u76f8\u5173\u914d\u7f6e\uff0c\u8bf7\u52ff\u5220\u9664\u6216\u4fee\u6539\u4e0b\u4e00\u884c\u5e26\u6ce8\u91ca\u7684404\u89c4\u5219\n    #error_page 404/404.html;\n    #SSL-END\n    \n    #ERROR-PAGE-START  \u9519\u8bef\u9875\u914d\u7f6e\uff0c\u53ef\u4ee5\u6ce8\u91ca\u3001\u5220\u9664\u6216\u4fee\u6539\n    #error_page 404 /404.html;\n    #error_page 502 /502.html;\n    #ERROR-PAGE-END\n    \n    #PHP-INFO-START  PHP\u5f15\u7528\u914d\u7f6e\uff0c\u53ef\u4ee5\u6ce8\u91ca\u6216\u4fee\u6539\n    # include enable-php-00.conf;\n    #PHP-INFO-END\n    \n    #REWRITE-START URL\u91cd\u5199\u89c4\u5219\u5f15\u7528,\u4fee\u6539\u540e\u5c06\u5bfc\u81f4\u9762\u677f\u8bbe\u7f6e\u7684\u4f2a\u9759\u6001\u89c4\u5219\u5931\u6548\n    # include /www/server/panel/vhost/rewrite/static.littl.cn.conf;\n    # #REWRITE-END\n    \n    # #\u7981\u6b62\u8bbf\u95ee\u7684\u6587\u4ef6\u6216\u76ee\u5f55\n    # location ~ ^/(\\.user.ini|\\.htaccess|\\.git|\\.svn|\\.project|LICENSE|README.md)\n    # {\n    #     return 404;\n    # }\n    \n    #\u4e00\u952e\u7533\u8bf7SSL\u8bc1\u4e66\u9a8c\u8bc1\u76ee\u5f55\u76f8\u5173\u8bbe\u7f6e\n    location ~ \\.well-known{\n        allow all;\n    }\n    \n    # location ~ .*\\.(gif|jpg|jpeg|png|bmp|swf)$\n    # {\n    #     expires      30d;\n    #     error_log /dev/null;\n    #     access_log off;\n    # }\n    \n    # location ~ .*\\.(js|css)?$\n    # {\n    #     expires      12h;\n    #     error_log /dev/null;\n    #     access_log off; \n    # }\n    access_log  /www/wwwlogs/static.littl.cn.log;\n    error_log  /www/wwwlogs/static.littl.cn.error.log;\n}\n\nserver {\n    listen      443 ssl;\n    server_name static.littl.cn;\n    ssl_certificate /www/cert/fullchain.pem;\n    ssl_certificate_key /www/cert/privkey.pem;\n    ssl_trusted_certificate /www/cert/chain.pem;\n    \n    # index index.php index.html index.htm default.php default.htm default.html;\n    root /www/wwwroot/static;\n    \n    location / {\n      charset utf-8,gbk; # \u5c55\u793a\u4e2d\u6587\u6587\u4ef6\u540d\n      autoindex on; # \u6253\u5f00\u76ee\u5f55\u6d4f\u89c8\u529f\u80fd\n      autoindex_exact_size off;# \u4ee5\u53ef\u8bfb\u7684\u65b9\u5f0f\u663e\u793a\u6587\u4ef6\u5927\u5c0f\uff0c\u5355\u4f4d\u4e3a KB\u3001MB \u6216\u8005 GB\uff0cautoindex_format\u4e3ahtml\u683c\u5f0f\u65f6\u6709\u6548\n      autoindex_localtime on; # \u4ee5\u670d\u52a1\u5668\u7684\u6587\u4ef6\u65f6\u95f4\u4f5c\u4e3a\u663e\u793a\u7684\u65f6\u95f4,autoindex_format\u4e3ahtml\u683c\u5f0f\u65f6\u6709\u6548\n    #autoindex_format html; # \u4ee5\u7f51\u9875\u7684\u98ce\u683c\u5c55\u793a\u76ee\u5f55\u5185\u5bb9\u3002\u8be5\u5c5e\u6027\u57281.7.9\u53ca\u4ee5\u4e0a\u9002\u7528\n    }\n    \n    access_log  /www/wwwlogs/static.littl.cn.log;\n    error_log  /www/wwwlogs/static.littl.cn.error.log;\n}\n")),(0,o.yg)("p",null,"lihx.top"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre"},'server\n{\n    listen 80;\n      listen 443 ssl http2;\n    server_name lihx.top;\n    index index.php index.html index.htm default.php default.htm default.html;\n    root /www/wwwroot/lihx.top;\n    \n    #SSL-START SSL\u76f8\u5173\u914d\u7f6e\uff0c\u8bf7\u52ff\u5220\u9664\u6216\u4fee\u6539\u4e0b\u4e00\u884c\u5e26\u6ce8\u91ca\u7684404\u89c4\u5219\n    #error_page 404/404.html;\n    #HTTP_TO_HTTPS_START\n    if ($server_port !~ 443){\n        rewrite ^(/.*)$ https://$host$1 permanent;\n    }\n    #HTTP_TO_HTTPS_END\n    # ssl_certificate    /www/server/panel/vhost/cert/lihx.top/fullchain.pem;\n    # ssl_certificate_key    /www/server/panel/vhost/cert/lihx.top/privkey.pem;\n    # ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;\n    # ssl_ciphers EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;\n    # ssl_prefer_server_ciphers on;\n    # ssl_session_cache shared:SSL:10m;\n    # ssl_session_timeout 10m;\n    \n    #\u8bc1\u4e66\u6587\u4ef6\u540d\u79f0\n    ssl_certificate /www/cert/top/lihx.top_bundle.crt;\n    #\u79c1\u94a5\u6587\u4ef6\u540d\u79f0\n    ssl_certificate_key /www/cert/top/lihx.top.key;\n    ssl_session_timeout 5m;\n    #\u8bf7\u6309\u7167\u4ee5\u4e0b\u534f\u8bae\u914d\u7f6e\n    ssl_protocols TLSv1.2 TLSv1.3; \n    #\u8bf7\u6309\u7167\u4ee5\u4e0b\u5957\u4ef6\u914d\u7f6e\uff0c\u914d\u7f6e\u52a0\u5bc6\u5957\u4ef6\uff0c\u5199\u6cd5\u9075\u5faa openssl \u6807\u51c6\u3002\n    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE; \n    ssl_prefer_server_ciphers on;\n    \n    # add_header Strict-Transport-Security "max-age=31536000";\n    error_page 497  https://$host$request_uri;\n\n    #SSL-END\n    \n    #ERROR-PAGE-START  \u9519\u8bef\u9875\u914d\u7f6e\uff0c\u53ef\u4ee5\u6ce8\u91ca\u3001\u5220\u9664\u6216\u4fee\u6539\n    #error_page 404 /404.html;\n    #error_page 502 /502.html;\n    #ERROR-PAGE-END\n    \n    #PHP-INFO-START  PHP\u5f15\u7528\u914d\u7f6e\uff0c\u53ef\u4ee5\u6ce8\u91ca\u6216\u4fee\u6539\n    include enable-php-00.conf;\n    #PHP-INFO-END\n    \n    #REWRITE-START URL\u91cd\u5199\u89c4\u5219\u5f15\u7528,\u4fee\u6539\u540e\u5c06\u5bfc\u81f4\u9762\u677f\u8bbe\u7f6e\u7684\u4f2a\u9759\u6001\u89c4\u5219\u5931\u6548\n    include /www/server/panel/vhost/rewrite/lihx.top.conf;\n    #REWRITE-END\n    \n    #\u7981\u6b62\u8bbf\u95ee\u7684\u6587\u4ef6\u6216\u76ee\u5f55\n    location ~ ^/(\\.user.ini|\\.htaccess|\\.git|\\.svn|\\.project|LICENSE|README.md)\n    {\n        return 404;\n    }\n    \n    #\u4e00\u952e\u7533\u8bf7SSL\u8bc1\u4e66\u9a8c\u8bc1\u76ee\u5f55\u76f8\u5173\u8bbe\u7f6e\n    location ~ \\.well-known{\n        allow all;\n    }\n    \n    location / {\n         proxy_pass http://127.0.0.1:2368;\n         proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;\n         proxy_redirect off;\n         proxy_set_header X-Real-IP $remote_addr;\n         proxy_set_header Host $http_host;\n         proxy_set_header X-NginX-Proxy true;\n         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n         proxy_set_header X-Forwarded-Proto $scheme;\n\n    }\n    access_log  /www/wwwlogs/lihx.top.log;\n    error_log  /www/wwwlogs/lihx.top.error.log;\n}\n')),(0,o.yg)("p",null,"m163"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre"},"server\n{\n    listen 80;\n    server_name m163.littl.cn;\n    index index.php index.html index.htm default.php default.htm default.html;\n    root /www/wwwroot/music163;\n    \n    #SSL-START SSL\u76f8\u5173\u914d\u7f6e\uff0c\u8bf7\u52ff\u5220\u9664\u6216\u4fee\u6539\u4e0b\u4e00\u884c\u5e26\u6ce8\u91ca\u7684404\u89c4\u5219\n    #error_page 404/404.html;\n    #SSL-END\n    \n    #ERROR-PAGE-START  \u9519\u8bef\u9875\u914d\u7f6e\uff0c\u53ef\u4ee5\u6ce8\u91ca\u3001\u5220\u9664\u6216\u4fee\u6539\n    #error_page 404 /404.html;\n    #error_page 502 /502.html;\n    #ERROR-PAGE-END\n    \n    #PHP-INFO-START  PHP\u5f15\u7528\u914d\u7f6e\uff0c\u53ef\u4ee5\u6ce8\u91ca\u6216\u4fee\u6539\n    include enable-php-71.conf;\n    #PHP-INFO-END\n    \n    #REWRITE-START URL\u91cd\u5199\u89c4\u5219\u5f15\u7528,\u4fee\u6539\u540e\u5c06\u5bfc\u81f4\u9762\u677f\u8bbe\u7f6e\u7684\u4f2a\u9759\u6001\u89c4\u5219\u5931\u6548\n    include /www/server/panel/vhost/rewrite/m163.littl.cn.conf;\n    #REWRITE-END\n    \n    #\u7981\u6b62\u8bbf\u95ee\u7684\u6587\u4ef6\u6216\u76ee\u5f55\n    location ~ ^/(\\.user.ini|\\.htaccess|\\.git|\\.svn|\\.project|LICENSE|README.md)\n    {\n        return 404;\n    }\n    \n    #\u4e00\u952e\u7533\u8bf7SSL\u8bc1\u4e66\u9a8c\u8bc1\u76ee\u5f55\u76f8\u5173\u8bbe\u7f6e\n    location ~ \\.well-known{\n        allow all;\n    }\n    \n    location ~ .*\\.(gif|jpg|jpeg|png|bmp|swf)$\n    {\n        expires      30d;\n        error_log /dev/null;\n        access_log off;\n    }\n    \n    location ~ .*\\.(js|css)?$\n    {\n        expires      12h;\n        error_log /dev/null;\n        access_log off; \n    }\n    access_log  /www/wwwlogs/m163.littl.cn.log;\n    error_log  /www/wwwlogs/m163.littl.cn.error.log;\n}\n")),(0,o.yg)("p",null,"img"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre"},'server {\n    listen       80;\n    server_name  image.littl.cn;\n\n    location / {\n      # \u91cd\u5b9a\u5411\u4e3ahttps\n      return 301 https://image.littl.cn$request_uri;\n      # rewrite ^(.*)$  https://$host$1 permanent;\n    }\n\n    error_page   500 502 503 504  /50x.html;\n    location = /50x.html {\n        root   /usr/share/nginx/html;\n    }\n}\n\nserver\n{\n    listen 443 ssl;\n    server_name image.littl.cn;\n    index index.php index.html index.htm default.php default.htm default.html;\n    root /www/wwwroot/chevereto;\n    \n    #SSL-START SSL\u76f8\u5173\u914d\u7f6e\uff0c\u8bf7\u52ff\u5220\u9664\u6216\u4fee\u6539\u4e0b\u4e00\u884c\u5e26\u6ce8\u91ca\u7684404\u89c4\u5219\n    #error_page 404/404.html;\n    ssl_certificate    /www/server/panel/vhost/cert/img.littl.cn/fullchain.pem;\n    ssl_certificate_key    /www/server/panel/vhost/cert/img.littl.cn/privkey.pem;\n    ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;\n    ssl_ciphers EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;\n    ssl_prefer_server_ciphers on;\n    ssl_session_cache shared:SSL:10m;\n    ssl_session_timeout 10m;\n    add_header Strict-Transport-Security "max-age=31536000";\n    error_page 497  https://$host$request_uri;\n\n\n\n    #SSL-END\n    \n    #ERROR-PAGE-START  \u9519\u8bef\u9875\u914d\u7f6e\uff0c\u53ef\u4ee5\u6ce8\u91ca\u3001\u5220\u9664\u6216\u4fee\u6539\n    #error_page 404 /404.html;\n    #error_page 502 /502.html;\n    #ERROR-PAGE-END\n    \n    #PHP-INFO-START  PHP\u5f15\u7528\u914d\u7f6e\uff0c\u53ef\u4ee5\u6ce8\u91ca\u6216\u4fee\u6539\n    include enable-php-71.conf;\n    #PHP-INFO-END\n    \n    #REWRITE-START URL\u91cd\u5199\u89c4\u5219\u5f15\u7528,\u4fee\u6539\u540e\u5c06\u5bfc\u81f4\u9762\u677f\u8bbe\u7f6e\u7684\u4f2a\u9759\u6001\u89c4\u5219\u5931\u6548\n    # include /www/server/panel/vhost/rewrite/img.lihx.top.conf;\n    #REWRITE-END\n    \n    #\u7981\u6b62\u8bbf\u95ee\u7684\u6587\u4ef6\u6216\u76ee\u5f55\n    location ~ ^/(\\.user.ini|\\.htaccess|\\.git|\\.svn|\\.project|LICENSE|README.md)\n    {\n        return 404;\n    }\n    \n    #\u4e00\u952e\u7533\u8bf7SSL\u8bc1\u4e66\u9a8c\u8bc1\u76ee\u5f55\u76f8\u5173\u8bbe\u7f6e\n    # location ~ \\.well-known{\n    #     allow all;\n    # }\n    \n    # location ~ .*\\.(gif|jpg|jpeg|png|bmp|swf)$\n    # {\n    #     expires      30d;\n    #     error_log /dev/null;\n    #     access_log off;\n    # }\n    \n    # location ~ .*\\.(js|css)?$\n    # {\n    #     expires      12h;\n    #     error_log /dev/null;\n    #     access_log off; \n    # }\n    # access_log  /www/wwwlogs/img.lihx.top.log;\n    # error_log  /www/wwwlogs/img.lihx.top.error.log;\n    \n    \n    #\n    # server_name  img.lihx.top;\n    # root   /home/www/chevereto;\n\n    location ~* (jpe?g|png|gif) {\n            log_not_found off;\n        error_page 404 /content/images/system/default/404.gif;\n    }\n\n    # CORS header (avoids font rendering issues)\n    location ~ \\.(ttf|ttc|otf|eot|woff|woff2|font.css|css|js)$ {    }\n\n    # Pretty URLs\n    location / {\n        index  index.php index.html index.htm;\n            try_files $uri $uri/ /index.php?$query_string;\n    }\n\n    location ~ \\.php(.*)$  {\n            fastcgi_pass   127.0.0.1:9000;\n            proxy_set_header accept-encoding: gzip,deflate,br;\n            fastcgi_index  index.php;\n            fastcgi_split_path_info  ^((?U).+\\.php)(/?.+)$;\n            fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;\n            fastcgi_param  PATH_INFO  $fastcgi_path_info;\n            fastcgi_param  PATH_TRANSLATED  $document_root$fastcgi_path_info;\n            include        fastcgi_params;\n    }\n}\n')),(0,o.yg)("p",null,"littl"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre"},"server\n{\n    listen 80;\n    listen 443 ssl http2;\n    server_name littl.cn;\n    index index.php index.html index.htm default.php default.htm default.html;\n    # root /www/wwwroot/littl-navigation;\n    \n    location ~* (jpe?g|png|gif) {\n            log_not_found off;\n        error_page 404 /content/images/system/default/404.gif;\n    }\n    \n    location / {\n      #proxy_pass http://127.0.0.1:7777;\n      # proxy_pass http://127.0.0.1:2368;\n      proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;\n      proxy_redirect off;\n      proxy_set_header X-Real-IP $remote_addr;\n      proxy_set_header accept-encoding: gzip,deflate,br;\n      proxy_set_header Host $http_host;\n      proxy_set_header X-NginX-Proxy true;\n      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n      proxy_set_header X-Forwarded-Proto $scheme;\n    }\n    \n    #\u4e00\u952e\u7533\u8bf7SSL\u8bc1\u4e66\u9a8c\u8bc1\u76ee\u5f55\u76f8\u5173\u8bbe\u7f6e\n    location ~ \\.well-known{\n        allow all;\n        root /www/wwwroot/littl-navigation;\n    }\n\n    access_log  /www/wwwlogs/littl.cn.log;\n    error_log  /www/wwwlogs/littl.cn.error.log;\n}\n")),(0,o.yg)("p",null,"wx"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre"},"server\n{\n    listen 80;\n    server_name wx.lihx.top wx.littl.cn;\n    #index index.php index.html index.htm default.php default.htm default.html;\n    #root /www/wwwroot/test;\n    \n    #SSL-START SSL\u76f8\u5173\u914d\u7f6e\uff0c\u8bf7\u52ff\u5220\u9664\u6216\u4fee\u6539\u4e0b\u4e00\u884c\u5e26\u6ce8\u91ca\u7684404\u89c4\u5219\n    #error_page 404/404.html;\n    #SSL-END\n    \n    location / {\n      proxy_pass http://127.0.0.1:3000;\n      proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;\n      proxy_redirect off;\n      proxy_set_header X-Real-IP $remote_addr;\n      proxy_set_header Host $http_host;\n      proxy_set_header X-NginX-Proxy true;\n      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n      proxy_set_header X-Forwarded-Proto $scheme;\n    }\n    \n    #ERROR-PAGE-START  \u9519\u8bef\u9875\u914d\u7f6e\uff0c\u53ef\u4ee5\u6ce8\u91ca\u3001\u5220\u9664\u6216\u4fee\u6539\n    #error_page 404 /404.html;\n    #error_page 502 /502.html;\n    #ERROR-PAGE-END\n    \n    #PHP-INFO-START  PHP\u5f15\u7528\u914d\u7f6e\uff0c\u53ef\u4ee5\u6ce8\u91ca\u6216\u4fee\u6539\n    #include enable-php-00.conf;\n    #PHP-INFO-END\n    \n    #REWRITE-START URL\u91cd\u5199\u89c4\u5219\u5f15\u7528,\u4fee\u6539\u540e\u5c06\u5bfc\u81f4\u9762\u677f\u8bbe\u7f6e\u7684\u4f2a\u9759\u6001\u89c4\u5219\u5931\u6548\n    include /www/server/panel/vhost/rewrite/120.53.221.250.conf;\n    #REWRITE-END\n    \n    #\u7981\u6b62\u8bbf\u95ee\u7684\u6587\u4ef6\u6216\u76ee\u5f55\n    #location ~ ^/(\\.user.ini|\\.htaccess|\\.git|\\.svn|\\.project|LICENSE|README.md)\n    #{\n    #    return 404;\n    #}\n    \n    #\u4e00\u952e\u7533\u8bf7SSL\u8bc1\u4e66\u9a8c\u8bc1\u76ee\u5f55\u76f8\u5173\u8bbe\u7f6e\n    #location ~ \\.well-known{\n    #    allow all;\n    #}\n    location /.well-known/ {\n        alias /www/wwwroot/test/.well-known/;\n    }\n    \n    \n    #location ~ .*\\.(gif|jpg|jpeg|png|bmp|swf)$\n    #{\n    #    expires      30d;\n    #    error_log off;\n    #    access_log /dev/null;\n    #}\n    \n    #location ~ .*\\.(js|css)?$\n    #{\n    #    expires      12h;\n    #    error_log off;\n    #    access_log /dev/null; \n    #}\n    access_log  /www/wwwlogs/120.53.221.250.log;\n    error_log  /www/wwwlogs/120.53.221.250.error.log;\n}\n")))}_.isMDXComponent=!0}}]);