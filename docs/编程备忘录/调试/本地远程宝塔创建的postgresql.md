## 1. 问题现象

DataGrip 连接远程 PostgreSQL 失败。

服务器检查端口：

```
ss -lntp | grep 5432
```

最初结果：

```
LISTEN 0 200 127.0.0.1:5432 0.0.0.0:* users:(("postgres",pid=...,fd=8))
LISTEN 0 200 [::1]:5432      [::]:*    users:(("postgres",pid=...,fd=7))
```

说明 PostgreSQL **只监听本机地址**，外部电脑无法通过公网连接。

---

![](../../../static/docs/Pasted%20image%2020260901111506.png)
## 2. 宝塔 PostgreSQL 的 psql 路径

直接执行：

```
sudo -u postgres psql
```

提示：

```
sudo: psql: command not found
```

原因是宝塔安装的 PostgreSQL 没有把 `psql` 加到系统 `PATH`。

实际路径：

```
/www/server/pgsql/bin/psql
```

所以执行命令时使用：

```
sudo -u postgres /www/server/pgsql/bin/psql
```

---

## 3. 查询 PostgreSQL 配置文件位置

查询 `postgresql.conf`：

```
sudo -u postgres /www/server/pgsql/bin/psql -c "SHOW config_file;"
```

返回：

```
/www/server/pgsql/data/postgresql.conf
```

查询 `pg_hba.conf`：

```
sudo -u postgres /www/server/pgsql/bin/psql -c "SHOW hba_file;"
```

返回：

```
/www/server/pgsql/data/pg_hba.conf
```

所以当前宝塔 PostgreSQL 的主要配置文件为：

```
/www/server/pgsql/data/postgresql.conf
/www/server/pgsql/data/pg_hba.conf
```

---

## 4. 修改 PostgreSQL 监听地址

编辑：

```
vim /www/server/pgsql/data/postgresql.conf
```

找到：

```
listen_addresses = 'localhost'
```

修改为：

```
listen_addresses = '*'
```

作用：

```
localhost
↓
只允许服务器本机访问

*

允许 PostgreSQL 监听所有网卡地址
```

注意：`listen_addresses = '*'` **只是让 PostgreSQL 接收外部连接，并不代表所有人都可以登录**。

实际访问权限还受到 `pg_hba.conf`、数据库账号密码、服务器防火墙、云安全组等限制。

---

## 5. 配置 pg_hba.conf

编辑：

```
vim /www/server/pgsql/data/pg_hba.conf
```

推荐只允许自己的公网 IP：

```
host    all    all    你的公网IP/32    scram-sha-256
```

例如：

```
host    all    all    39.157.76.0/32    scram-sha-256
```

临时测试可以：

```
host    all    all    0.0.0.0/0    scram-sha-256
```

但不建议生产环境长期允许：

```
0.0.0.0/0
```

因为代表允许任意 IPv4 地址尝试访问 PostgreSQL。

---

## 6. 重启宝塔 PostgreSQL

宝塔安装版本可使用：

```
/etc/init.d/pgsql restart
```

执行后：

```
waiting for server to shut down.... done
server stopped
```

---

## 7. 验证监听是否生效

重新执行：

```
ss -lntp | grep 5432
```

修改前：

```
127.0.0.1:5432
[::1]:5432
```

修改后：

```
0.0.0.0:5432
[::]:5432
```

最终结果：

```
LISTEN 0 200 0.0.0.0:5432 0.0.0.0:* users:(("postgres",pid=...,fd=7))
LISTEN 0 200 [::]:5432     [::]:*    users:(("postgres",pid=...,fd=8))
```

说明 PostgreSQL 已经成功监听外部网络。

---

## 8. 云服务器还需要放行 5432

PostgreSQL 自身配置完成后，还需要确认：

```
云服务器安全组
服务器防火墙
宝塔安全设置
```

是否允许 TCP：

```
5432
```

推荐安全组规则：

```
协议：TCP
端口：5432
来源：自己的公网 IP
```

不要优先使用：

```
0.0.0.0/0
```

---

## 9. DataGrip 配置

DataGrip 数据源配置：

```
Host: 服务器公网 IP
Port: 5432
User: PostgreSQL 用户名
Password: 用户密码
Database: 数据库名称
```

例如：

```
Host: 42.x.x.x
Port: 5432
Database: health_lvtong_t
User: health_lvtong_t
```

然后：

```
Test Connection
```

---

## 10. 整个远程连接链路

可以理解成 4 层：

```
DataGrip
   ↓
云服务器安全组 / 防火墙
   ↓
PostgreSQL listen_addresses
   ↓
pg_hba.conf
   ↓
PostgreSQL 用户名 / 密码 / Database
```

任何一层有问题，都可能导致连接失败。

这次的问题核心就是：

```
PostgreSQL listen_addresses = localhost
```

导致 PostgreSQL 只监听：

```
127.0.0.1:5432
```

修改成：

```
listen_addresses = '*'
```

并重启 PostgreSQL 后，变成：

```
0.0.0.0:5432
```

远程连接的网络监听问题就解决了。