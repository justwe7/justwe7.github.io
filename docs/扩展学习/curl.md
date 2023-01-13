# curl操作速查
> cURL(Command Line URL viewer)是一种命令行工具，开发人员使用它来向服务器传输数据和从服务器传输数据。 在最基本的情况下，cURL 允许您通过指定位置（以 URL 的形式）和要发送的数据来与服务器通信。 cURL 支持多种不同的协议，包括 HTTP 和 HTTPS，并且几乎可以在所有平台上运行。 这使得 cURL 非常适合测试从本地服务器到大多数边缘设备的几乎任何设备（只要它具有命令行和网络连接）的通信。
>
和浏览器发起的网络请求本质上没有区别，测试发现默认发起的请求中 request header 的 `user-agent` 值为 `curl/` 开头的字段

可以用来调试web程序，或者写在 `shell` 中定时发送请求执行任务

## 功能介绍
### 查看网页源码
```
curl 'https://lihx.top'
```

### 下载网页(-o)
携带 `-o` 参数可以将网站下载至命令行执行目录: `curl -o [filename] url`

```
curl -o a.html 'https://justwe7.github.io/%E5%BC%B9%E6%80%A7%E7%9B%92%E6%A8%A1%E5%9E%8B/%E5%9C%A3%E6%9D%AF.html'
```

![image1ff37.png](https://image.littl.cn/images/2021/09/26/image1ff37.png)

### 自动跳转(-L)
使用`-L`参数，curl就会跳转到新的网址: `curl -L url`

### 显示response头(-i)
`-i`参数可以显示http response的头信息，连同网页代码一起
```bash
$ curl -i www.xxx.com

HTTP/1.1 301 Moved Permanently
Server: NWS_TCloud_S2
Connection: keep-alive
Date: Sun, 26 Sep 2021 09:08:08 GMT
Content-Length: 22
Location: https://www.xxx.com/
X-Via: DIANXIN-GUANGDONG_163(301:hit)
```
> `-I`参数则是只显示http response的头信息

### 显示通信过程(-v)
`-v`参数可以显示一次http通信的整个过程，包括端口连接和http request头信息
```
$ curl -v www.xxx.com
*   Trying 103.18.2xx.105...
* TCP_NODELAY set
* Connected to www.xxx.com (103.18.2xx.105) port 80 (#0)
> GET / HTTP/1.1
> Host: www.xxx.com
> User-Agent: curl/7.64.1
> Accept: */*
>
< HTTP/1.1 301 Moved Permanently
< Server: NWS_TCloud_S2
< Connection: keep-alive
< Date: Sun, 26 Sep 2021 09:09:40 GMT
< Content-Length: 22
< Location: https://www.xxx.com/
< X-Via: DIANXIN-BEIJING_17(301:hit)
<
* Connection #0 to host www.xxx.com left intact
The actual URL is '/'.* Closing connection 0
```

**查看更详细的通信过程(`--trace`)：**
```bash
curl --trace output.txt baidu.com
或者
curl --trace-ascii output.txt baidu.com
```
会生成`output.txt`文件


### 请求类型(-X)
curl 默认的请求类型是`GET`，可以通过`-X`参数修改: `curl -X POST baidu.com`

### 携带cookie(--cookie)
使用`--cookie`参数，可以让curl发送cookie: `curl --cookie "key=value" www.example.com`

> `-c cookie-file`可以保存服务器返回的cookie到文件，`-b cookie-file`可以使用这个文件作为cookie信息，进行后续的请求:
> ```
> $ curl -c cookies http://example.com #保存
> $ curl -b cookies http://example.com #携带并发送
> ```

### 增加请求头(--header或-H)
在http request之中，自行增加一个头信息，使用`--header`参数: 
`curl --header "Content-Type:application/json" http://example.com`

### 模拟UA
模拟移动端ua发起请求: `curl --user-agent "[User Agent]" [URL]`

模拟ip6p:
```
curl --user-agent "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/93.0.4577.82" www.qq.com
```

### referer
指定发起请求的来源:
`curl --referer http://ref.com https://baidu.com`

### 提交表单
#### GET请求
get请求参数是携带在query中的: `curl qq.com?k1=v1&k2&v2`

```
curl https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=48_CQ9_CFapWcXVOycjcRNS9H0xzifG9EaSjG938Hl8eZrhNp8BmKwgqvtAUQh8zjrsIngFV7KM5Fyi76CkBpzTUkmoT8SWdYuyqO0-8G9hjUBfmimh5aOnSlFvqVpP6FQBiL0mBNGu0qdpvcfnLXJiAJAPBN
```

#### POST请求
`curl -X POST --data "data=xxx" example.com/v1/api`

**编码后发送**  
如果你的数据没有经过表单编码，还可以让curl为你编码，参数是`--data-urlencode`: 
```
curl -X POST--data-urlencode "date=April 1" example.com/v1/api
```

**发送JSON数据**
```
curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"phone": "15544443333"}' xx.com/v1/api
```

### 文件上传
假定文件上传的表单是下面这样：
```
<form method="POST" enctype='multipart/form-data' action="upload.cgi">
  <input type=file name=upload>
  <input type=submit name=press value="OK">
</form>
```

可以用curl这样上传文件： `curl --form upload=@localfilename --form press=OK [URL]`

### http认证
有些网域需要HTTP认证，这时curl需要用到`--user`参数: `curl --user name:password example.com`

## 参数介绍
### -A(指定ua)
> 指定user-agent。curl 的默认用户代理字符串是curl/[version]

- 将ua指定为iPhone6p: 
  ```
  curl -A "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/93.0.4577.82" www.qq.com
  ```
- 或者通过`-H`指定 `User-Agent` 请求头 
  ```
  curl -H 'User-Agent: win10' https://google.com
  ```

### -b(携带cookie)
用来向服务器发送 Cookie: 
```
curl -b 'foo=bar' https://google.com
```
上面命令会生成一个标头Cookie: foo=bar，向服务器发送一个名为foo、值为bar的 Cookie。

发送多个 Cookie: 
```
curl -b 'foo1=bar;foo2=bar2' https://google.com
```

读取本地文件cookies.txt，里面是服务器设置的 Cookie（参见-c参数），将其发送到服务器: 
```
curl -b cookies.txt https://www.google.com
```

### -c(保存cookie)
将服务器设置的 Cookie 写入一个文件: 
```
curl -c cookies.txt https://www.google.com
```

上面命令将服务器的 HTTP 响应所设置 Cookie 写入文本文件cookies.txt。

### -d(请求体)
> -d参数用于发送 POST 请求体

使用-d参数以后，HTTP 请求会自动加上标头Content-Type : application/x-www-form-urlencoded。并且会自动将请求转为 POST 方法，因此可以省略-X POST。
```
$ curl -d'login=emma＆password=123'-X POST https://google.com/login
# 或者
$ curl -d 'login=emma' -d 'password=123' -X POST  https://google.com/login
```

`-d` 参数可以读取本地文本文件的数据，向服务器发送: 
```
curl -d '@data.txt' https://google.com/login
```

上面命令读取data.txt文件的内容，作为数据体向服务器发送。

### --data-urlencode(添加请求体)
> `--data-urlencode`参数等同于`-d`，发送 POST 请求的数据体，区别在于**会自动将发送的数据进行 URL 编码**。

发送的数据hello world之间有一个空格，需要进行 URL 编码: 
```
curl --data-urlencode 'comment=hello world' https://google.com/login
```

### -e(指定referer)
> `-e` 参数用来设置 HTTP 的标头Referer，表示请求的来源。

将Referer标头设为`https://google.com?q=example`: 
```
curl -e 'https://google.com?q=example' https://www.example.com
```

`-H` 参数可以通过直接添加请求头`Referer`，达到同样效果: 
```
curl -H 'Referer: https://google.com?q=example' https://www.example.com
```

### -F(上传二进制文件)
> `-F` 参数用来向服务器上传二进制文件

会给 HTTP 请求加上标头Content-Type: multipart/form-data，然后将文件photo.png作为file字段上传: 
```
curl -F 'file=@photo.png' https://google.com/profile
```

指定 MIME 类型:
```
curl -F 'file=@photo.png;type=image/png' https://google.com/profile
```
上面命令指定 MIME 类型为 `image/png`，否则 curl 会把 MIME 类型设 `为application/octet-stream`

指定文件名:
```
curl -F 'file=@photo.png;filename=me.png' https://google.com/profile
```
上面命令中，原始文件名为photo.png，但是服务器接收到的文件名为me.png

### -G(设置query)
> `-G` 参数用来构造 URL 的查询字符串

```
发起 GET 请求，实际请求的 URL 为`https://google.com/search?q=kitties&count=20`。如果省略--G，会发出一个 POST 请求:
$ curl -G -d 'q=kitties' -d 'count=20' https://google.com/search

如果数据需要 URL 编码，可以结合--data--urlencode参数:
$ curl -G --data-urlencode 'comment=hello world' https://www.example.com
```

### -H(添加请求头)
> `-H` 参数添加 HTTP 请求的标头

```
添加 HTTP 标头Accept-Language: en-US:
$ curl -H 'Accept-Language: en-US' https://google.com

添加两个 HTTP 标头:
$ curl -H 'Accept-Language: en-US' -H 'Secret-Message: xyzzy' https://google.com

添加 HTTP 请求的标头是Content-Type: application/json，然后用 `-d` 参数发送 JSON 数据:
$ curl -d '{"login": "emma", "pass": "123"}' -H 'Content-Type: application/json' https://google.com/login
```

### -i(输出响应头)
> `-i` 参数打印出服务器响应头

```
收到服务器响应后，先输出服务器响应的标头，然后空一行，再输出网页的源码。
$ curl -i https://www.example.com
```

### -I(输出响应头)
> `-I` 参数向服务器发出 HEAD 请求，然会将服务器返回的 HTTP 标头打印出来

```
输出服务器对 HEAD 请求的响应:
$ curl -I https://www.example.com
```
**--head参数等同于-I**: 
```
curl --head https://www.example.com
```

### -k(跳过https检测)
> `-k` 参数指定跳过 SSL 检测，不会检查服务器的 SSL 证书是否正确: 
```
curl -k https://www.example.com
```

### -L(允许重定向)
> `-L` 参数会让 HTTP 请求跟随服务器的重定向。curl 默认不跟随重定向:
```
curl -L -d 'tweet=hi' https://api.twitter.com/tweet
```

### --limit-rate(限速)
> `--limit-rate` 用来限制 HTTP 请求和响应的带宽，模拟慢网速的环境。

将带宽限制在每秒 200K 字节: 
```
curl --limit-rate 200k https://google.com
```

### -o(保存文件)
> `-o` 参数将服务器的响应保存成文件，等同于wget命令。

`www.example.com`保存成`example.html`: 
`curl -o example.html https://www.example.com`

### -O(保存内容)
> `-O` 参数将服务器响应保存成文件，并将 URL 的最后部分当作文件名

服务器响应保存成文件，文件名为bar.html:
```
curl -O https://www.example.com/foo/bar.html
```

### -s(查错)
> `-s`参数将不输出错误和进度信息

一旦发生错误，不会显示错误信息。不发生错误的话，会正常显示运行结果:
```
curl -s https://www.example.com
```

如果想让 curl 不产生任何输出，可以使用下面的命令:
```
curl -s -o /dev/null https://google.com
```

### -S(查错)
> `-S` 参数指定只输出错误信息，通常与 `-s` 一起使用。

命令没有任何输出，除非发生错误: `curl -s -o /dev/null https://google.com`

### -u(认证)
> `-u` 参数用来设置服务器认证的用户名和密码

设置用户名为bob，密码为12345，然后将其转为 HTTP 标头Authorization: Basic Ym9iOjEyMzQ1: 
```
curl -u 'bob:12345' https://google.com/login
```

curl 能够识别 URL 里面的用户名和密码: 
```
curl https://bob:12345@google.com/login
```
上面命令能够识别 URL 里面的用户名和密码，将其转为上个例子里面的 HTTP 标头。

设置用户名，执行后，curl 会提示用户输入密码: 
```
curl -u 'bob' https://google.com/login
```

### -v(通信过程)
> `-v` 参数输出通信的整个过程，用于调试。

--trace参数也可以用于调试，还会输出原始的二进制数据:
```
curl -v https://www.example.com
或
curl --trace - https://www.example.com
```

### -x(代理)
> `-x` 参数指定 HTTP 请求的代理。

指定 HTTP 请求通过myproxy.com:8080的 socks5 代理发出: 
```
curl -x socks5://james:cats@myproxy.com:8080 https://www.example.com
```

如果没有指定代理协议，默认为 HTTP协议: 
```
curl -x james:cats@myproxy.com:8080 https://www.example.com
```

### -X(请求类型)
> `-X` 参数指定 HTTP 请求的方法: `curl -X POST https://www.example.com`

## 参考
[curl网站开发指南](https://www.ruanyifeng.com/blog/2011/09/curl.html)
[curl用法指南](https://www.ruanyifeng.com/blog/2019/09/curl-reference.html)