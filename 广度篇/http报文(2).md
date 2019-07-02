## http报文首部
http协议的请求报文和响应报文必定包含http首部。首部内容为**服务端和服务器**各自处理**请求和响应提供信息**(开发)。报文分为报文头部、空行和报文主体。但是**报文主体是可选**的，如一个GET请求报文中，就没有报文主体：  
![报文结构](/static/http2.png "报文结构")  

### HTTP 请求报文
> 由方法、URI、HTTP 版本、HTTP 首部字段 等部分构成。
如请求百度首页(chrome查看点击对应header旁边view source查看)
```
GET / HTTP/1.1
Host: www.baidu.com
Connection: keep-alive
Pragma: no-cache
Cache-Control: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
...
```
### HTTP 响应报文
> 在响应中，HTTP 报文由 HTTP 版本、状态码（数字和原因短语）、 HTTP 首部字段 3 部分构成。
```
HTTP/1.1 200 OK
Bdpagetype: 1
Bdqid: 0xdfcba8bf001bb2e3
Cache-Control: private
Connection: Keep-Alive
Content-Encoding: br
Content-Type: text/html
Cxy_all: baidu+eb9b36787b2122ab0315d13731e80a24
Date: Tue, 02 Jul 2019 09:43:45 GMT
Expires: Tue, 02 Jul 2019 09:42:54 GMT
Server: BWS/1.1
Set-Cookie: delPer=0; path=/; domain=.baidu.com
Strict-Transport-Security: max-age=172800
Vary: Accept-Encoding
X-Ua-Compatible: IE=Edge,chrome=1
Transfer-Encoding: chunked
```
### HTTP 首部字段作用
> HTTP 首部字段是构成 HTTP 报文的要素之一。在客户端与服务器 之间以 HTTP 协议进行通信的过程中，无论是请求还是响应都会使用首 部字段，它能起到传递额外重要信息的作用。 
使用首部字段是为了给浏览器和服务器提供报文主体大小、所使用 的语言、认证信息等内容。

### 4 种HTTP首部字段类型
- 通用首部字段（General Header Fields）- 请求报文和响应报文两方都会使用的首部。
- 请求首部字段（Request Header Fields） - 从客户端向服务器端发送请求报文时使用的首部。补充了请求的附 加内容、客户端信息、响应内容相关优先级等信息。
- 响应首部字段（Response Header Fields） - 从服务器端向客户端返回响应报文时使用的首部。补充了响应的附 加内容，也会要求客户端附加额外的内容信息。
- 实体首部字段（Entity Header Fields） - 针对请求报文和响应报文的实体部分使用的首部。补充了资源内容 更新时间等与实体有关的信息。

## http首部字段表
### 通用首部字段
| 首部字段名    | 说明                                                            |
| ------------- | --------------------------------------------------------------- |
| Cache-Control | 控制缓存的行为                                                  |
| Connection    | 逐跳首部、连接的管理                                            |
| Date          | 创建报文的日期时间                                              |
| Pragma        | 报文指令                                                        |
| Trailer       | 报文末端的首部一览 Transfer-Encoding 指定报文主体的传输编码方式 |
| Upgrade       | 升级为其他协议                                                  |
| Via           | 代理服务器的相关信息                                            |
| Warning       | 错误通知                                                        |

### 请求首部字段
| 首部字段名          | 说明                                                                                |
| ------------------- | ----------------------------------------------------------------------------------- |
| Accept              | 用户代理可处理的媒体类型 Accept-Charset 优先的字符集 Accept-Encoding 优先的内容编码 |  | Accept-Language | 优先的语言（自然语言） |
| Authorization       | Web认证信息                                                                         |
| Expect              | 期待服务器的特定行为                                                                |
| From                | 用户的电子邮箱地址                                                                  |
| Host                | 请求资源所在服务器                                                                  |
| If-Match            | 比较实体标记（ETag）                                                                |
| If-Modified-Since   | 比较资源的更新时间                                                                  |
| If-None-Match       | 比较实体标记（与If-Match相反）                                                      |
| If-Range            | 资源未更新时发送实体Byte的范围请求                                                  |
| If-Unmodified-Since | 比较资源的更新时间（与If-Modified-Since相反）                                       |
| Max-Forwards        | 最大传输逐跳数                                                                      |
| Proxy-Authorization | 代理服务器要求客户端的认证信息                                                      |
| Range               | 实体的字节范围请求                                                                  |
| Referer             | 对请求中URI的原始获取方                                                             |
| TE                  | 传输编码的优先级 User-Agent HTTP 客户端程序的信息                                   |
| cookie              | 用于保持用户状态与服务端通信                                                        |
### 响应首部字段
| 首部字段名         | 说明                         |
| ------------------ | ---------------------------- |
| Accept-Ranges      | 是否接受字节范围请求         |
| Age                | 推算资源创建经过时间         |
| ETag               | 资源的匹配信息               |
| Location           | 令客户端重定向至指定URI      |
| Proxy-Authenticate | 代理服务器对客户端的认证信息 |
| Retry-After        | 对再次发起请求的时机要求     |
| Server             | HTTP服务器的安装信息         |
| Vary               | 代理服务器缓存的管理信息     |
| WWW-Authenticate   | 服务器对客户端的认证信息     |
| Set-Cookie         | 操作客户端cookie             |

### 实体首部字段
| 首部字段名       | 说明                          |
| ---------------- | ----------------------------- |
| Allow            | 资源可支持的HTTP方法          |
| Content-Encoding | 实体主体适用的编码方式        |
| Content-Language | 实体主体的自然语言            |
| Content-Length   | 实体主体的大小（单位 ：字节） |
| Content-Location | 替代对应资源的URI             |
| Content-MD5      | 实体主体的报文摘要            |
| Content-Range    | 实体主体的位置范围            |
| Content-Type     | 实体主体的媒体类型            |
| Expires          | 实体主体过期的日期时间        |
| Last-Modified    | 资源的最后修改日期时间        |

> 在 HTTP 协议通信交互中使用到的首部字段，不限于 RFC2616 中 定义的 47 种首部字段。还有 Cookie、Set-Cookie 和 Content-Disposition 等在其他 RFC 中定义的首部字段，它们的使用频率也很高。 这些非正式的首部字段统一归纳在 RFC4229 HTTP Header Field Registrations中。
### 端到端首部和逐跳首部
HTTP 首部字段将定义成缓存代理和非缓存代理的行为，分成 2 种 类型。
- 端到端首部（End-to-end Header） 
  分在此类别中的首部会转发给请求 / 响应对应的最终接收目标，且 必须保存在由缓存生成的响应中，另外规定**它必须被转发**。
- 逐跳首部（Hop-by-hop Header） 
  分在此类别中的首部只对单次转发有效，会因通过缓存或代理而不 再转发。HTTP/1.1 和之后版本中，如果要使用 hop-by-hop 首部， 需提供 Connection首部字段。

*HTTP/1.1 中的逐跳首部字段*。除这 8 个首部字段之外， 其他所有字段都属于端到端首部。
- Connection 
- Keep-Alive 
- Proxy-Authenticate 
- Proxy-Authorization 
- Trailer 
- TE 
- Transfer-Encoding 
- Upgrade

## HTTP/1.1通用首部字段详解
请求报文和响应报文双方都会使用的首部(我理解为请求和响应都包含的字段信息)   
**理解前提-是客户端请求服务器资源会从cdn获取**

> 指令的参数是可选的，多个指令之间通过“,”分隔
### Cache-Control
通过指定首部字段Cache-Control的指令，就能操作缓存的工作机制。
```
Cache-Control: private, max-age=0, no-cache
```
- 请求指令   

| 指令                | 参数   | 说明                         |
| ------------------- | ------ | ---------------------------- |
| no-cache            | 无     | 强制向源服务器再次验证       |
| no-store            | 无     | 不缓存请求或响应的任何内容   |
| max-age = [ 秒]     | 必需   | 响应的最大Age值              |
| max-stale( = [ 秒]) | 可省略 | 接收已过期的响应             |
| min-fresh = [ 秒]   | 必需   | 期望在指定时间内的响应仍有效 |
| no-transform        | 无     | 代理不可更改媒体类型         |
| only-if-cached      | 无     | 从缓存获取资源               |
| cache-extension     | -      | 新指令标记（token）          |


- 缓存响应指令   

| 指令             | 参数   | 说明                                           |
| ---------------- | ------ | ---------------------------------------------- |
| public           | 无     | 可向任意方提供响应的缓存                       |
| private          | 可省略 | 仅向特定用户返回响应                           |
| no-cache         | 可省略 | 缓存前必须先确认其有效性                       |
| no-store         | 无     | 不缓存请求或响应的任何内容                     |
| no-transform     | 无     | 代理不可更改媒体类型                           |
| must-revalidate  | 无     | 可缓存但必须再向源服务器进行确认               |
| proxy-revalidate | 无     | 要求中间缓存服务器对缓存的响应有效性再进行确认 |
| max-age = [ 秒]  | 必需   | 响应的最大Age值                                |
| s-maxage = [ 秒] | 必需   | 公共缓存服务器响应的最大Age值                  |
| cache-extension  | -      | 新指令标记（token）                            |

#### 表示是否能缓存的指令
- `public`-当指定使用 public 指令时，则明确表明其他用户也可利用缓存。
- `private`-缓存服务器会对该特定用户提供资源缓存的服务，对于其他用户发 送过来的请求，代理服务器则不会返回缓存。
- `no-cache`-目的是为了防止从缓存中返回过期的资源。 
  > 客户端发送的请求中如果包含no-cache指令，则表示客户端将不会 接收缓存过的响应。于是，“中间”的缓存服务器必须把客户端请求转发 给源服务器。   
  > 如果服务器返回的响应中包含no-cache指令，那么缓存服务器不能 对资源进行缓存。源服务器以后也将不再对缓存服务器请求中提出的资 源有效性进行确认，且禁止其对响应资源进行缓存操作。   
  **事实上no-cache代表不 缓存过期的资源，缓存会向源服务器进行有效期确认后处理资源**
```
Cache-Control: no-cache=Location
由服务器返回的响应中，若报文首部字段 Cache-Control 中对 nocache 字段名具体指定参数值，那么客户端在接收到这个被指定参数值 的首部字段对应的响应报文后，就不能使用缓存。换言之，无参数值的 首部字段可以使用缓存。只能在响应指令中指定该参数。
```
#### 控制可执行缓存的对象的指令
- `no-store`-规定缓存不能在本地存储请求或响应的任一部分。当使用 no-store 指令时，暗示请求（和对应的响应）或响应中包含机密信息。 

#### 指定缓存期限和认证的指令 
- `max-age`-当客户端发送的请求中包含 max-age 指令时，如果判定缓存资源的缓存时间数值比指定时间的数值更小，那么客户端就接收缓存的资源。 另外，当指定 max-age 值为 0，那么缓存服务器通常需要将请求转发给 源服务器。 
  >应用 HTTP/1.1 版本的缓存服务器遇到同时存在 Expires 首部字段的 情况时，**会优先处理 max-age 指令**，而忽略掉 Expires 首部字段。而 HTTP/1.0 版本的缓存服务器的情况却相反，max-age指令会被忽略掉。
- `s-maxage`-功能和 max-age 指令的相同,对于向同一用户重复返回响应的服务器来说，这个指令没有任何作用。
  > 当使用 s-maxage 指令后，则**直接忽略**对 Expires 首部字段及 max-age指令的处理。
- `min-fresh`-要求缓存服务器返回至少还未过指定时间的缓存资源,`Cache-Control: min-fresh=60（单位 ：秒）`:在这 60 秒以内如果有超过有 效期限的资源都无法作为响应返回。
- `max-stale`-指示缓存资源即使过期也照常接收。如果指令未指定参数值，那么无论经过多久，客户端都会接收响应； 如果指令中指定了具体数值，那么即使过期，只要仍处于max-stale指定 的时间内，仍旧会被客户端接收。
- `only-if-cached`-缓存服务器不重新 加载响应，也不会再次确认资源有效性。若发生请求缓存服务器的本地 缓存无响应，则返回状态码 504 Gateway Timeout。
- `must-revalidate`-代理会向源服务器再次验证即将返回的 响应缓存目前是否仍然有效。 
- `proxy-revalidate`-所有的缓存服务器在接收到客户端带有该 指令的请求返回响应之前，必须再次验证缓存的有效性。
- `no-transform`-无论是在请求还是响应中，缓存都不能 改变实体主体的媒体类型。**可防止缓存或代理压缩图片等类似操作**  
  
#### Cache-Control 扩展 
cache-extension token
```
Cache-Control: private, community="UCI"
```
通过 cache-extension标记（token），可以扩展 Cache-Control首部字 段内的指令。    
如上例，Cache-Control首部字段本身没有 community这个指令。借 助 extension tokens 实现了该指令的添加。如果缓存服务器不能理解 community 这个新指令，就会直接忽略。因此，extension tokens 仅对能 理解它的缓存服务器来说是有意义的。


#### 缓存分类
[参考](https://www.jianshu.com/p/4f07740d68e4)
##### 强缓存
强缓存在客户端和服务器端都会存在。   
客户端：客户端在请求资源前，会检查上一次该资源响应头的Cache-Control字段，如果该字段的值为max-age=time(大于0的毫秒数)，如果该资源缓存的时间没有过这个时间值，则直接使用本地的缓存，而不像服务器发请求。     
服务器端：服务器端在接收到一个请求后，如果该请求的头部Cache-Control字段的值为max-age=time(大于0的毫秒数)，如果距离上一次返回资源的时间小于这个毫秒数，那么服务器不会读取新的资源，而是直接返回304，告知客户端使用自己本地上次缓存的资源即可。      
>注：这两种情况，其实归根结底最后都是使用的客户端本地的资源，服务器没有返回资源实体。这样的好处是节省请求次数或者请求流量，但缺点是，如果在max-age时间内服务器资源有更新，客户端无法得到最新的服务器资源。此时可以通过Ctrl+F5强制刷新(其实就是设置一个Cache-Control:no-cache的请求头)，获得最新的服务器资源。

##### 协商缓存（对比缓存）
对比缓存值存在于服务器端。    
在没有走强缓存逻辑的情况下，服务器端会进行Last-Modified和Etag的校验，如果校验发现资源未更新，则会返回304，否则会返回新的资源实体。   


web安全
1. [点击劫持攻击](https://baike.baidu.com/item/%E7%82%B9%E5%87%BB%E5%8A%AB%E6%8C%81/6742958?fr=aladdin)，x-frame-option 控制是否允许被跨域资源iframe引入
2. [XSS攻击](https://baike.baidu.com/item/XSS%E6%94%BB%E5%87%BB/954065?fr=aladdin)其原理是攻击者向有XSS漏洞的网站中输入(传入)恶意的HTML或者JS代码，当其它用户浏览该网站时，这段HTML代码会自动执行，从而达到攻击的目的。[博客](https://www.cnblogs.com/hellojesson/p/6386002.html)ba