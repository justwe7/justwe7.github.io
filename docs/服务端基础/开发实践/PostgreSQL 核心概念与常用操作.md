# PostgreSQL 核心概念与常用操作

用 Prisma、TypeORM 这类 ORM 写业务代码,大多数时候确实不用手写 SQL。但一旦遇到 ORM 生成的查询跑得慢、需要手动排查线上数据、或者要给同事开一个只读账号,不懂 PostgreSQL 本身就会卡住——`schema.prisma` 描述的是"我想要什么结构",而 PostgreSQL 才是真正决定这个结构怎么落地、怎么被访问的那一层。这篇笔记从 `psql` 命令行的角度,把日常会用到的核心概念和操作过一遍。

## 一、核心概念全景

不熟悉 PostgreSQL 的话,容易把 Database、Schema、Table 这几个词混着用。它们其实是一层套一层的关系:

```text
PostgreSQL 服务实例(Cluster)
  └── Database(数据库,比如 nestjs_course)
        └── Schema(模式,比如 public)
              └── Table(表,比如 users)
                    └── Row / Column(行 / 列)
```

对照类比,可以理解成:

| PostgreSQL 概念 | 类比 |
| --- | --- |
| Cluster(实例) | 一整台"文件服务器",一个 `psql -p 5432` 连接的就是它 |
| Database(数据库) | 服务器里的一个"顶层文件夹",比如 `nestjs_course` |
| Schema(模式) | 文件夹里的"子文件夹",默认叫 `public` |
| Table(表) | 子文件夹里的一份"表格文件" |
| Role(角色) | 有权限访问这些文件夹/文件的"账号" |

几个容易忽略但重要的点:

- **一次连接只能访问一个 Database**。想切换到另一个数据库,必须重新建立连接(`psql` 里用 `\c` 命令,本质也是断开重连),不能像切 Schema 那样在同一个连接里"跳过去"。
- **Schema 是 Database 内部的命名空间**,同一个 Database 下可以有多个 Schema,允许不同 Schema 里存在同名的表(比如 `public.users` 和 `test.users` 互不冲突)。业务项目如果没有特意规划,几乎都在默认的 `public` Schema 下工作。
- **Role 既可以代表"用户"也可以代表"用户组"**,PostgreSQL 不区分 USER 和 ROLE,`CREATE USER` 只是 `CREATE ROLE ... LOGIN` 的简写。

## 二、连接与常用元命令

你本机的连接方式是:

```bash
/opt/homebrew/opt/postgresql@16/bin/psql \
  -h 127.0.0.1 -p 5432 -U postgres -d nestjs_course
```

拆开看每个参数:

```text
-h 127.0.0.1     连接哪台机器,127.0.0.1 是本机
-p 5432          端口,PostgreSQL 默认就是 5432
-U postgres      用哪个角色登录
-d nestjs_course 登录后默认进入哪个数据库
```

如果不想每次都写这么长的路径,可以把 `psql` 所在目录加进 `PATH`,或者建一个 shell 别名:

```bash
echo 'export PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
psql -h 127.0.0.1 -p 5432 -U postgres -d nestjs_course
```

连进去之后,`psql` 提供了一套以反斜杠开头的"元命令"(meta-command),专门用来查看结构,和真正的 SQL 语句是两回事——元命令不用加分号,是 `psql` 客户端自己解析的,不会发给数据库执行:

| 元命令 | 作用 |
| --- | --- |
| `\l` | 列出所有数据库 |
| `\c dbname` | 切换到另一个数据库(相当于断开重连) |
| `\dn` | 列出当前数据库下的所有 Schema |
| `\dt` | 列出当前 Schema(默认 `public`)下的所有表 |
| `\dt schema_name.*` | 列出指定 Schema 下的所有表 |
| `\d table_name` | 查看某张表的结构(字段、类型、索引、外键) |
| `\d+ table_name` | 同上,额外显示存储大小等信息 |
| `\du` | 列出所有角色及其权限属性 |
| `\dg` | 列出所有角色(和 `\du` 基本等价) |
| `\x` | 切换"展开显示"模式,字段多的表横向显示会挤成一团,开了这个改成纵向一条条列 |
| `\timing` | 打开/关闭每条 SQL 的耗时显示,排查慢查询时常开着 |
| `\?` | 查看所有元命令帮助 |
| `\h CREATE TABLE` | 查看某条 SQL 语句的语法帮助 |
| `\q` | 退出 |

实际用起来的顺序通常是:先 `\l` 看有哪些库,`\c 目标库` 切进去,`\dt` 看有哪些表,`\d 表名` 看这张表长什么样,再决定要写什么 SQL。

## 三、角色与权限

角色(Role)决定了"谁能连进来、能做什么"。创建一个新角色最基础的写法:

```sql
-- 创建一个能登录、有密码的角色
CREATE ROLE app_user WITH LOGIN PASSWORD 'a-strong-password';

-- 等价写法,CREATE USER 是 CREATE ROLE ... LOGIN 的语法糖
CREATE USER app_user WITH PASSWORD 'a-strong-password';
```

`CREATE ROLE` 默认创建出来的角色**没有任何权限**,不能登录、不能建库、不能建表,必须显式加属性:

```sql
CREATE ROLE readonly_user WITH LOGIN PASSWORD 'xxx';

-- 允许这个角色连接到 nestjs_course 数据库
GRANT CONNECT ON DATABASE nestjs_course TO readonly_user;

-- 允许在 public schema 下查看表结构
GRANT USAGE ON SCHEMA public TO readonly_user;

-- 允许对 public schema 下所有已存在的表执行 SELECT
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly_user;

-- 关键:上面那条只对"已存在"的表生效,以后新建的表要单独设置默认权限
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT ON TABLES TO readonly_user;
```

最后这条 `ALTER DEFAULT PRIVILEGES` 是最容易漏掉的一步:很多人只执行了 `GRANT SELECT ON ALL TABLES`,过几天建了张新表,才发现只读账号查不了——因为那条 `GRANT` 只对当时已经存在的表生效,不是"以后所有表自动继承"。

回收权限用 `REVOKE`,和 `GRANT` 语法基本对称:

```sql
REVOKE SELECT ON ALL TABLES IN SCHEMA public FROM readonly_user;
```

常见角色属性速查:

| 属性 | 含义 |
| --- | --- |
| `LOGIN` | 能不能用来登录(建"用户组"角色时通常不加) |
| `SUPERUSER` | 超级用户,绕过所有权限检查,生产环境不要随便给 |
| `CREATEDB` | 能不能自己创建数据库 |
| `CREATEROLE` | 能不能创建其他角色 |
| `PASSWORD 'xxx'` | 登录密码 |
| `VALID UNTIL '2026-12-31'` | 账号过期时间,给临时账号用很方便 |

> 生产环境不要用 `postgres` 这个超级用户账号跑业务代码,应该单独建一个只有必要权限的角色(比如只能读写业务表、不能删库、不能改结构),这样即使这个账号的密码泄露或代码有注入漏洞,影响范围也有限。

## 四、数据库与 Schema 管理

创建、删除数据库:

```sql
-- 创建一个新数据库
CREATE DATABASE my_app_dev;

-- 指定拥有者和编码创建(推荐显式指定编码,避免用到非 UTF8 环境)
CREATE DATABASE my_app_dev
  OWNER app_user
  ENCODING 'UTF8';

-- 删除数据库(不可恢复,删之前确认清楚)
DROP DATABASE my_app_dev;
```

> `DROP DATABASE` 不能对当前正连着的数据库执行,也不能在还有其他连接占用该库时执行——先 `\c` 切换到别的库,或者用 `DROP DATABASE ... WITH (FORCE)`(PostgreSQL 13+)强制断开现有连接再删。

创建、切换 Schema:

```sql
-- 在当前数据库下新建一个 schema
CREATE SCHEMA reporting;

-- 建表时指定放进哪个 schema
CREATE TABLE reporting.daily_summary (
  id serial PRIMARY KEY,
  summary_date date NOT NULL
);

-- 删除 schema(CASCADE 会连带删除里面所有表,谨慎使用)
DROP SCHEMA reporting CASCADE;
```

不显式写 Schema 名时,PostgreSQL 会按 `search_path` 这个会话变量决定去哪找表——默认是 `"$user", public`,也就是先找和当前用户同名的 Schema,找不到就去 `public`。这也是为什么大多数项目直接写 `SELECT * FROM users` 就能查到,而不用写成 `SELECT * FROM public.users`。可以用下面这条查看当前生效的 `search_path`:

```sql
SHOW search_path;
```

## 五、数据类型速查

选类型时按"这个字段在业务里到底是什么"来对应,而不是习惯性都用 `varchar`:

| 业务场景 | 推荐类型 | 说明 |
| --- | --- | --- |
| 自增主键 | `serial` / `bigserial` | 本质是 `integer`/`bigint` + 自动序列,新项目更推荐用 `GENERATED ALWAYS AS IDENTITY`(见下方说明) |
| UUID 主键 | `uuid` | 配合 `gen_random_uuid()`(需要 `pgcrypto` 扩展)自动生成,分布式场景比自增 id 更常见 |
| 短文本(用户名、状态码) | `varchar(n)` 或 `text` | PostgreSQL 里 `varchar` 和 `text` 性能几乎没区别,`text` 不限长度,大多数团队直接统一用 `text` |
| 长文本(文章内容、备注) | `text` | 不限长度 |
| 金额 | `numeric(12,2)` / `bigint`(存分) | 千万不要用 `float`/`double precision` 存金额,会有精度误差;要么用 `numeric` 定点数,要么整数存"分" |
| 布尔值 | `boolean` | `true`/`false`/`null` 三种取值,注意 `null` 不等于 `false` |
| 时间点 | `timestamptz` | 带时区信息,几乎总是应该用这个而不是 `timestamp`,原因见下方说明 |
| 纯日期(生日、账期) | `date` | 不含时分秒 |
| 固定选项 | `enum` 类型或 `text` + `CHECK` 约束 | 比如订单状态,`enum` 更省空间且写错值会直接报错 |
| 结构化但不定字段 | `jsonb` | 存"字段不固定的扩展信息",可以建索引、可以查询内部字段,优先用 `jsonb` 而不是 `json`(`jsonb` 是二进制存储,查询更快) |
| 数组 | `text[]` / `integer[]` 等 | PostgreSQL 原生支持数组类型,标签、权限列表这类场景可以用,但涉及复杂关系时更建议拆成关联表 |
| IP 地址 | `inet` | 自带格式校验和网段运算,比存 `text` 更合适 |

几个需要额外解释的点:

- **`timestamp` vs `timestamptz`**:`timestamp` 存的是"没有时区信息的时间",`timestamptz` 存的时候会先转成 UTC,查询时再按连接的时区设置转换显示。业务系统只要涉及"用户在不同时区看到的时间要一致"这种场景,几乎都应该用 `timestamptz`,只用 `timestamp` 容易在跨时区部署时踩坑。
- **`serial` vs `GENERATED ALWAYS AS IDENTITY`**:`serial` 是 PostgreSQL 早期的写法,本质是偷偷建了一个 `sequence` 再设默认值,行为上有一些历史包袱(比如序列的所有权容易搞乱)。新表推荐用 SQL 标准的写法:

```sql
CREATE TABLE orders (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_no text NOT NULL
);
```

## 六、建表与约束

一张典型的业务表长这样:

```sql
CREATE TABLE users (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email text NOT NULL UNIQUE,
  nickname text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'banned')),
  created_at timestamptz NOT NULL DEFAULT now()
);
```

几种常见约束:

| 约束 | 作用 | 示例 |
| --- | --- | --- |
| `PRIMARY KEY` | 主键,唯一且不能为空,一张表通常只有一个 | `id bigint PRIMARY KEY` |
| `UNIQUE` | 唯一,但允许为空(多个 `NULL` 不算冲突) | `email text UNIQUE` |
| `NOT NULL` | 不允许为空 | `nickname text NOT NULL` |
| `DEFAULT` | 不传值时的默认值 | `created_at timestamptz DEFAULT now()` |
| `CHECK` | 自定义校验规则 | `price numeric CHECK (price >= 0)` |
| `FOREIGN KEY` | 外键,引用另一张表的某一列 | 见下方 |
| `REFERENCES` | 外键约束的简写形式 | 见下方 |

外键关联的例子,一个订单属于一个用户:

```sql
CREATE TABLE orders (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id bigint NOT NULL REFERENCES users(id),
  order_no text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);
```

`REFERENCES users(id)` 意味着 `orders.user_id` 只能是 `users` 表里真实存在的 `id`,数据库层面就会拦住"插入一个不存在的用户 id"这种脏数据,不用完全依赖业务代码校验。

删除父表数据时,外键的默认行为是**拒绝删除**(如果还有子表引用着它)。可以用 `ON DELETE` 指定别的行为:

```sql
user_id bigint NOT NULL REFERENCES users(id) ON DELETE CASCADE   -- 用户被删,连带删除其订单
user_id bigint REFERENCES users(id) ON DELETE SET NULL           -- 用户被删,订单的 user_id 置空
```

`ON DELETE CASCADE` 用起来方便,但也意味着一次误删父表数据会连锁删掉一大片子表数据,业务表之间的级联删除要谨慎设计,不确定的话默认行为(拒绝删除)反而更安全。

改表结构常用的 `ALTER TABLE`:

```sql
-- 加字段
ALTER TABLE users ADD COLUMN phone text;

-- 删字段
ALTER TABLE users DROP COLUMN phone;

-- 改字段类型
ALTER TABLE users ALTER COLUMN nickname TYPE varchar(50);

-- 加默认值
ALTER TABLE users ALTER COLUMN status SET DEFAULT 'active';

-- 加非空约束(注意:如果表里已有 NULL 数据,这条会执行失败)
ALTER TABLE users ALTER COLUMN email SET NOT NULL;

-- 加索引
CREATE INDEX idx_orders_user_id ON orders(user_id);

-- 加唯一索引
CREATE UNIQUE INDEX idx_users_email ON users(email);
```

索引可以理解成"给某一列建目录",没有索引时查询要扫全表,有索引时能直接定位。经常出现在 `WHERE`、`ORDER BY`、外键列上的字段值得加索引,但索引不是越多越好——每次写入(`INSERT`/`UPDATE`)都要同步维护所有索引,加得太多会拖慢写入速度,是一个需要权衡的取舍。

## 七、业务场景常用 SQL 速查

以下按增删改查的实际使用场景分类,复制时把示例值换成真实的。

### 基本查询

```sql
-- 查所有字段
SELECT * FROM users;

-- 只查需要的字段(生产环境查询建议明确写字段,不要习惯性 SELECT *)
SELECT id, email, status FROM users;

-- 条件查询
SELECT * FROM users WHERE status = 'active';

-- 多条件
SELECT * FROM orders WHERE user_id = 1 AND status = 'paid';

-- 模糊匹配
SELECT * FROM users WHERE email LIKE '%@gmail.com';

-- 排序 + 分页(常见的"最近 N 条"写法)
SELECT * FROM orders ORDER BY created_at DESC LIMIT 20 OFFSET 0;
```

`LIMIT 20 OFFSET 0` 对应第一页,`OFFSET 20` 对应第二页,以此类推——但 `OFFSET` 分页在数据量很大时会越翻越慢(因为数据库要先扫过被跳过的那些行),更大的表建议改用"上次看到的最后一条记录的时间/id 作为下一页起点"这种游标分页方式。

### 多表关联

```sql
-- 查订单,顺带带出下单用户的邮箱(内连接:只返回两边都匹配的数据)
SELECT o.order_no, o.status, u.email
FROM orders o
JOIN users u ON u.id = o.user_id
WHERE o.status = 'paid';

-- 左连接:即使用户查不到(理论上不该出现,但数据可能有脏数据)也保留订单这一行
SELECT o.order_no, u.email
FROM orders o
LEFT JOIN users u ON u.id = o.user_id;
```

`JOIN`(等价于 `INNER JOIN`)只返回两张表都能对上的数据;`LEFT JOIN` 以左边的表为准,即使右边没匹配到也保留左边这一行,右边对应字段显示为 `NULL`。排查"为什么这条记录关联查不到"时,先换成 `LEFT JOIN` 看看是不是右边真的没有数据,是很常用的一招。

### 聚合与分组

```sql
-- 统计各状态订单数量
SELECT status, COUNT(*) AS count
FROM orders
GROUP BY status
ORDER BY count DESC;

-- 统计每个用户的订单总额
SELECT user_id, SUM(amount) AS total_amount
FROM orders
WHERE status = 'paid'
GROUP BY user_id;

-- 只看订单数超过 5 的用户(HAVING 用于过滤聚合结果,WHERE 不能对聚合值做过滤)
SELECT user_id, COUNT(*) AS order_count
FROM orders
GROUP BY user_id
HAVING COUNT(*) > 5;
```

`WHERE` 和 `HAVING` 容易搞混:`WHERE` 在分组之前过滤原始行,`HAVING` 在分组之后过滤聚合结果——想按"聚合出来的值"筛选(比如订单数、总额),就必须用 `HAVING`,写在 `WHERE` 里会报错。

### 新增、修改、删除

```sql
-- 插入一条
INSERT INTO users (email, nickname) VALUES ('a@example.com', 'Alice');

-- 插入并返回生成的 id(Node.js 里拿到自增/生成的主键很常用)
INSERT INTO users (email, nickname) VALUES ('b@example.com', 'Bob') RETURNING id;

-- 更新
UPDATE orders SET status = 'shipped' WHERE order_no = 'ORD20260923001';

-- 删除(务必确认 WHERE 条件,没有 WHERE 会清空整张表)
DELETE FROM orders WHERE status = 'cancelled' AND created_at < now() - interval '1 year';
```

### UPSERT:存在则更新,不存在则插入

业务里经常遇到"这条数据可能已经存在,存在就更新、不存在就新建"的场景,不用先查一遍再判断走 `INSERT` 还是 `UPDATE`:

```sql
INSERT INTO users (email, nickname)
VALUES ('a@example.com', 'Alice V2')
ON CONFLICT (email)
DO UPDATE SET nickname = EXCLUDED.nickname;
```

`ON CONFLICT (email)` 要求 `email` 上有唯一约束或唯一索引,`EXCLUDED` 代表"这次本来想插入的那一行",`EXCLUDED.nickname` 就是这次传进来的新昵称。

### 事务

多条语句要么全部生效、要么全部不生效(比如"扣库存 + 建订单"必须绑在一起)时用事务包起来:

```sql
BEGIN;

UPDATE inventory SET stock = stock - 1 WHERE product_id = 100;
INSERT INTO orders (user_id, product_id) VALUES (1, 100);

COMMIT;
-- 如果中途发现不对,用 ROLLBACK 撤销这个事务里的所有操作
```

排查生产数据、或者不确定一条 `UPDATE`/`DELETE` 会影响多少行时,可以先用事务包起来、执行后 `SELECT` 检查结果,确认无误再 `COMMIT`,不满意就 `ROLLBACK`:

```sql
BEGIN;
UPDATE orders SET status = 'cancelled' WHERE user_id = 1 AND status = 'pending';
SELECT * FROM orders WHERE user_id = 1;  -- 看看改动是否符合预期
-- 确认没问题:COMMIT;   确认有问题:ROLLBACK;
```

### 时间范围查询

```sql
-- 查最近 7 天的订单
SELECT * FROM orders WHERE created_at >= now() - interval '7 days';

-- 查某个自然日的订单(明确写出时区边界,避免依赖会话默认时区推断)
SELECT * FROM orders
WHERE created_at >= timestamptz '2026-09-23 00:00:00+08'
  AND created_at <  timestamptz '2026-09-24 00:00:00+08';
```

## 八、容易被忽略的几个概念

- **`NULL` 是"未知",不是"空"或"假"**。`NULL = NULL` 的结果不是 `true`,而是 `NULL`(未知),所以判断某字段是否为空要用 `IS NULL` / `IS NOT NULL`,不能写成 `= NULL`。同理,`NOT IN` 如果子查询结果里混进了 `NULL`,整个条件可能"莫名其妙"匹配不到任何数据,这是新手很容易踩的坑。

- **标识符大小写规则**:PostgreSQL 里不加引号的表名、字段名会被自动转成小写,比如 `CREATE TABLE Users (...)` 实际建出来的表名是 `users`。如果建表时特意加了双引号强制保留大小写(比如 `CREATE TABLE "Users"`,不少 ORM 默认这么做),之后所有 SQL 里引用这张表都必须带双引号原样匹配,不加引号会提示"表不存在"。这也是为什么有些项目的排查 SQL 里表名和字段名全是 `"OrderNo"` 这种双引号包裹的驼峰写法。

- **事务隔离级别**:PostgreSQL 默认隔离级别是 `READ COMMITTED`(读已提交),意味着同一个事务里两次查询,如果中间有别的事务提交了修改,两次查询结果可能不一样。日常业务代码用默认级别基本够用;涉及"先读后写、要求这段时间内数据不能被别人改"的场景(比如库存扣减),更常见的做法是用 `SELECT ... FOR UPDATE` 加行锁,而不是提高隔离级别:

```sql
BEGIN;
SELECT stock FROM inventory WHERE product_id = 100 FOR UPDATE;
-- 这一行被锁定,其他事务的同一条 FOR UPDATE 查询会等待,直到本事务提交或回滚
UPDATE inventory SET stock = stock - 1 WHERE product_id = 100;
COMMIT;
```

- **`\dt` 看不到表,不代表表不存在**:很可能是表建在别的 Schema 下,或者当前角色没有权限看到它。先用 `\dn` 确认有哪些 Schema,再用 `\dt schema_name.*` 指定 Schema 查,或者用 `SET search_path TO schema_name;` 切一下当前会话的搜索路径。

## 速查表汇总

| 想做什么 | 命令/语句 |
| --- | --- |
| 连接数据库 | `psql -h 127.0.0.1 -p 5432 -U postgres -d nestjs_course` |
| 列出所有数据库 | `\l` |
| 切换数据库 | `\c dbname` |
| 列出所有 Schema | `\dn` |
| 列出所有表 | `\dt` |
| 查看表结构 | `\d table_name` |
| 列出所有角色 | `\du` |
| 创建数据库 | `CREATE DATABASE dbname;` |
| 创建 Schema | `CREATE SCHEMA schema_name;` |
| 创建角色 | `CREATE ROLE name WITH LOGIN PASSWORD 'xxx';` |
| 授权 | `GRANT SELECT ON ALL TABLES IN SCHEMA public TO role_name;` |
| 建表 | `CREATE TABLE t (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, ...);` |
| 加字段 | `ALTER TABLE t ADD COLUMN col type;` |
| 加索引 | `CREATE INDEX idx_name ON t(col);` |
| 插入并拿主键 | `INSERT INTO t (...) VALUES (...) RETURNING id;` |
| 存在则更新否则插入 | `INSERT ... ON CONFLICT (col) DO UPDATE SET ...;` |
| 开启事务 | `BEGIN;` ... `COMMIT;` / `ROLLBACK;` |
| 查看当前搜索路径 | `SHOW search_path;` |
