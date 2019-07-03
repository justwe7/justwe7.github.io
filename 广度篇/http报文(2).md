- [http报文首部](#http%E6%8A%A5%E6%96%87%E9%A6%96%E9%83%A8)
  - [HTTP 请求报文](#HTTP-%E8%AF%B7%E6%B1%82%E6%8A%A5%E6%96%87)
  - [HTTP 响应报文](#HTTP-%E5%93%8D%E5%BA%94%E6%8A%A5%E6%96%87)
  - [HTTP 首部字段作用](#HTTP-%E9%A6%96%E9%83%A8%E5%AD%97%E6%AE%B5%E4%BD%9C%E7%94%A8)
  - [4 种HTTP首部字段类型](#4-%E7%A7%8DHTTP%E9%A6%96%E9%83%A8%E5%AD%97%E6%AE%B5%E7%B1%BB%E5%9E%8B)
  - [Chrome响应首部出现Provisional headers are shown](#Chrome%E5%93%8D%E5%BA%94%E9%A6%96%E9%83%A8%E5%87%BA%E7%8E%B0Provisional-headers-are-shown)
- [http首部字段表](#http%E9%A6%96%E9%83%A8%E5%AD%97%E6%AE%B5%E8%A1%A8)
  - [通用首部字段](#%E9%80%9A%E7%94%A8%E9%A6%96%E9%83%A8%E5%AD%97%E6%AE%B5)
  - [请求首部字段](#%E8%AF%B7%E6%B1%82%E9%A6%96%E9%83%A8%E5%AD%97%E6%AE%B5)
  - [响应首部字段](#%E5%93%8D%E5%BA%94%E9%A6%96%E9%83%A8%E5%AD%97%E6%AE%B5)
  - [实体首部字段](#%E5%AE%9E%E4%BD%93%E9%A6%96%E9%83%A8%E5%AD%97%E6%AE%B5)
  - [端到端首部和逐跳首部](#%E7%AB%AF%E5%88%B0%E7%AB%AF%E9%A6%96%E9%83%A8%E5%92%8C%E9%80%90%E8%B7%B3%E9%A6%96%E9%83%A8)
- [HTTP/1.1通用首部字段详解](#HTTP11%E9%80%9A%E7%94%A8%E9%A6%96%E9%83%A8%E5%AD%97%E6%AE%B5%E8%AF%A6%E8%A7%A3)
  - [Cache-Control](#Cache-Control)
    - [表示是否能缓存的指令](#%E8%A1%A8%E7%A4%BA%E6%98%AF%E5%90%A6%E8%83%BD%E7%BC%93%E5%AD%98%E7%9A%84%E6%8C%87%E4%BB%A4)
    - [控制可执行缓存的对象的指令](#%E6%8E%A7%E5%88%B6%E5%8F%AF%E6%89%A7%E8%A1%8C%E7%BC%93%E5%AD%98%E7%9A%84%E5%AF%B9%E8%B1%A1%E7%9A%84%E6%8C%87%E4%BB%A4)
    - [指定缓存期限和认证的指令](#%E6%8C%87%E5%AE%9A%E7%BC%93%E5%AD%98%E6%9C%9F%E9%99%90%E5%92%8C%E8%AE%A4%E8%AF%81%E7%9A%84%E6%8C%87%E4%BB%A4)
    - [Cache-Control 扩展](#Cache-Control-%E6%89%A9%E5%B1%95)
  - [Connection](#Connection)
  - [Upgrade](#Upgrade)
- [请求首部字段详解](#%E8%AF%B7%E6%B1%82%E9%A6%96%E9%83%A8%E5%AD%97%E6%AE%B5%E8%AF%A6%E8%A7%A3)
  - [Accept](#Accept)
  - [Accept-Encoding](#Accept-Encoding)
  - [If-XXXXX (条件请求)](#If-XXXXX-%E6%9D%A1%E4%BB%B6%E8%AF%B7%E6%B1%82)
    - [If-Match](#If-Match)
    - [If-Modified-Since](#If-Modified-Since)
    - [If-None-Match](#If-None-Match)
    - [If-Range](#If-Range)
    - [If-Unmodified-Since](#If-Unmodified-Since)
  - [Range](#Range)
  - [Cookie](#Cookie)
- [响应首部字段详解](#%E5%93%8D%E5%BA%94%E9%A6%96%E9%83%A8%E5%AD%97%E6%AE%B5%E8%AF%A6%E8%A7%A3)
  - [ETag](#ETag)
    - [强ETag 值](#%E5%BC%BAETag-%E5%80%BC)
    - [弱ETag 值](#%E5%BC%B1ETag-%E5%80%BC)
  - [Location](#Location)
  - [Vary](#Vary)
  - [Set-Cookie](#Set-Cookie)
- [实体首部字段详解](#%E5%AE%9E%E4%BD%93%E9%A6%96%E9%83%A8%E5%AD%97%E6%AE%B5%E8%AF%A6%E8%A7%A3)
  - [Expires](#Expires)
  - [Last-Modified](#Last-Modified)
- [其他首部字段](#%E5%85%B6%E4%BB%96%E9%A6%96%E9%83%A8%E5%AD%97%E6%AE%B5)
  - [X-Frame-Options](#X-Frame-Options)
  - [X-XSS-Protection](#X-XSS-Protection)
  - [DNT](#DNT)
  - [P3P](#P3P)
  - [部分web安全常识](#%E9%83%A8%E5%88%86web%E5%AE%89%E5%85%A8%E5%B8%B8%E8%AF%86)
- [浏览器缓存](#%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98)
      - [强缓存](#%E5%BC%BA%E7%BC%93%E5%AD%98)
        - [浏览器是根据什么决定「from disk cache」与「from memory cache」详情](#%E6%B5%8F%E8%A7%88%E5%99%A8%E6%98%AF%E6%A0%B9%E6%8D%AE%E4%BB%80%E4%B9%88%E5%86%B3%E5%AE%9Afrom-disk-cache%E4%B8%8Efrom-memory-cache%E8%AF%A6%E6%83%85)
      - [协商缓存（对比缓存）](#%E5%8D%8F%E5%95%86%E7%BC%93%E5%AD%98%E5%AF%B9%E6%AF%94%E7%BC%93%E5%AD%98)


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

### Chrome响应首部出现Provisional headers are shown
1. 强缓存from disk cache或者from memory cache。清空缓存操作： 调试模式打开->刷新按钮右键->清空缓存并硬性重新加载 或者 ctrl+F5
2. 服务器出错或者超时，没有真正的返回
3. 请求被浏览器插件拦截
4. 跨域，请求被浏览器拦截  

## http首部字段表
注：个人理解-前缀带※可能会涉及到性能优化方面  
### 通用首部字段
| 首部字段名        | 说明                                                                                                                                                                       |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ※Cache-Control    | 控制缓存的行为                                                                                                                                                             |
| Connection        | 逐跳首部、连接的管理                                                                                                                                                       |
| Date              | 创建报文的日期时间                                                                                                                                                         |
| Pragma            | 报文指令(是 HTTP/1.1 之前版本的历史遗留字段，仅作为与 HTTP/1.0 的向后兼容而定义。 只用在客户端发送的请求中。客 户端会要求所有的中间服务器不返回缓存的资源。)               |
| Trailer           | 报文末端的首部一览 Transfer-Encoding 指定报文主体的传输编码方式(事先说明在报文主体后记录了哪些首部字段。该首部字段可应用在 HTTP/1.1 版本分块传输编码/*上传*时。)           |
| Upgrade           | 升级为其他协议( 用于检测 HTTP 协议及其他协议是否可使用更高 的版本进行通信)                                                                                                 |
| Via               | 代理服务器的相关信息(追踪客户端与服务器之间的请求和响应报 文的传输路径。) 每经过一层转发会在Via首部附加信息,Via 首部是为了追踪传输路径，所以经常会和 TRACE 方法一起使 用。 |
| Warning           | 错误通知,通常会告知用户一些与缓存相关的问题的警告。 `Warning: [警告码][警告的主机:端口号]“[警告内容]”([日期时间]) `                                                        |
| Transfer-Encoding | 规定了传输报文主体时采用的编码 方式。HTTP/1.1 的传输编码方式仅对分块传输编码有效。                                                                                         |

### 请求首部字段
| 首部字段名           | 说明                                                                                                                                                                          |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accept               | 用户代理可处理的媒体类型,可一次性指定多种字符集,用权重 q 值来表示相对优先级。                                                                                                 |
| Accept-Charset       | 优先的字符集 (用来通知服务器用户代理支持的字符集 及字符集的相对优先顺序 utf-8)                                                                                                |
| ※Accept-Encoding     | 优先的内容编码(性能优化)                                                                                                                                                      |
| Accept-Language      | 优先的语言。用来告知服务器用户代理能够处理的自 然语言集（指中文或英文等），以及自然语言集的相对优先级。可一次 指定多种自然语言集                                              |
| Authorization        | Web认证信息 (来告知服务器，用户代理的认证信息 （证书值）)                                                                                                                     |
| Expect               | 期待服务器的特定行为                                                                                                                                                          |
| From                 | 用户的电子邮箱地址 (为了显示搜索引擎等用户代理的负责人的 电子邮件联系方式)                                                                                                    |
| Host                 | Host 会告知服务器，请求的资源所处的互联网主机名和端口号。(HTTP/1.1唯一一个**必须被包含在请求内**的首部字段,若服务器未设定主机名，那直接发送一个空值即可)                      |
| ※If-Match            | 比较实体标记（ETag）                                                                                                                                                          |
| ※If-Modified-Since   | 比较资源的更新时间                                                                                                                                                            |
| ※If-None-Match       | 比较实体标记（与If-Match相反）                                                                                                                                                |
| ※If-Range            | 资源未更新时发送实体Byte的范围请求                                                                                                                                            |
| ※If-Unmodified-Since | 比较资源的更新时间（与If-Modified-Since相反）                                                                                                                                 |
| Max-Forwards         | 最大传输逐跳数(服务器在往下一个服务器转发请求之前，会将 Max-Forwards 的 值减 1 后重新赋值)                                                                                    |
| Proxy-Authorization  | 代理服务器要求客户端的认证信息                                                                                                                                                |
| Range                | 实体的字节范围请求                                                                                                                                                            |
| Referer              | 告知服务器请求的原始资源的 URI (出于安全性的考虑时，也可以不发送该首部 字段。 )                                                                                               |
| TE                   | 传输编码的优先级,User-Agent HTTP 客户端程序的信息 (告知服务器客户端能够处理响应的传输编码方式及 相对优先级。它*和首部字段 Accept-Encoding 的功能很相像*，但是用于 传输编码。) |
| User-Agent           | 创建请求的浏览器和用户代理名称等信息 传达给服务器                                                                                                                             |
| cookie               | 用于保持用户状态与服务端通信  (服务器接收到的Cookie信息 )                                                                                                                     |
### 响应首部字段
| 首部字段名         | 说明                                                                                                                                                                                                                   |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accept-Ranges      | 是否接受字节范围请求(告知客户端服务器是否能处理范围 请求，以指定获取服务器端某个部分的资源。 )                                                                                                                         |
| Age                | 推算资源创建经过时间(告知客户端，源服务器在多久前创建了响应。字段 值的单位为秒。)                                                                                                                                      |
| ※ETag              | 资源的匹配信息                                                                                                                                                                                                         |
| Location           | 令客户端重定向至指定URI                                                                                                                                                                                                |
| Proxy-Authenticate | 代理服务器对客户端的认证信息(把由代理服务器所要求的认证信息 发送给客户端。)                                                                                                                                            |
| Retry-After        | 告知客户端应该在多久之后再次发送请求。主要配合状态码 503 Service Unavailable 响应，或 3xx Redirect 响应一起使用。(字段值可以指定为具体的日期时间（Wed, 04 Jul 2012 06：34：24 GMT 等格式），也可以是创建响应后的秒数。 |
| )                  |
| Server             | 告知客户端当前服务器上安装的 HTTP 服务器应用 程序的信息。不单单会标出服务器上的软件应用名称，还有可能包括版 本号和安装时启用的可选项。 (`Server: Apache/2.2.6 (Unix) PHP/5.2.5`)                                       |
| ※Vary              | 代理服务器缓存的管理信息                                                                                                                                                                                               |
| WWW-Authenticate   | 服务器对客户端的认证信息 (会告知客户 端适用于访问请求 URI 所指定资源的认证方案（Basic 或是 Digest）和 带参数提示的质询（challenge）。状态码 401 Unauthorized 响应中，肯定 带有首部字段 WWW-Authenticate。)             |
| Set-Cookie         | 操作客户端cookie (开始状态管理所使用的Cookie)                                                                                                                                                                          |

### 实体首部字段
| 首部字段名       | 说明                                                                                                                                                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Allow            | 资源可支持的HTTP方法(通知客户端能够支持 Request-URI 指定资源的 所有 HTTP 方法。当服务器接收到不支持的 HTTP 方法时，会以状态码 405 Method Not Allowed 作为响应返回。与此同时，还会把所有能支持 的 HTTP 方法写入首部字段 Allow 后返回。 |
| )                |
| Content-Encoding | 实体主体适用的编码方式 (告知客户端服务器对实体的主体部分 选用的内容编码方式。内容编码是指在不丢失实体信息的前提下所进行 的压缩。                                                                                                      |
| )                |
| Content-Language | 实体主体的自然语言                                                                                                                                                                                                                    |
| Content-Length   | 实体主体的大小（单位 ：字节）                                                                                                                                                                                                         |
| Content-Location | 替代对应资源的URI (给出与报文主体部分相对应的 URI。和 首部字段 Location 不同，Content-Location 表示的是报文主体返回资源 对应的 URI。 )                                                                                                |
| Content-MD5      | 实体主体的报文摘要 (检查报文主体在传输过程中是否保持完整，以及确认传输到达)                                                                                                                                                           |
| Content-Range    | 实体主体的位置范围 (告 知客户端作为响应返回的实体的哪个部分符合范围请求)                                                                                                                                                              |
| Content-Type     | 实体主体的媒体类型                                                                                                                                                                                                                    |
| ※Expires         | 实体主体过期的日期时间                                                                                                                                                                                                                |
| ※Last-Modified   | 资源的最后修改日期时间                                                                                                                                                                                                                |

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

### Connection
- 控制不再转发给代理的首部字段    
在客户端发送请求和服务器返回响应内，使用 Connection 首部字 段，可控制不再转发给代理的首部字段（即 Hop-by-hop 首部）。
- 管理持久连接[概念](https://cloud.tencent.com/developer/article/1120189)
HTTP/1.1 版本的默认连接都是持久连接。为此，客户端会在持久 连接上连续发送请求。当服务器端想明确断开连接时，则指定 Connection首部字段的值为 Close。如果想在旧版本的 HTTP 协议上维持持续连接，则需要指定 Connection 首部字段的值为 Keep-Alive。

### Upgrade
用于检测 HTTP 协议及其他协议是否可使用更高 的版本进行通信，其参数值可以用来指定一个完全不同的通信协议。
```
request:
GET /index.htm HTTP/1.1 
Upgrade: TLS/1.0 
Connection: Upgrade

response:
HTTP/1.1 101 Switching Protocols 
Upgrade: TLS/1.0, HTTP/1.1 
Connection: Upgrade

首部字段 Upgrade 指定的值为 TLS/1.0。请注意此处 两个字段首部字段的对应关系，Connection 的值被指定为 Upgrade。 Upgrade 首部字段产生作用的 Upgrade 对象仅限于客户端和邻接服务器之间。因此，使用首部字段 Upgrade 时，还需要额外指定 Connection: Upgrade。 对于附有首部字段 Upgrade 的请求，服务器可用 101 Switching Protocols 状态码作为响应返回。
```

## 请求首部字段详解
从客户端往服务器端发送请求报文中所使用的字 段，用于补充请求的附加信息、客户端信息、对响应内容相关的优先级 等内容。
### Accept
通知服务器，用户代理能够处理的媒体类型及媒体类型的相对优先级。可使用type/subtype这种形式，一次指定多种媒体类型。  
`Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8`  
- 文本文件 text/html, text/plain, text/css ... application/xhtml+xml, application/xml ... 
- 图片文件 image/jpeg, image/gif, image/png ... 
- 视频文件 video/mpeg, video/quicktime ... 
- 应用程序使用的二进制文件 application/octet-stream, application/zip ...

### Accept-Encoding
用来告知服务器用户代理支持的内容编 码及内容编码的优先级顺序。可一次性指定多种内容编码。 采用权重 q 值来表示相对优先级，这点与首部字段 Accept 相同。 
- `gzip`-由文件压缩程序 gzip（GNU zip）生成的编码格式（RFC1952）， 采用 Lempel-Ziv 算法（LZ77）及 32 位循环冗余校验（Cyclic Redundancy Check，通称CRC）。 
- `compress`-由 UNIX 文件压缩程序 compress 生成的编码格式，采用 LempelZiv-Welch 算法（LZW）。 
- `deflate`-组合使用zlib格式（RFC1950）及由deflate压缩算法（RFC1951） 生成的编码格式。
- `identity`-不执行压缩或不会变化的默认编码格式

### If-XXXXX (条件请求)
> 形如 If-xxx 这种样式的请求首部字段，都可称为条件请求。服 务器接收到附带条件的请求后，只有判断指定条件为真时，才会执行请求
#### If-Match
它会告知服务器匹配资源所用的实体标记（ETag）值。这时的服务器无法使用弱 ETag 值。 
服务器会比对If-Match的字段值和资源的ETag值，仅当**两者一致时，才会执行请求**。反之，则返回状态码412 Precondition Failed的响应。    
还可以使用星号（*）指定 If-Match 的字段值。针对这种情况，服 务器将会忽略 ETag 的值，只要资源存在就处理请求。

#### If-Modified-Since
告知服务器若 If-Modified-Since 字段值*早于资源的更新时间能处理该请求*，而在指定 If-Modified-Since 字段值的日期时间之后，如果请求的资源都没有过更新，则返回状态码 304 Not Modified 的响应。 

#### If-None-Match
用于指定 If-None-Match 字段值的实体标记（ETag） 值**与请求资源的 ETag 不一致时告知服务器处理**该请求。 在 GET 或 HEAD 方法中使用首部字段 If-None-Match 可获取最新 的资源。因此，这与使用首部字段 If-Modified-Since时有些类似。

#### If-Range
告知服务器若指定的 If-Range 字段值（ETag 值或者时间）和请求资源的 ETag 值或时间相一 致时，则作为范围请求处理。反之，则返回全部资源。

#### If-Unmodified-Since
指定的请求资源只有在字段值内指 定的日期时间之后，未发生更新的情况下，才能处理请求。如果在指定日期时间后发生了更新，则以状态码 412 Precondition Failed 作为响 应返回。*与If-Modified-Since相反*。

### Range
接收到附带 Range 首部字段请求的服务器，会在处理请求之后返回 状态码为 206 Partial Content 的响应。无法处理该范围请求时，则会返 回状态码 200 OK 的响应及全部资源
```
Range: bytes=5001-10000
对于只需获取部分资源的范围请求，包含首部字段 Range 即可告知 服务器资源的指定范围。上面的示例表示请求获取从第 5001 字节至第 10000 字节的资源。 
```

### Cookie
告知服务器，当客户端想获得 HTTP 状态管理 支持时，就会在请求中包含从服务器接收到的 Cookie。接收到多个 Cookie 时，同样可以以多个 Cookie 形式发送。


## 响应首部字段详解
### ETag
告知客户端实体标识。它是一种可将资源以字符 串形式做唯一性标识的方式。服务器会为每份资源分配对应的 ETag 值。 *当资源更新时，ETag 值也需要更新*。生成 ETag 值没有统一的算法规则，仅仅是由服务器来分配。
> 资源被缓存时，就会被分配唯一性标识。例如，当使用中文版的浏 览器访问 http ：//www.google.com/ 时，就会返回中文版对应的资源，而 使用英文版的浏览器访问时，则会返回英文版对应的资源。两者的 URI 是相同的，所以仅凭 URI 指定缓存的资源是相当困难的。若在下载过 程中出现连接中断、再连接的情况，都会依照 ETag 值来指定资源。
#### 强ETag 值
强 ETag 值，不论实体发生多么细微的变化都会改变其值。   
`ETag: "usagi-1234"`

#### 弱ETag 值 
弱 ETag 值只用于提示资源是否相同。只有资源发生了根本改变，产 生差异时才会改变ETag值。这时，会在字段值最开始处附加W/。
`ETag:  W/"usagi-1234"`

### Location
可以将响应接收方引导至某个与请求 URI 位置不同的资源。 一般会配合 3xx ：Redirection 的响应，提供重定向的 URI。几乎所有的浏览器在接收到包含首部字段 Location 的响应后，都会 强制性地尝试对已提示的重定向资源的访问。(注意:**ajax请求响应不会发生重定向**)

### Vary
当代理服务器接收到带有 Vary 首部字段指定获取资源的请求时，如果使用 的 Accept-Language 字段的值相同，那么就直接从缓存返回响应。反之， 则需要先从源服务器端获取资源后才能作为响应返回。   
可对缓存进行控制。源服务器会向代理服务器传达 关于本地缓存使用方法的命令。
> 从代理服务器接收到源服务器返回包含 Vary 指定项的响应之后， 若再要进行缓存，仅对请求中含有相同 Vary 指定首部字段的请求返回 缓存。即使对相同资源发起请求，但由于 Vary 指定的首部字段不相同， 因此必须要从源服务器重新获取资源。

### Set-Cookie
当服务器准备开始管理客户端的状态时，会事先告知各种信息。 下面的表格列举了 Set-Cookie 的字段值。
| 属性         | 说明                                                                            |
| ------------ | ------------------------------------------------------------------------------- |
| NAME=VALUE   | 赋予Cookie的名称和其值（必需项）                                                |
| expires=DATE | Cookie的有效期（若不明确指定则默认为浏览器关闭前为止）                          |
| path=PATH    | 将服务器上的文件目录作为Cookie的适用对象（若不指定则 默认为文档所在的文件目录） |
| domain=域名  | 作为Cookie适用对象的域名（ 若不指定则默认为创建Cookie 的服务器的域名）          |
| Secure       | 仅在HTTPS安全通信时才会发送Cookie                                               |
| HttpOnly     | 加以限制，使Cookie不能被JavaScript脚本访问                                      |

- `secure` - 于限制 Web 页面仅在 HTTPS 安全连接时， 才可以发送 Cookie
- `HttpOnly` - Cookie 的 HttpOnly 属性是 Cookie 的扩展功能，它使 JavaScript 脚 本无法获得 Cookie。其主要目的为防止跨站脚本攻击（Cross-site scripting，XSS）对 Cookie 的信息窃取。

## 实体首部字段详解
### Expires
`Expires: Wed, 04 Jul 2012 08:26:05 GMT`
会将资源失效的日期告知客户端。缓存服务器在 接收到含有首部字段 Expires 的响应后，会以缓存来应答请求，在Expires 字段值指定的时间之前，响应的副本会一直被保存。当超过 指定的时间后，缓存服务器在请求发送过来时，会转向源服务器请求 资源。
源服务器不希望缓存服务器对资源缓存时，最好在 Expires 字段内 写入与首部字段 Date 相同的时间值。  
> 但是，当首部字段 Cache-Control 有指定 max-age 指令时，比起首 部字段 Expires，会优先处理 max-age指令。
### Last-Modified
指明资源最终修改的时间。一般来说，这 个值就是 Request-URI 指定资源被修改的时间。但类似使用 CGI 脚本进 行动态数据处理时，该值有可能会变成数据最终修改时的时间。

## 其他首部字段
HTTP 首部字段是可以自行扩展的。所以在 Web 服务器和浏览器的 应用上，会出现各种非标准的首部字段。 
### X-Frame-Options
首部字段 X-Frame-Options 属于 HTTP 响应首部，用于控制网站内 容在其他 Web 网站的 Frame 标签内的显示问题。其主要目的是为了防 止点击劫持（clickjacking）攻击。   
x-frame-option 控制是否允许被跨域资源iframe引入
- `DENY` ：拒绝 
- `SAMEORIGIN` ：仅同源域名下的页面（Top-level-browsing-context） 匹配时许可。
### X-XSS-Protection
是针对跨站脚 本攻击（XSS）的一种对策，用于控制浏览器 XSS 防护机制的开关。  
XSS攻击：其原理是攻击者向有XSS漏洞的网站中输入(传入)恶意的HTML或者JS代码，当其它用户浏览该网站时，这段HTML代码会自动执行，从而达到攻击的目的
- `0` ：将 XSS 过滤设置成无效状态 
- `1` ：将 XSS 过滤设置成有效状态
### DNT
Do Not Track 的简称，意为拒绝个人信息被收集，是表示拒绝被精准广告追踪的一 种方法。
- `0` ：同意被追踪 
- `1` ：拒绝被追踪
### P3P
通过利用 P3P（The Platform for Privacy Preferences，在线隐私偏好平台）技术，可以让 Web 网站上 的个人隐私变成一种仅供程序可理解的形式，以达到保护用户隐私的 目的。 

### 部分web安全常识
1. [点击劫持攻击](https://baike.baidu.com/item/%E7%82%B9%E5%87%BB%E5%8A%AB%E6%8C%81/6742958?fr=aladdin)
2. [XSS攻击](https://baike.baidu.com/item/XSS%E6%94%BB%E5%87%BB/954065?fr=aladdin)，[博客](https://www.cnblogs.com/hellojesson/p/6386002.html)


## 浏览器缓存
[参考](https://www.jianshu.com/p/4f07740d68e4)
##### 强缓存
强缓存在客户端和服务器端都会存在。   
- 客户端：客户端在请求资源前，会检查上一次该资源响应头的Cache-Control字段，如果该字段的值为max-age=time(大于0的毫秒数)，如果该资源缓存的时间没有过这个时间值，则直接使用本地的缓存，而不像服务器发请求。     
- 服务器端：服务器端在接收到一个请求后，如果该请求的头部Cache-Control字段的值为max-age=time(大于0的毫秒数)，如果距离上一次返回资源的时间小于这个毫秒数，那么服务器不会读取新的资源，而是直接返回304，告知客户端使用自己本地上次缓存的资源即可。      
>注：这两种情况，其实归根结底最后都是使用的客户端本地的资源，服务器没有返回资源实体。这样的好处是节省请求次数或者请求流量，但缺点是，如果在max-age时间内服务器资源有更新，客户端无法得到最新的服务器资源。此时可以通过Ctrl+F5强制刷新(其实就是设置一个Cache-Control:no-cache的请求头)，获得最新的服务器资源。
###### 浏览器是根据什么决定「from disk cache」与「from memory cache」[详情](https://www.zhihu.com/question/64201378/answer/217831630)
内存缓存的特点 快(读取快) 时效性(进程死，他也死)
1. (以图片为例):访问-> 200 -> 退出浏览器再进来-> 200(from disk cache) -> 刷新 -> 200(from memory cache)
   总结: 会不会是chrome很聪明的判断既然已经从disk拿来了， 第二次就内存拿吧 快。（笑哭)第二个现象
2. (以图片为例):只要图片是base64 我看都是from memroy cache。 
   总结: 解析渲染图片这么费劲的事情，还是做一次然后放到内存吧。 用的时候直接拿
3. (以js css为例):个人在做静态测试的发现，大型的js css文件都是直接disk cache
   总结: chrome会不会说 我擦 你这么大 太JB占地方了。 你就去硬盘里呆着吧。 慢就慢点吧。
4. 隐私模式下，几乎都是 from memroy cache.
   总结: 隐私模式 是吧。 我不能暴露你东西。还是放到内存吧。 你关，我死。


##### 协商缓存（对比缓存）
对比缓存值存在于服务器端。    
在没有走强缓存逻辑的情况下，服务器端会进行Last-Modified和Etag的校验，如果校验发现资源未更新，则会返回304，否则会返回新的资源实体。  
- ETag和If-None-Match是一对  
- Last-Modified和If-Modified-Since是一对   

![浏览器请求资源](/static/huancun.jpg "浏览器请求资源")  