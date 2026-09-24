# SQL 语法入门

用 ORM 写业务代码,`prisma.order.findFirst({ where: { status: 'PAID' } })` 这种写法能让你不用手写 SQL 也能干活,但代价是:一旦要自己排查数据、看同事写的原生 SQL、或者 ORM 生成的查询卡住需要分析执行计划,看不懂 SQL 语法就完全抓瞎。这篇笔记不讲 PostgreSQL 特有的东西(那部分见《[PostgreSQL 核心概念与常用操作](./PostgreSQL%20核心概念与常用操作.md)》),只讲 SQL 本身的语法——`SELECT` 里每个词是什么意思、`JOIN` 有哪几种、子查询和窗口函数怎么读,目标是看完这篇之后,业务代码里冒出来的大部分 SQL 你都能看懂、也能自己写。

示例统一基于两张表:`users`(用户)和 `orders`(订单,`user_id` 关联 `users.id`)。

```sql
-- users: id, email, nickname, status, created_at
-- orders: id, user_id, order_no, status, amount, created_at
```

## 一、SQL 语句的执行顺序全貌

先建立一个贯穿全篇的心智模型:一条 `SELECT` 语句,**写出来的顺序**和数据库**实际执行的顺序**是不一样的。这一点不理解,后面 `WHERE` 和 `HAVING` 的区别、`GROUP BY` 之后为什么不能直接用字段别名这类问题都会觉得莫名其妙。

写的时候是这个顺序:

```sql
SELECT 字段
FROM 表
WHERE 条件
GROUP BY 分组字段
HAVING 分组后的条件
ORDER BY 排序字段
LIMIT 数量;
```

但数据库真正执行时,是按这个顺序处理的:

```text
1. FROM      先确定数据来自哪张表(或几张表 JOIN 的结果)
2. WHERE     对原始行做过滤
3. GROUP BY  把剩下的行分组
4. HAVING    对分组后的结果做过滤
5. SELECT    这时候才真正决定要输出哪些字段
6. ORDER BY  对最终结果排序
7. LIMIT     最后再截取需要的行数
```

这解释了两个新手常见的困惑:

- **为什么 `WHERE` 里不能用 `SELECT` 里起的别名**?因为执行到 `WHERE` 的时候,`SELECT` 那一步还没执行,别名根本还不存在。
- **为什么 `WHERE` 不能对聚合结果(比如 `COUNT(*)`)过滤,必须用 `HAVING`**?因为 `WHERE` 在分组之前就执行完了,那时候还没有"聚合结果"这个东西;`HAVING` 在分组之后执行,才拿得到聚合值。

后面每一节讲到具体子句时,都可以对照这个顺序理解"它在整个查询的哪个阶段生效"。

## 二、基础查询:SELECT / FROM / 别名 / DISTINCT

最基本的结构是"从哪张表,拿哪些字段":

```sql
SELECT email, nickname
FROM users;
```

读法:从 `users` 表里,取出 `email` 和 `nickname` 两列。

`SELECT *` 表示"这张表的所有字段都要":

```sql
SELECT * FROM users;
```

`*` 在临时排查数据时很方便,但写进业务代码或长期保留的查询里不推荐,原因有两个:一是表以后新增字段,`SELECT *` 会莫名其妙多返回一些没预料到的数据;二是明确写出字段名,SQL 本身就是一份"这条查询到底用了哪些字段"的文档,便于后续维护。

### 字段别名:AS

给字段或表起一个临时的名字,常用于让结果更好读,或者给关联查询里的字段区分来源:

```sql
SELECT
  email AS user_email,
  nickname AS user_nickname
FROM users;
```

`AS` 关键字可以省略,直接 `email user_email` 也合法,但写上 `AS` 可读性更好。给表起别名在多表关联时几乎是必需的:

```sql
SELECT o.order_no, u.email
FROM orders AS o
JOIN users AS u ON u.id = o.user_id;
```

这里 `o` 和 `u` 分别是 `orders` 和 `users` 的别名,之后整条语句里都可以用 `o.xxx`、`u.xxx` 简写,不用重复写全表名。

### 去重:DISTINCT

`DISTINCT` 用于去掉结果里完全重复的行:

```sql
-- 查有哪些不同的订单状态出现过
SELECT DISTINCT status FROM orders;
```

如果 `SELECT` 后面跟了多个字段,`DISTINCT` 是对"这几个字段组合起来"去重,而不是分别对每个字段去重:

```sql
-- 查有哪些用户在哪些状态下下过单(按 user_id + status 的组合去重)
SELECT DISTINCT user_id, status FROM orders;
```

## 三、WHERE 条件与运算符

`WHERE` 用于过滤原始数据行,只保留满足条件的:

```sql
SELECT * FROM orders WHERE status = 'PAID';
```

### 比较运算符

| 运算符 | 含义 | 示例 |
| --- | --- | --- |
| `=` | 等于 | `status = 'PAID'` |
| `<>` 或 `!=` | 不等于 | `status <> 'CANCELLED'` |
| `>` / `<` | 大于 / 小于 | `amount > 100` |
| `>=` / `<=` | 大于等于 / 小于等于 | `created_at >= '2026-01-01'` |

### 逻辑运算符:AND / OR / NOT

多个条件组合时用 `AND`(都满足)、`OR`(满足其一)、`NOT`(取反):

```sql
-- 状态是 PAID 并且金额大于 100
SELECT * FROM orders WHERE status = 'PAID' AND amount > 100;

-- 状态是 PAID 或者状态是 SHIPPED
SELECT * FROM orders WHERE status = 'PAID' OR status = 'SHIPPED';

-- 状态不是 CANCELLED
SELECT * FROM orders WHERE NOT status = 'CANCELLED';
```

`AND` 和 `OR` 混用时,`AND` 的优先级比 `OR` 高,容易产生歧义,拿不准就加括号明确分组:

```sql
-- 容易读错的写法:直觉上以为是"用户 1 的所有订单,或者用户 2 的已支付订单",
-- 但实际执行结果和这个直觉一致,只是靠运气,养成加括号的习惯更稳妥
SELECT * FROM orders
WHERE user_id = 1 OR user_id = 2 AND status = 'PAID';

-- 加括号明确表达意图:用户 1 的所有订单 或者 用户 2 的已支付订单
SELECT * FROM orders
WHERE user_id = 1 OR (user_id = 2 AND status = 'PAID');
```

### IN:是否在一个集合里

多个 `OR` 判断同一个字段时,用 `IN` 更简洁:

```sql
-- 等价于 status = 'PAID' OR status = 'SHIPPED' OR status = 'COMPLETED'
SELECT * FROM orders WHERE status IN ('PAID', 'SHIPPED', 'COMPLETED');

-- NOT IN 表示排除这些值
SELECT * FROM orders WHERE status NOT IN ('CANCELLED', 'REFUNDED');
```

> `NOT IN` 有一个经典陷阱:如果集合里混进了 `NULL`,整个条件会变成"永远查不到任何结果",而且不会报错,非常隐蔽。原因在第十三节"常见易错点"里详细解释,子查询拼出来的 `IN` 列表尤其容易中招。

### BETWEEN:范围区间

```sql
-- 金额在 100 到 500 之间(闭区间,包含 100 和 500 本身)
SELECT * FROM orders WHERE amount BETWEEN 100 AND 500;

-- 等价写法
SELECT * FROM orders WHERE amount >= 100 AND amount <= 500;
```

### LIKE / ILIKE:模糊匹配

`LIKE` 用于文本模糊匹配,两个通配符:`%` 匹配任意数量字符(包括 0 个),`_` 匹配单个字符。

```sql
-- 邮箱以 gmail.com 结尾
SELECT * FROM users WHERE email LIKE '%gmail.com';

-- 昵称以"张"开头
SELECT * FROM users WHERE nickname LIKE '张%';

-- 昵称第二个字是"明"(_ 占一个字符位置)
SELECT * FROM users WHERE nickname LIKE '_明%';
```

`LIKE` 默认区分大小写,PostgreSQL 额外提供了 `ILIKE` 做不区分大小写的匹配:

```sql
-- 不管大小写,只要包含 gmail 都匹配
SELECT * FROM users WHERE email ILIKE '%GMAIL%';
```

> 以 `%关键词` 这种前面带通配符的写法,数据库没办法用索引加速,数据量大的表上这么查会比较慢;真正需要"全文搜索"的场景,更合适的方案是 PostgreSQL 的全文检索或者专门的搜索引擎,这里先有个印象即可。

### IS NULL / IS NOT NULL:判断空值

判断字段是否为空,必须用 `IS NULL`/`IS NOT NULL`,不能写成 `= NULL`(原因见第十三节):

```sql
-- 查还没有设置昵称的用户
SELECT * FROM users WHERE nickname IS NULL;

-- 查已经设置了昵称的用户
SELECT * FROM users WHERE nickname IS NOT NULL;
```

## 四、排序与分页:ORDER BY / LIMIT / OFFSET

### 排序:ORDER BY

```sql
-- 按创建时间从新到旧(DESC 降序)
SELECT * FROM orders ORDER BY created_at DESC;

-- 按创建时间从旧到新(ASC 升序,不写默认就是 ASC)
SELECT * FROM orders ORDER BY created_at ASC;

-- 多字段排序:先按状态排,状态相同的再按金额从高到低排
SELECT * FROM orders ORDER BY status ASC, amount DESC;
```

多字段排序时,前面的字段优先级更高,只有前一个字段的值相同时,才会比较后一个字段。

### 分页:LIMIT / OFFSET

```sql
-- 取前 10 条
SELECT * FROM orders ORDER BY created_at DESC LIMIT 10;

-- 跳过前 10 条,再取 10 条,相当于"第二页"
SELECT * FROM orders ORDER BY created_at DESC LIMIT 10 OFFSET 10;
```

`LIMIT` 决定要几条,`OFFSET` 决定跳过前面多少条。分页公式通常是:

```text
OFFSET = (页码 - 1) * 每页数量
```

比如每页 10 条、查第 3 页:`LIMIT 10 OFFSET 20`。

> `OFFSET` 分页在数据量很大时会越翻越慢,因为数据库要先把被跳过的那些行都扫一遍再丢弃。真正大数据量的列表分页,更常见的做法是"游标分页":记住上一页最后一条数据的排序字段值(比如 `created_at` 或 `id`),下一页直接用 `WHERE created_at < 上次最后一条的时间 ORDER BY created_at DESC LIMIT 10`,不再需要 `OFFSET`。

## 五、聚合与分组:聚合函数 / GROUP BY / HAVING

### 聚合函数

聚合函数把多行数据"汇总"成一个值:

| 函数 | 作用 |
| --- | --- |
| `COUNT(*)` | 统计行数 |
| `COUNT(字段)` | 统计该字段不为 `NULL` 的行数 |
| `SUM(字段)` | 求和 |
| `AVG(字段)` | 求平均值 |
| `MAX(字段)` / `MIN(字段)` | 最大值 / 最小值 |

```sql
-- 订单总数
SELECT COUNT(*) FROM orders;

-- 已支付订单的总金额
SELECT SUM(amount) FROM orders WHERE status = 'PAID';
```

### 分组:GROUP BY

单独用聚合函数是"把整张表汇总成一行"。如果想"按某个字段分组,每组各算一个汇总值",就要配合 `GROUP BY`:

```sql
-- 统计每种状态各有多少订单
SELECT status, COUNT(*) AS order_count
FROM orders
GROUP BY status;
```

读法:先按 `status` 把所有订单分成几堆(`PAID` 一堆、`CANCELLED` 一堆……),再对每一堆分别数数量。

**规则**:`SELECT` 里出现的非聚合字段,必须出现在 `GROUP BY` 里,否则数据库不知道该显示这一组里哪一行的值,会直接报错。

```sql
-- 错误示例:nickname 既没被聚合,也没在 GROUP BY 里,PostgreSQL 会报错
SELECT user_id, nickname, COUNT(*) FROM orders GROUP BY user_id;
```

多字段分组:

```sql
-- 按用户 + 状态两个维度分组统计
SELECT user_id, status, COUNT(*) AS cnt
FROM orders
GROUP BY user_id, status;
```

### 分组后过滤:HAVING

对照第一节的执行顺序,`WHERE` 在分组前生效,过滤不了聚合结果;要按"聚合出来的值"筛选,必须用 `HAVING`:

```sql
-- 查下单超过 5 次的用户
SELECT user_id, COUNT(*) AS order_count
FROM orders
GROUP BY user_id
HAVING COUNT(*) > 5;
```

`WHERE` 和 `HAVING` 可以同时出现,分工不同:

```sql
-- WHERE 先筛掉已取消的订单(分组前过滤原始行)
-- HAVING 再筛出总金额超过 1000 的用户(分组后过滤聚合结果)
SELECT user_id, SUM(amount) AS total_amount
FROM orders
WHERE status <> 'CANCELLED'
GROUP BY user_id
HAVING SUM(amount) > 1000;
```

## 六、多表关联:JOIN 全家桶

业务表几乎不会孤立存在,`orders` 要关联 `users` 才知道是谁下的单。`JOIN` 就是把两张表按某个条件"拼"在一起查。

先建立图形化的理解,假设 `users` 表和 `orders` 表分别是两个圆,`JOIN` 决定了结果取哪部分:

```text
INNER JOIN   只要两边都能对上的交集部分
LEFT  JOIN   左边全部保留,右边对不上的用 NULL 补齐
RIGHT JOIN   右边全部保留,左边对不上的用 NULL 补齐
FULL  JOIN   两边全部保留,对不上的一律用 NULL 补齐
CROSS JOIN   两边做笛卡尔积,不看关联条件,行数是两表行数相乘
```

### INNER JOIN(内连接):只要两边都匹配的

```sql
SELECT o.order_no, u.email
FROM orders o
INNER JOIN users u ON u.id = o.user_id;
```

`JOIN` 不写前缀默认就是 `INNER JOIN`,两者等价。`ON u.id = o.user_id` 是关联条件,意思是"`orders.user_id` 等于 `users.id` 的那些行才拼在一起"。如果某个用户被删了、`orders.user_id` 找不到对应的 `users.id`,这条订单在 `INNER JOIN` 的结果里会**直接消失**。

### LEFT JOIN(左连接):以左表为准,右边找不到就补 NULL

```sql
SELECT o.order_no, u.email
FROM orders o
LEFT JOIN users u ON u.id = o.user_id;
```

不管 `orders` 里的 `user_id` 能不能在 `users` 里找到对应记录,每一条订单都会出现在结果里;找不到的话,`u.email` 这一列显示为 `NULL`。这在排查数据时非常有用:**如果怀疑关联字段可能对不上,先用 `LEFT JOIN` 查一遍,看右边是不是真的是 `NULL`**,比一上来就用 `INNER JOIN`(看不出到底是"没有订单"还是"关联对不上")更容易定位问题。

### RIGHT JOIN(右连接):以右表为准

```sql
-- 以 users 为准,查每个用户有没有订单(没有订单的用户,订单字段显示 NULL)
SELECT u.email, o.order_no
FROM orders o
RIGHT JOIN users u ON u.id = o.user_id;
```

`RIGHT JOIN` 用得相对少,因为把两张表顺序换一下,用 `LEFT JOIN` 也能表达同样的意思(上面这条等价于 `FROM users u LEFT JOIN orders o ON o.user_id = u.id`),多数团队为了统一风格,只用 `LEFT JOIN` 不用 `RIGHT JOIN`。

### FULL JOIN(全连接):两边都保留

```sql
-- 查所有用户和所有订单的关联情况,任何一边对不上都保留,对不上的一边补 NULL
SELECT u.email, o.order_no
FROM users u
FULL JOIN orders o ON o.user_id = u.id;
```

结果里会同时出现"有用户没订单"(订单列是 `NULL`)和"有订单没用户"(邮箱列是 `NULL`,通常意味着脏数据)两种行,常用于数据一致性排查。

### CROSS JOIN(交叉连接):笛卡尔积

不需要关联条件,两张表逐行两两组合,结果行数 = 左表行数 × 右表行数:

```sql
-- 3 种商品 × 4 种颜色,生成全部 12 种组合(常见于生成"全排列"场景)
SELECT p.name, c.color
FROM products p
CROSS JOIN colors c;
```

业务查询里较少直接用到,更多出现在"生成一批组合数据"这类场景。

## 七、子查询

子查询就是"查询里嵌套的另一个查询",用括号包起来,当成一个临时的结果来用。

### 标量子查询:结果是单个值

```sql
-- 查金额高于平均金额的订单
SELECT * FROM orders
WHERE amount > (SELECT AVG(amount) FROM orders);
```

括号里的 `SELECT AVG(amount) FROM orders` 先算出一个数字(平均金额),外层再拿这个数字去比较。这种"子查询只返回一个值"的用法叫标量子查询,可以直接放在 `=`、`>`、`<` 这类只接受单值的位置。

### IN 子查询:结果是一组值

```sql
-- 查下过已支付订单的用户
SELECT * FROM users
WHERE id IN (SELECT user_id FROM orders WHERE status = 'PAID');
```

括号里先查出所有已支付订单的 `user_id`,外层再用 `IN` 判断当前用户 `id` 是否在这堆结果里。

### EXISTS:只判断"有没有",不关心具体值

```sql
-- 效果和上面的 IN 子查询一样:查下过已支付订单的用户
SELECT * FROM users u
WHERE EXISTS (
  SELECT 1 FROM orders o WHERE o.user_id = u.id AND o.status = 'PAID'
);
```

`EXISTS` 里的子查询不关心具体返回什么字段(习惯写 `SELECT 1` 只是图省事),只关心"这个子查询能不能查到至少一行"。`EXISTS` 和 `IN` 逻辑上经常能互换,但有两个实际差异:

- `EXISTS` 的子查询里可以引用外层的字段(比如 `o.user_id = u.id`),这种写法叫**关联子查询**,`IN` 的子查询通常是独立执行的,不引用外层。
- 当子查询结果可能包含 `NULL` 时,`NOT IN` 有前面提到的陷阱,而 `NOT EXISTS` 不受影响,判断"某用户没有任何已支付订单"更推荐用 `NOT EXISTS`:

```sql
SELECT * FROM users u
WHERE NOT EXISTS (
  SELECT 1 FROM orders o WHERE o.user_id = u.id AND o.status = 'PAID'
);
```

## 八、集合操作:UNION / UNION ALL / INTERSECT / EXCEPT

这几个操作符用于把**两条独立查询的结果**合并成一份,前提是两条查询的字段数量、类型要对应一致。

```sql
-- UNION:合并两份结果,并自动去重
SELECT email FROM users WHERE status = 'active'
UNION
SELECT email FROM users WHERE created_at > '2026-01-01';

-- UNION ALL:合并两份结果,不去重(性能比 UNION 好,因为不用比对去重)
SELECT email FROM users WHERE status = 'active'
UNION ALL
SELECT email FROM users WHERE created_at > '2026-01-01';
```

**如果确定两份结果本来就不会重复,或者不在乎重复,优先用 `UNION ALL`**,因为 `UNION` 为了去重要多做一次排序/比对的工作,数据量大时性能差距会比较明显。

`INTERSECT`(取两边都有的交集)和 `EXCEPT`(取在左边但不在右边的差集)用得相对少:

```sql
-- 既是 active 用户,又是 2026 年之后注册的(交集)
SELECT email FROM users WHERE status = 'active'
INTERSECT
SELECT email FROM users WHERE created_at > '2026-01-01';

-- 是 active 用户,但不是 2026 年之后注册的(差集)
SELECT email FROM users WHERE status = 'active'
EXCEPT
SELECT email FROM users WHERE created_at > '2026-01-01';
```

## 九、条件表达式与常用函数

### CASE WHEN:SQL 里的 if-else

```sql
SELECT
  order_no,
  amount,
  CASE
    WHEN amount >= 1000 THEN '大额'
    WHEN amount >= 100 THEN '中额'
    ELSE '小额'
  END AS amount_level
FROM orders;
```

读法:按顺序判断,金额 ≥ 1000 标"大额",否则如果 ≥ 100 标"中额",都不满足就标"小额"(`ELSE` 相当于兜底分支,可以省略,省略时都不满足会返回 `NULL`)。`CASE WHEN` 也能用在 `WHERE`、`ORDER BY`、`GROUP BY` 里,不只是 `SELECT` 的专利。

### COALESCE:取第一个不为 NULL 的值

```sql
-- 昵称为空时,显示邮箱作为替代
SELECT COALESCE(nickname, email) AS display_name FROM users;
```

`COALESCE` 依次检查参数,返回第一个不是 `NULL` 的值,常用于"给可能为空的字段设置默认显示值"。

### 常用字符串函数

| 函数 | 作用 | 示例 |
| --- | --- | --- |
| `LENGTH(str)` | 字符串长度 | `LENGTH(email)` |
| `UPPER(str)` / `LOWER(str)` | 转大写 / 小写 | `LOWER(email)` |
| `TRIM(str)` | 去除首尾空格 | `TRIM(nickname)` |
| `CONCAT(a, b, ...)` | 拼接字符串 | `CONCAT(nickname, ' <', email, '>')` |
| `\|\|` | 拼接字符串(PostgreSQL 特有运算符写法) | `nickname \|\| ' <' \|\| email \|\| '>'` |
| `SUBSTRING(str FROM n FOR m)` | 截取子串 | `SUBSTRING(email FROM 1 FOR 3)` |

### 常用日期函数

| 函数 | 作用 | 示例 |
| --- | --- | --- |
| `now()` | 当前时间戳 | `WHERE created_at > now() - interval '1 day'` |
| `date_trunc('day', ts)` | 截断到指定精度(比如只保留到天) | `date_trunc('day', created_at)` |
| `EXTRACT(field FROM ts)` | 提取时间的某一部分 | `EXTRACT(YEAR FROM created_at)` |
| `age(ts)` | 距今多久 | `age(created_at)` |

### 类型转换:CAST / ::

```sql
-- 标准 SQL 写法
SELECT CAST(amount AS text) FROM orders;

-- PostgreSQL 简写写法,更常见
SELECT amount::text FROM orders;
SELECT '123'::integer;
```

`::类型名` 是 PostgreSQL 特有的简写,业务代码和排查 SQL 里非常高频,看到它就理解成"把前面的值转换成后面这个类型"。

## 十、增删改的语法细节

### INSERT:新增数据

```sql
-- 插入一行,字段名和值一一对应
INSERT INTO users (email, nickname) VALUES ('a@example.com', 'Alice');

-- 一次插入多行,用逗号分隔多组值,比多条 INSERT 效率更高
INSERT INTO users (email, nickname) VALUES
  ('b@example.com', 'Bob'),
  ('c@example.com', 'Carol');

-- RETURNING:插入后直接返回生成的字段,不用再多查一次
INSERT INTO users (email, nickname) VALUES ('d@example.com', 'Dave')
RETURNING id, created_at;
```

### UPDATE:修改数据

```sql
UPDATE orders SET status = 'SHIPPED' WHERE order_no = 'ORD001';

-- 一次改多个字段,用逗号分隔
UPDATE orders SET status = 'SHIPPED', shipped_at = now() WHERE order_no = 'ORD001';
```

**`UPDATE` 不写 `WHERE` 会更新整张表的所有行**,这是新手最容易翻车的地方之一,执行前务必确认 `WHERE` 条件已经写对。

### DELETE:删除数据

```sql
DELETE FROM orders WHERE status = 'CANCELLED';
```

同样,**`DELETE FROM orders;` 不写 `WHERE` 会清空整张表**,而且这个操作一旦提交通常无法通过 SQL 本身撤销。不确定条件范围对不对时,养成先用 `SELECT` 加同样的 `WHERE` 条件确认一遍要删的到底是哪些数据,再改成 `DELETE` 执行的习惯:

```sql
-- 第一步:先看看会删掉哪些数据
SELECT * FROM orders WHERE status = 'CANCELLED' AND created_at < now() - interval '1 year';

-- 确认无误后,把 SELECT * 改成 DELETE FROM orders,WHERE 条件原样保留
DELETE FROM orders WHERE status = 'CANCELLED' AND created_at < now() - interval '1 year';
```

## 十一、CTE:WITH 子句

CTE(Common Table Expression,公用表表达式)用 `WITH` 关键字,给一段子查询起个名字,当成一张"临时表"在后面的查询里引用。它解决的问题是:子查询嵌套多层之后,SQL 会变得很难读。

```sql
-- 不用 CTE:子查询嵌在 FROM 里,读起来要从内往外倒着看
SELECT status, COUNT(*) FROM (
  SELECT o.*, u.email
  FROM orders o
  JOIN users u ON u.id = o.user_id
  WHERE u.status = 'active'
) AS active_user_orders
GROUP BY status;
```

```sql
-- 用 CTE 改写:先起名字,再往下用,阅读顺序和书写顺序一致
WITH active_user_orders AS (
  SELECT o.*, u.email
  FROM orders o
  JOIN users u ON u.id = o.user_id
  WHERE u.status = 'active'
)
SELECT status, COUNT(*)
FROM active_user_orders
GROUP BY status;
```

两种写法执行结果完全一样,`WITH` 只是让复杂查询按"先算出中间结果、再基于中间结果往下算"的顺序摆开,更符合人的阅读习惯。一条语句里可以定义多个 CTE,用逗号分隔:

```sql
WITH paid_orders AS (
  SELECT * FROM orders WHERE status = 'PAID'
),
active_users AS (
  SELECT * FROM users WHERE status = 'active'
)
SELECT u.email, p.order_no
FROM active_users u
JOIN paid_orders p ON p.user_id = u.id;
```

## 十二、窗口函数入门

窗口函数解决的是这样一类问题:"既想看到每一行的明细,又想知道这一行在某个分组里排第几、或者跟同组其他行比怎么样"——这正是普通 `GROUP BY` 做不到的,`GROUP BY` 会把每组压缩成一行,明细就丢了。

基本语法是在函数后面加 `OVER (...)`:

```sql
SELECT
  函数名() OVER (PARTITION BY 分组字段 ORDER BY 排序字段)
FROM 表;
```

`PARTITION BY` 相当于窗口函数版本的"分组",但不会把行合并,每一行还是独立展示。

### ROW_NUMBER:给每一行编号

业务里非常高频的场景"每个用户只取最新一条订单",用普通 `GROUP BY` 很难表达(因为除了 `MAX(created_at)`,没法同时拿到那一行的其他字段),用窗口函数就很直接:

```sql
SELECT * FROM (
  SELECT
    o.*,
    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) AS rn
  FROM orders o
) t
WHERE rn = 1;
```

读法:按 `user_id` 分组,组内按 `created_at` 倒序,给每一行编号(`rn`),每组最新的那条编号是 1;外层再取 `rn = 1` 的行,就是"每个用户最新的一条订单"。

### RANK / DENSE_RANK:排名

```sql
-- 按金额给订单排名,并列的金额会得到相同名次
SELECT
  order_no,
  amount,
  RANK() OVER (ORDER BY amount DESC) AS rank_with_gap,
  DENSE_RANK() OVER (ORDER BY amount DESC) AS rank_no_gap
FROM orders;
```

`RANK()` 和 `DENSE_RANK()` 的区别在于遇到并列名次之后怎么处理下一个名次:`RANK()` 会跳号(比如两个并列第 1,下一个直接是第 3),`DENSE_RANK()` 不跳号(下一个是第 2)。

### 累计求和

```sql
-- 按时间顺序,累计到当前这一行为止的总金额
SELECT
  order_no,
  created_at,
  amount,
  SUM(amount) OVER (ORDER BY created_at) AS running_total
FROM orders;
```

窗口函数和 `GROUP BY` 最本质的区别就一句话:**`GROUP BY` 把多行压缩成一行,窗口函数保留每一行,只是给每一行附加一个"基于所在分组算出来"的值**。看到 SQL 里出现 `OVER (...)`,先按这个心智模型去理解。

## 十三、常见易错点汇总

- **`= NULL` 永远查不到东西**:`NULL` 代表"未知",`NULL = NULL` 的结果也是"未知"(不是 `true`),而不是 `NULL`。判断空值必须用 `IS NULL` / `IS NOT NULL`。

- **`NOT IN` 遇到 `NULL` 会全军覆没**:如果子查询结果里混进了哪怕一个 `NULL`,整个 `NOT IN` 条件就会匹配不到任何数据,而且不会报错,非常隐蔽。

  ```sql
  -- 如果 orders.user_id 里存在 NULL(比如游客下单没关联用户),
  -- 这条查询会一条数据都查不出来,即使确实有用户没下过单
  SELECT * FROM users WHERE id NOT IN (SELECT user_id FROM orders);

  -- 更安全的写法:用 NOT EXISTS,不受 NULL 影响
  SELECT * FROM users u
  WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);
  ```

- **`GROUP BY` 之后,`SELECT` 里的非聚合字段必须出现在 `GROUP BY` 里**,否则报错。这是 PostgreSQL 主动帮你避免"这一组里到底该显示哪一行的值"这种歧义。

- **`WHERE` 不能用聚合函数,`HAVING` 才可以**。想按 `COUNT(*)`、`SUM(...)` 这类聚合结果过滤,只能写在 `HAVING` 里。

- **`UPDATE` / `DELETE` 忘记写 `WHERE`,会作用到整张表**。执行有风险的修改前,先用同样的条件跑一遍 `SELECT` 确认范围。

- **`LIKE '%关键词%'` 这种前置通配符用不上索引**,数据量大的表这样查会比较慢,真正的全文搜索场景应该用专门的全文检索方案。

- **`OFFSET` 分页在深翻页时会变慢**,大表列表建议改用"记住上次最后一条排序值"的游标分页。

- **多表关联时字段名冲突,必须加表别名区分**,比如 `orders` 和 `users` 都有 `created_at` 字段,直接写 `SELECT created_at` 会报"字段不明确",要写成 `o.created_at` 或 `u.created_at`。
