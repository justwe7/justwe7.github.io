# Prisma、Node.js 与数据库新手教程

这份文档面向刚开始接触数据库的人。你可以先把数据库理解成“很多张 Excel 表”，Prisma 是项目里帮 Node.js 读写这些表的工具。

本文只讲当前项目实际用到的做法，不追求覆盖所有 Prisma 和 PostgreSQL 知识。

## 1. 项目里谁负责什么

当前项目的后端在 `server/` 目录，技术关系可以这样理解：

```text
小程序页面
  -> 调用后端 API
  -> NestJS Controller 接收请求
  -> Service 写业务逻辑
  -> PrismaService 操作数据库
  -> PostgreSQL 保存数据
```

几个关键文件：

| 文件 | 作用 |
|---|---|
| `server/prisma/schema.prisma` | 定义数据库有哪些表、字段、关系和枚举 |
| `server/src/prisma/prisma.service.ts` | 创建 Prisma 数据库客户端，并在服务启动/关闭时连接和断开 |
| `server/src/prisma/prisma.module.ts` | 把 `PrismaService` 注册成全局服务，其他模块可以直接注入使用 |
| `server/.env` | 本地或服务器真实运行配置，包含数据库连接地址，不提交 git |
| `server/.env.example` | 本地开发配置模板 |
| `server/.env.production.example` | 生产配置模板 |
| `server/prisma/migrations/` | 每次表结构变化生成的迁移文件 |

## 2. 数据库先按 Excel 理解

| 数据库概念 | 可以理解成 |
|---|---|
| table / 表 | 一张 Excel 表 |
| row / record / 记录 | Excel 里的一行 |
| column / 字段 | Excel 里的一列 |
| primary key / 主键 | 每行数据的唯一编号，常见字段是 `id` |
| foreign key / 外键 | 指向另一张表某一行的编号，比如 `offeringId` |
| relation / 关系 | Prisma 帮你根据外键把两张表连起来 |
| enum / 枚举 | 固定选项，比如订单状态只能是 `PENDING_FORM` 等 |

例如 `Order` 可以理解成订单 Excel 表：

| id | orderNo | userId | offeringId | status |
|---|---|---|---|---|
| order-1 | 202607030001 | user-1 | offering-1 | PENDING_FORM |

`ProductOffering` 可以理解成在售产品 Excel 表：

| id | offeringCode | displayName | visibility |
|---|---|---|---|
| offering-1 | staff_x | 企业员工问诊 | ENTERPRISE |

订单表里的 `offeringId = offering-1`，就表示这张订单对应 `ProductOffering` 表里 `id = offering-1` 的产品。

## 3. Prisma schema 怎么看

数据库结构定义在：

```text
server/prisma/schema.prisma
```

开头这段说明项目用 PostgreSQL，并且数据库地址来自环境变量 `DATABASE_URL`：

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

`model` 表示一张表。例如：

```prisma
model Order {
  id         String
  orderNo   String
  userId    String
  offeringId String
  status    OrderStatus
}
```

你可以读成：

```text
有一张 Order 表。
它有 id、orderNo、userId、offeringId、status 这些字段。
```

`enum` 表示固定选项。例如：

```prisma
enum OrderStatus {
  PENDING_PAYMENT
  PENDING_FORM
  PENDING_TRIAGE
  COMPLETED
}
```

你可以读成：

```text
订单状态只能从这些值里选。
```

## 4. 关系字段怎么理解

以订单和在售产品为例，`Order` 里有：

```prisma
offeringId String
offering   ProductOffering @relation(fields: [offeringId], references: [id])
```

这两行要分开理解：

```text
offeringId 是数据库 Order 表里的真实字段。
offering 是 Prisma 提供的关系字段，不是 Order 表里的真实字段。
```

这句话：

```prisma
@relation(fields: [offeringId], references: [id])
```

意思是：

```text
Order.offeringId 指向 ProductOffering.id。
```

所以你在 Prisma 代码里可以写：

```ts
await this.prisma.order.findFirst({
  where: {
    offering: {
      is: {
        offeringCode: 'staff_x',
      },
    },
  },
});
```

它的中文意思是：

```text
查订单，并且要求这条订单关联的在售产品 offeringCode 是 staff_x。
```

但如果你已经有当前产品的 `id`，更推荐直接查真实外键：

```ts
await this.prisma.order.findFirst({
  where: {
    offeringId: offering.id,
  },
});
```

这个更容易读：

```text
查订单，要求订单的 offeringId 等于当前产品 id。
```

## 5. Node.js 是怎么用 Prisma 的

项目里封装了一个 `PrismaService`：

```ts
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
```

它做两件事：

```text
服务启动时连接数据库。
服务关闭时断开数据库。
```

`PrismaModule` 把它注册成全局模块：

```ts
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

所以其他 Service 里可以这样用：

```ts
constructor(private readonly prisma: PrismaService) {}
```

然后就能写：

```ts
await this.prisma.order.findFirst(...)
await this.prisma.order.create(...)
await this.prisma.productOffering.findUniqueOrThrow(...)
```

## 6. 数据库是怎么连接上的

连接地址在 `DATABASE_URL`。

本地开发模板：

```text
server/.env.example
```

里面有：

```env
DATABASE_URL="postgresql://postgres@127.0.0.1:5432/mp_health_dev?schema=public"
```

这段可以拆开理解：

```text
postgresql://              使用 PostgreSQL 数据库
postgres                   用户名
127.0.0.1                  数据库地址，本机
5432                       数据库端口
mp_health_dev              数据库名称
schema=public              使用 public 这个 schema
```

生产模板：

```text
server/.env.production.example
```

里面是：

```env
DATABASE_URL="postgresql://postgres@127.0.0.1:5432/health_lvtong?schema=public"
```

本地和生产都会读取实际的：

```text
server/.env
```

注意：

```text
server/.env 不提交 git。
生产环境不要连接 mp_health_dev 这种开发库。
```

## 7. Prisma Client 是什么

`schema.prisma` 是数据库结构说明，但 Node.js 代码真正调用的是生成出来的 Prisma Client。

生成命令：

```bash
cd server
npm run prisma:generate
```

它会根据 `schema.prisma` 生成类型和查询方法。

什么时候需要执行：

| 场景 | 是否需要 |
|---|---|
| 修改了 `schema.prisma` | 需要 |
| 拉取了别人新增的迁移和 schema | 建议执行 |
| 安装依赖后首次启动 | 需要 |
| 只是改业务代码 | 通常不需要 |

## 8. 常见 Prisma 查询怎么读

查一条订单：

```ts
await this.prisma.order.findFirst({
  where: {
    userId,
    status: OrderStatus.PENDING_FORM,
  },
});
```

读法：

```text
找这个用户的一条待完善订单。
```

按唯一字段查产品：

```ts
await this.prisma.productOffering.findUniqueOrThrow({
  where: {
    offeringCode: input.offeringCode,
  },
});
```

读法：

```text
根据 offeringCode 找一个产品。
找不到就抛出错误。
```

创建订单：

```ts
await this.prisma.order.create({
  data: {
    orderNo: createOrderNo(),
    userId: input.userId,
    offeringId: offering.id,
    status: OrderStatus.PENDING_FORM,
  },
});
```

读法：

```text
新增一条订单。
```

更新订单：

```ts
await this.prisma.order.update({
  where: {
    id: order.id,
  },
  data: {
    status: OrderStatus.PENDING_TRIAGE,
  },
});
```

读法：

```text
找到这条订单，把状态改成 PENDING_TRIAGE。
```

查列表：

```ts
await this.prisma.order.findMany({
  where: {
    userId,
  },
  orderBy: {
    createdAt: 'desc',
  },
  take: 10,
});
```

读法：

```text
查这个用户的订单列表，按创建时间倒序，最多取 10 条。
```

## 9. include 和 select 怎么选

`include` 表示“把关联数据也带回来”。

```ts
await this.prisma.order.findFirst({
  where: { orderNo },
  include: {
    offering: true,
    payments: true,
  },
});
```

读法：

```text
查订单，同时把关联的产品和支付记录也查出来。
```

`select` 表示“只取我指定的字段”。

```ts
await this.prisma.order.findFirst({
  where: { orderNo },
  select: {
    orderNo: true,
    status: true,
    offering: {
      select: {
        offeringCode: true,
        displayName: true,
      },
    },
  },
});
```

读法：

```text
只取订单号、状态、关联产品的编码和名称。
```

简单规则：

| 写法 | 用途 |
|---|---|
| `where` | 查询条件 |
| `data` | 创建或更新时写入的数据 |
| `include` | 把整个关联对象带回来 |
| `select` | 只取指定字段 |
| `orderBy` | 排序 |
| `skip` / `take` | 分页 |

## 10. 写新查询的思考顺序

写 Prisma 查询时，按这个顺序想：

1. 我要查哪张表？
2. 我要查一条还是多条？
3. 查询条件是什么？
4. 需要关联表数据吗？
5. 是读取、新增、修改，还是删除？

例如需求是：

```text
查当前用户是否已有同一个产品的待完善订单。
```

拆开：

```text
主表：Order
一条还是多条：只要知道有没有，一条即可
条件：
- userId 是当前用户
- status 是 PENDING_FORM
- offeringId 是当前产品 id
```

代码：

```ts
await this.prisma.order.findFirst({
  where: {
    userId,
    status: OrderStatus.PENDING_FORM,
    offeringId: offering.id,
  },
});
```

## 11. 表结构修改怎么做

表结构修改包括：

```text
新增表
新增字段
修改字段类型
新增枚举值
新增索引
新增关系
删除字段
```

标准流程：

1. 修改 `server/prisma/schema.prisma`。
2. 在本地生成迁移。
3. 重新生成 Prisma Client。
4. 修改业务代码。
5. 跑测试。
6. 提交 `schema.prisma` 和 `server/prisma/migrations/`。

本地开发命令：

```bash
cd server
npm run prisma:migrate
npm run prisma:generate
npm test
```

`npm run prisma:migrate` 实际执行的是：

```bash
prisma migrate dev
```

它会：

```text
读取 schema.prisma
对比本地数据库当前结构
生成新的 migration 文件
把 migration 应用到本地数据库
```

重要：

```text
prisma migrate dev 只在本地开发环境使用。
不要在线上生产环境执行 prisma migrate dev。
```

生产环境发布时使用：

```bash
cd server
npm run prisma:migrate:deploy
npm run prisma:generate
```

`migrate deploy` 只会执行已经提交的迁移文件，不会在生产环境临时生成新迁移。

## 12. 新增字段示例

假设要给订单增加一个“用户备注”字段。

第一步，修改 `schema.prisma`：

```prisma
model Order {
  id       String @id @default(uuid())
  orderNo  String @unique
  userNote String?
}
```

`String?` 的 `?` 表示可以为空。

第二步，生成迁移：

```bash
cd server
npm run prisma:migrate
```

Prisma 会让你输入迁移名称，可以填：

```text
add_order_user_note
```

第三步，生成 Prisma Client：

```bash
npm run prisma:generate
```

第四步，在代码里使用：

```ts
await this.prisma.order.update({
  where: { id: order.id },
  data: { userNote: input.userNote },
});
```

第五步，跑测试：

```bash
npm test
```

## 13. 新增表和关系示例

假设要新增一张“订单备注记录”表，一个订单可以有多条备注。

schema 可以这样写：

```prisma
model Order {
  id      String      @id @default(uuid())
  orderNo String      @unique
  notes   OrderNote[]
}

model OrderNote {
  id        String   @id @default(uuid())
  orderId   String
  content   String
  createdAt DateTime @default(now()) @db.Timestamptz(3)
  order     Order    @relation(fields: [orderId], references: [id])

  @@index([orderId])
}
```

理解方式：

```text
OrderNote.orderId 是真实字段，保存订单 id。
OrderNote.order 是 Prisma 关系字段，表示这条备注属于哪个订单。
Order.notes 是反向关系，表示一个订单有多条备注。
```

查询一个订单并带备注：

```ts
await this.prisma.order.findFirst({
  where: { orderNo },
  include: {
    notes: true,
  },
});
```

## 14. 索引是什么，什么时候加

索引可以先理解成“目录”。

没有索引时，数据库可能要从头到尾翻表。

有索引时，数据库可以更快找到符合条件的数据。

项目里常见索引：

```prisma
@@index([userId, createdAt])
@@index([offeringId])
@@index([status, createdAt])
```

大致读法：

```text
经常按 userId + createdAt 查订单列表，所以加索引。
经常按 offeringId 查订单，所以加索引。
经常按 status + createdAt 查订单，所以加索引。
```

什么时候考虑加索引：

| 场景 | 是否考虑索引 |
|---|---|
| 列表页经常按某字段筛选 | 考虑 |
| 经常按某字段排序 | 考虑 |
| 某字段用于关联另一张表 | 通常要有 |
| 字段很少用于查询 | 通常不用 |

不要为了所有字段都加索引。索引会加快查询，但也会让写入、更新变慢一点。

## 15. 迁移文件是什么

迁移文件在：

```text
server/prisma/migrations/
```

每个目录通常像这样：

```text
20260702190000_order_intake_forms_jsonb/
  migration.sql
```

它记录了“数据库结构要怎么变化”。

你可以理解为：

```text
schema.prisma 是最终结构说明书。
migrations 是一步一步改造数据库的施工记录。
```

提交代码时，如果改了表结构，通常要同时提交：

```text
server/prisma/schema.prisma
server/prisma/migrations/<新迁移目录>/migration.sql
```

## 16. 本地迁移和生产迁移区别

| 环境 | 命令 | 做什么 |
|---|---|---|
| 本地开发 | `npm run prisma:migrate` | 根据 schema 生成新迁移，并应用到本地库 |
| 本地/生产 | `npm run prisma:generate` | 根据 schema 生成 Prisma Client |
| 生产发布 | `npm run prisma:migrate:deploy` | 执行已经提交的迁移 |

生产环境不要执行：

```bash
prisma migrate dev
```

原因：

```text
它是开发命令，可能要求重置数据库或生成新迁移。
生产数据不能随便重置。
```

## 16.1 生产数据库怎么同步表结构

新增表、删除表、修改字段、增加索引、增加枚举值，都属于表结构变更。

正确流程是：

```text
本地修改 schema.prisma
  -> 本地生成 migration
  -> 本地测试
  -> 提交 schema.prisma 和 migrations
  -> 生产服务器拉取代码
  -> 生产执行 prisma migrate deploy
```

本地开发时执行：

```bash
cd server
npm run prisma:migrate
npm run prisma:generate
npm test
```

这一步会生成新的迁移目录，例如：

```text
server/prisma/migrations/20260703120000_add_xxx_table/migration.sql
```

提交代码时，至少要包含：

```text
server/prisma/schema.prisma
server/prisma/migrations/<新迁移目录>/migration.sql
```

生产服务器上不要执行：

```bash
prisma migrate dev
```

生产只执行已经提交的迁移：

```bash
cd server
npm run prisma:migrate:deploy
npm run prisma:generate
```

本项目日常发布脚本已经包含生产迁移步骤，正常发布直接执行：

```bash
bash server/scripts/deploy-production.sh
```

这个脚本默认会按顺序做：

```text
git pull
npm ci
prisma migrate deploy
prisma generate
npm run build
pm2 reload
健康检查
```

删除表、删除字段、修改字段类型要额外谨慎。执行生产迁移前，至少确认：

```text
1. 生产数据库已有备份。
2. migration.sql 已人工检查。
3. 代码已经不再读取被删除的表或字段。
4. 可以接受这次结构变更的回滚成本。
```

如果 `migration.sql` 里出现下面这些语句，要停下来认真确认：

```sql
DROP TABLE
DROP COLUMN
ALTER COLUMN
```

这些通常意味着会删除数据或改变已有数据的保存方式。

## 17. 日常数据排查怎么做

排查问题时，优先从业务问题开始拆。

例如：

```text
用户说下单后看不到订单。
```

先问：

```text
用户是谁？userId 或手机号是什么？
订单号是什么？
产品 offeringCode 是什么？
大概什么时间下单？
```

然后按表查：

| 想查什么 | 主要看哪张表 |
|---|---|
| 用户是否存在 | `User` |
| 用户订单 | `Order` |
| 下单产品 | `ProductOffering` |
| 支付状态 | `Payment` |
| 退款状态 | `Refund` |
| 状态流转记录 | `OrderStatusEvent` |
| 后台任务 | `Job` 相关表，以 schema 实际定义为准 |

## 18. 用 Prisma 写临时排查脚本

如果不熟 SQL，建议用 Prisma 写临时脚本排查。

可以在 `server/scripts/` 下新增临时脚本，例如：

```text
server/scripts/debug-order.ts
```

示例：

```ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const order = await prisma.order.findFirst({
    where: {
      orderNo: '替换成订单号',
    },
    include: {
      offering: true,
      serviceDefinition: true,
      payments: true,
      refunds: true,
      events: {
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  console.dir(order, { depth: null });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
```

运行：

```bash
cd server
npx tsx scripts/debug-order.ts
```

注意：

```text
临时排查脚本不要提交真实订单号、手机号、openid 等敏感信息。
排查完如果没有长期价值，应删除脚本。
```

## 19. 用 psql 做简单排查

如果需要直接进数据库，可以用 `psql`。

连接本地库：

```bash
psql "postgresql://postgres@127.0.0.1:5432/mp_health_dev?schema=public"
```

进入后常用命令：

```sql
\dt
```

查看有哪些表。

```sql
\d "Order"
```

查看 `Order` 表结构。

```sql
SELECT "orderNo", "userId", status, "offeringId", "createdAt"
FROM "Order"
ORDER BY "createdAt" DESC
LIMIT 10;
```

查看最近 10 条订单。

```sql
SELECT id, "offeringCode", "displayName", visibility, "isOnSale"
FROM "ProductOffering"
ORDER BY "updatedAt" DESC
LIMIT 20;
```

查看最近更新的产品。

注意：

```text
如果表名或字段名是大写开头，SQL 里要用双引号。
比如 "Order"、"ProductOffering"、"orderNo"。
```

如果你还不熟 SQL，优先用 Prisma 临时脚本。SQL 查询要先从只读 SELECT 开始，不要一上来写 UPDATE 或 DELETE。

## 19.1 常用数据库排查 SQL

下面这些 SQL 主要用于只读排查。复制使用前，先把示例里的订单号、用户 ID、产品编码替换成真实值。

本项目使用 PostgreSQL，很多表名和字段名是大写或驼峰写法，所以 SQL 里要加双引号：

```sql
"Order"
"ProductOffering"
"orderNo"
"offeringCode"
```

### 查最近订单

用于快速确认最近是否有新订单写入。

```sql
SELECT
  "orderNo",
  "userId",
  status,
  "serviceType",
  "paymentMode",
  "payableCents",
  "createdAt"
FROM "Order"
ORDER BY "createdAt" DESC
LIMIT 20;
```

### 按订单号查订单主信息

这是订单排查最常用的入口。

```sql
SELECT
  id,
  "orderNo",
  "userId",
  "offeringId",
  "serviceDefinitionId",
  "serviceType",
  status,
  "titleSnapshot",
  "priceCents",
  "payableCents",
  "paymentMode",
  source,
  "createdAt",
  "updatedAt",
  "paidAt",
  "completedAt",
  "cancelledAt"
FROM "Order"
WHERE "orderNo" = '替换成订单号';
```

### 按订单号查产品信息

订单表只保存 `offeringId`，产品名称、编码、上下架状态在 `ProductOffering`。

```sql
SELECT
  o."orderNo",
  o.status AS "orderStatus",
  p.id AS "offeringId",
  p."offeringCode",
  p."displayName",
  p.visibility,
  p."isOnSale",
  p."allowSelfPay",
  p."priceCents"
FROM "Order" o
JOIN "ProductOffering" p ON p.id = o."offeringId"
WHERE o."orderNo" = '替换成订单号';
```

### 按用户查订单列表

用于排查“用户说看不到订单”。

```sql
SELECT
  "orderNo",
  status,
  "serviceType",
  "titleSnapshot",
  "payableCents",
  "paymentMode",
  "createdAt"
FROM "Order"
WHERE "userId" = '替换成用户ID'
ORDER BY "createdAt" DESC
LIMIT 50;
```

### 按手机号查用户

手机号是敏感信息，查询结果不要复制到公开文档或提交到 git。

```sql
SELECT
  id,
  mobile,
  "wechatOpenid",
  status,
  "createdAt",
  "lastLoginAt"
FROM "User"
WHERE mobile = '替换成手机号';
```

查到用户 `id` 后，再用上一段“按用户查订单列表”继续排查。

### 按产品编码查在售产品

用于确认前端传入的 `offeringCode` 是否存在、是否企业权益、是否在售。

```sql
SELECT
  id,
  "offeringCode",
  "displayName",
  visibility,
  "isOnSale",
  "allowSelfPay",
  "priceCents",
  "serviceDefinitionId",
  "audienceSegmentId",
  "createdAt",
  "updatedAt"
FROM "ProductOffering"
WHERE "offeringCode" = '替换成产品编码';
```

### 查所有在售产品

用于核对当前有哪些产品可下单。

```sql
SELECT
  "offeringCode",
  "displayName",
  visibility,
  "isOnSale",
  "allowSelfPay",
  "priceCents",
  "sortOrder"
FROM "ProductOffering"
WHERE "isOnSale" = true
ORDER BY visibility, "sortOrder", "updatedAt" DESC;
```

### 查同一产品的待完善订单

用于排查“为什么下单被拦截去完善旧订单”。

```sql
SELECT
  o."orderNo",
  o."userId",
  o.status,
  o."titleSnapshot",
  p."offeringCode",
  p."displayName",
  o."createdAt"
FROM "Order" o
JOIN "ProductOffering" p ON p.id = o."offeringId"
WHERE o."userId" = '替换成用户ID'
  AND o.status = 'PENDING_FORM'
  AND p."offeringCode" = '替换成产品编码'
ORDER BY o."createdAt" DESC;
```

### 查订单支付记录

用于排查“已支付但订单状态不对”或“支付回调是否成功”。

```sql
SELECT
  p.id,
  p."orderId",
  p."outTradeNo",
  p.provider,
  p.status,
  p."amountCents",
  p."transactionId",
  p."createdAt",
  p."updatedAt",
  p."paidAt"
FROM "Payment" p
JOIN "Order" o ON o.id = p."orderId"
WHERE o."orderNo" = '替换成订单号'
ORDER BY p."createdAt" DESC;
```

### 按商户单号查支付记录

如果微信支付侧给的是 `out_trade_no`，通常对应这里的 `outTradeNo`。

```sql
SELECT
  id,
  "orderId",
  "outTradeNo",
  status,
  "amountCents",
  "transactionId",
  "createdAt",
  "paidAt"
FROM "Payment"
WHERE "outTradeNo" = '替换成商户单号';
```

### 查订单退款记录

用于排查退款是否发起、是否成功、失败原因是什么。

```sql
SELECT
  r.id,
  r.status,
  r."amountCents",
  r.reason,
  r."outRefundNo",
  r."operatorId",
  r."requestedAt",
  r."succeededAt",
  r."failedAt"
FROM "Refund" r
JOIN "Order" o ON o.id = r."orderId"
WHERE o."orderNo" = '替换成订单号'
ORDER BY r."requestedAt" DESC;
```

### 查订单状态流转记录

用于排查订单状态是何时、因为什么原因变化的。

```sql
SELECT
  e."fromStatus",
  e."toStatus",
  e."actorType",
  e."actorId",
  e.reason,
  e.metadata,
  e."createdAt"
FROM "OrderStatusEvent" e
JOIN "Order" o ON o.id = e."orderId"
WHERE o."orderNo" = '替换成订单号'
ORDER BY e."createdAt" ASC;
```

### 查订单通知发送记录

用于排查管理员或用户是否收到微信订阅消息。

```sql
SELECT
  "orderNo",
  scene,
  status,
  "receiverUserId",
  "receiverOpenid",
  "templateId",
  error,
  "sentAt",
  "createdAt"
FROM "NotificationLog"
WHERE "orderNo" = '替换成订单号'
ORDER BY "createdAt" DESC;
```

### 查待执行或失败任务

用于排查通知、提醒等异步任务是否卡住。

```sql
SELECT
  id,
  type,
  status,
  payload,
  attempts,
  "maxAttempts",
  "lastError",
  "runAt",
  "lockedAt",
  "finishedAt",
  "createdAt"
FROM "Job"
WHERE status IN ('PENDING', 'FAILED')
ORDER BY "runAt" ASC
LIMIT 50;
```

如果只想按订单号查任务，可以在 JSON 载荷里搜订单号：

```sql
SELECT
  id,
  type,
  status,
  payload,
  attempts,
  "lastError",
  "createdAt"
FROM "Job"
WHERE payload::text LIKE '%替换成订单号%'
ORDER BY "createdAt" DESC;
```

### 查审计日志

用于排查后台谁操作过订单、做了什么动作。

```sql
SELECT
  action,
  "actorType",
  "actorUserId",
  "resourceType",
  "resourceId",
  "orderNo",
  before,
  after,
  metadata,
  "createdAt"
FROM "AuditLog"
WHERE "orderNo" = '替换成订单号'
ORDER BY "createdAt" DESC;
```

### 统计不同状态订单数量

用于快速看订单状态分布。

```sql
SELECT
  status,
  COUNT(*) AS count
FROM "Order"
GROUP BY status
ORDER BY count DESC;
```

### 查某天创建的订单

项目使用 `Asia/Shanghai` 业务时区，但数据库时间字段是 `timestamptz`。按自然日排查时，建议明确写出时区边界。

```sql
SELECT
  "orderNo",
  status,
  "titleSnapshot",
  "createdAt"
FROM "Order"
WHERE "createdAt" >= TIMESTAMPTZ '2026-07-03 00:00:00+08'
  AND "createdAt" <  TIMESTAMPTZ '2026-07-04 00:00:00+08'
ORDER BY "createdAt" DESC;
```

### 排查 SQL 的基本套路

遇到问题时，按这个顺序查：

```text
1. 先查 Order 主表，确认订单是否存在、状态是什么。
2. 再查 ProductOffering，确认下单产品是否正确。
3. 涉及支付，查 Payment。
4. 涉及退款，查 Refund。
5. 涉及状态变化，查 OrderStatusEvent。
6. 涉及通知或异步任务，查 NotificationLog 和 Job。
7. 涉及后台操作，查 AuditLog。
```

## 19.2 Navicat 入门

Navicat 是图形化数据库管理工具。你可以把它理解成“数据库版 Excel + 查询窗口”。它适合浏览表、筛选数据、写只读 SQL、导出少量排查结果。

### 连接数据库

新建 PostgreSQL 连接时，通常填写：

| Navicat 字段 | 对应 `DATABASE_URL` |
|---|---|
| Host / 主机 | `127.0.0.1` 或服务器数据库地址 |
| Port / 端口 | `5432` |
| User Name / 用户名 | `postgres` |
| Password / 密码 | 数据库密码 |
| Database / 数据库 | `mp_health_dev` 或 `health_lvtong` |
| Schema | 通常是 `public` |

以本地开发连接为例：

```text
DATABASE_URL="postgresql://postgres@127.0.0.1:5432/mp_health_dev?schema=public"
```

对应 Navicat：

```text
Host: 127.0.0.1
Port: 5432
User: postgres
Database: mp_health_dev
Schema: public
```

如果生产数据库只允许服务器内网访问，不要直接把数据库端口暴露到公网。需要远程连接时，优先使用 SSH Tunnel 或服务器安全组白名单。

### 浏览表结构

连接成功后，常见路径是：

```text
连接名
  -> Databases
  -> 目标数据库
  -> Schemas
  -> public
  -> Tables
```

常看的表：

```text
Order
ProductOffering
Payment
Refund
OrderStatusEvent
NotificationLog
Job
AuditLog
User
```

打开表后可以看到字段、数据和索引。字段名要和 `schema.prisma` 对照看，避免只凭界面猜业务含义。

### 用筛选器查数据

Navicat 打开表后通常有筛选功能。适合简单条件：

```text
orderNo 等于某个订单号
userId 等于某个用户 ID
status 等于 PENDING_FORM
offeringCode 等于某个产品编码
```

如果涉及多张表，比如“订单关联产品”，不要在表格里来回点，直接打开查询窗口写 SQL 更清楚。

### 打开查询窗口

在 Navicat 中新建 Query / 查询，然后粘贴本文档里的 SQL。

建议先从这类只读语句开始：

```sql
SELECT
  "orderNo",
  status,
  "createdAt"
FROM "Order"
ORDER BY "createdAt" DESC
LIMIT 20;
```

只读排查时，优先使用：

```sql
SELECT ...
```

不要随手执行：

```sql
UPDATE ...
DELETE ...
DROP ...
TRUNCATE ...
```

### 保存常用查询

你可以在 Navicat 里把常用查询保存成文件或收藏，例如：

```text
按订单号查订单全链路
按用户查订单列表
查支付记录
查退款记录
查通知发送记录
查失败任务
```

保存查询时，不要把真实订单号、手机号、openid、身份证号写死在文件里。用占位符：

```sql
WHERE "orderNo" = '替换成订单号'
```

### 导出结果

排查时有时需要导出 CSV 或 Excel。导出前注意：

```text
1. 只导出必要字段。
2. 不导出身份证号、openid、手机号等敏感字段，除非确实需要。
3. 文件不要提交 git。
4. 发给别人前先脱敏。
```

### 生产库使用 Navicat 的安全习惯

连接生产库时，建议这样做：

```text
1. 连接名明确标注 PROD，例如 health_lvtong_PROD。
2. 生产连接使用不同颜色，避免误操作。
3. 默认只写 SELECT。
4. 执行 UPDATE 或 DELETE 前先 SELECT 确认影响范围。
5. 真要修改数据，优先写 Prisma 脚本，不要在 Navicat 里临时手改。
6. 不熟 SQL 时，不要在生产库使用“设计表”“删除表”“清空表”等按钮。
```

Navicat 界面里如果看到这些操作，要特别谨慎：

```text
Delete Table / 删除表
Truncate Table / 清空表
Design Table / 设计表
New Query 里执行 DROP、DELETE、UPDATE
```

### Navicat 和 Prisma 的关系

Navicat 是直接看数据库，Prisma 是项目代码操作数据库。

```text
Navicat 适合排查和查看。
Prisma 适合业务代码和可复查的数据修复脚本。
schema.prisma 才是项目认可的表结构来源。
```

如果你在 Navicat 里手动改了表结构，但没有同步修改 `schema.prisma` 和 migrations，项目代码可能不知道这个变化，后续发布也可能覆盖或冲突。

所以表结构变更不要用 Navicat 点界面改，仍然走：

```text
修改 schema.prisma
生成 migration
提交代码
生产 migrate deploy
```

## 20. 生产数据排查安全规则

生产环境排查要更谨慎：

1. 优先只读查询。
2. 不直接执行 `DELETE`。
3. 不直接执行大范围 `UPDATE`。
4. 修改生产数据前先备份、确认条件、找人复核。
5. 查询结果不要复制到公开聊天或提交到 git。
6. 不要把 `DATABASE_URL`、openid、手机号、身份证号写进文档或代码。

危险操作示例：

```sql
DELETE FROM "Order";
```

这会删除订单表数据，不要执行。

更安全的思路：

```text
先 SELECT 确认影响范围。
再写极小范围的修复脚本。
修复脚本里明确 where 条件。
修复前备份。
修复后再次 SELECT 验证。
```

## 21. 修改数据应该怎么做

如果只是排查，用 `SELECT` 或 Prisma 查询。

如果要修复数据，优先写一次性脚本，而不是手动在数据库里乱改。

例如修复某个订单标题：

```ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const order = await prisma.order.update({
    where: {
      orderNo: '替换成订单号',
    },
    data: {
      titleSnapshot: '修复后的标题',
    },
  });

  console.log(order.orderNo, order.titleSnapshot);
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
```

运行前先把 `update` 改成 `findUnique` 或 `findFirst` 看看命中的是否是预期订单。

## 21.1 如何为生产数据库新增一条数据

生产新增数据和表结构迁移不是一回事。

```text
表结构迁移：改变有哪些表、字段、索引和关系。
新增业务数据：往已有表里增加一条产品、配置、角色或其他业务记录。
```

生产新增业务数据，优先写一次性 Prisma 脚本，不建议直接手敲 SQL。

原因是：

```text
Prisma 脚本可读、可复查、可测试。
可以用 upsert 避免重复插入。
可以保留执行记录。
比手写 INSERT 更不容易写错字段名和关系。
```

推荐流程：

```text
本地写脚本
  -> 在本地或测试库验证
  -> 确认生产 server/.env 指向生产库
  -> 生产服务器执行脚本
  -> 查询验证结果
```

例如要新增或更新一个在售产品，可以写：

```ts
// server/scripts/ops/upsert-product-offering.ts
import { PrismaClient, ProductVisibility } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const serviceDefinition = await prisma.serviceDefinition.findFirstOrThrow({
    where: {
      category: {
        code: 'EMPLOYEE_SERVICE',
      },
      enabled: true,
    },
  });

  const offering = await prisma.productOffering.upsert({
    where: {
      offeringCode: 'staff_x',
    },
    update: {
      displayName: '企业员工问诊',
      visibility: ProductVisibility.ENTERPRISE,
      isOnSale: true,
    },
    create: {
      offeringCode: 'staff_x',
      serviceDefinitionId: serviceDefinition.id,
      displayName: '企业员工问诊',
      priceCents: 0,
      visibility: ProductVisibility.ENTERPRISE,
      isOnSale: true,
      allowSelfPay: false,
    },
  });

  console.log({
    id: offering.id,
    offeringCode: offering.offeringCode,
    displayName: offering.displayName,
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
```

`upsert` 可以理解成：

```text
如果 offeringCode 已存在，就更新。
如果 offeringCode 不存在，就创建。
```

生产服务器执行前，先确认当前目录和环境变量：

```bash
cd server
cat .env
```

重点确认：

```text
NODE_ENV=production
DATABASE_URL 指向生产库 health_lvtong，而不是 mp_health_dev
```

然后执行脚本：

```bash
npx tsx scripts/ops/upsert-product-offering.ts
```

执行后用 Prisma 查询脚本或只读 SQL 验证数据是否正确。

如果必须直接写 SQL，至少先用事务包起来：

```sql
BEGIN;

SELECT id, "offeringCode", "displayName"
FROM "ProductOffering"
WHERE "offeringCode" = 'staff_x';

-- 确认无误后再 INSERT 或 UPDATE。

SELECT id, "offeringCode", "displayName"
FROM "ProductOffering"
WHERE "offeringCode" = 'staff_x';

ROLLBACK;
```

确认结果完全正确后，再把 `ROLLBACK` 改成 `COMMIT`。如果你还不熟 SQL，本项目优先使用 Prisma 脚本。

## 22. 常见错误怎么判断

| 现象 | 常见原因 | 处理 |
|---|---|---|
| `DATABASE_URL is required` | 没有配置数据库连接 | 检查 `server/.env` |
| Prisma `P1003` | 数据库不存在或连接到了错误库 | 检查 `DATABASE_URL` 的库名 |
| 找不到某个 Prisma 字段 | 改了 schema 但没 generate | 执行 `npm run prisma:generate` |
| 生产启动拒绝连接 | 生产连到了 dev/test/local 库 | 修改生产 `server/.env` |
| 迁移失败 | migration 和数据库当前结构不一致 | 停止发布，先查迁移 SQL 和备份 |
| 查询结果没有关联对象 | 没写 `include` 或 `select` 关联字段 | 加上 `include: { offering: true }` |

## 23. 开发时的推荐流程

只改业务查询：

```bash
cd server
npm test
```

改了 `schema.prisma`：

```bash
cd server
npm run prisma:migrate
npm run prisma:generate
npm test
```

拉取了别人改的 schema 或 migration：

```bash
cd server
npm install
npm run prisma:generate
npm run prisma:migrate:deploy
npm test
```

本地启动服务：

```bash
cd server
npm run dev
```

生产发布：

```bash
bash server/scripts/deploy-production.sh
```

## 24. 当前项目里最常见的写法

订单服务里常见：

```ts
constructor(private readonly prisma: PrismaService) {}
```

查产品：

```ts
const offering = await this.prisma.productOffering.findUniqueOrThrow({
  where: { offeringCode: input.offeringCode },
  include: {
    serviceDefinition: { include: { category: true } },
    audienceSegment: true,
  },
});
```

创建订单：

```ts
await this.prisma.order.create({
  data: {
    orderNo: createOrderNo(),
    userId: input.userId,
    serviceDefinitionId: offering.serviceDefinitionId,
    offeringId: offering.id,
    status: OrderStatus.PENDING_FORM,
  },
});
```

查订单详情：

```ts
await this.prisma.order.findFirst({
  where: {
    orderNo,
    userId,
  },
  include: {
    offering: true,
    serviceDefinition: { include: { category: true } },
    payments: { orderBy: { createdAt: 'desc' } },
    refunds: true,
    events: { orderBy: { createdAt: 'asc' } },
  },
});
```

状态更新通常要配合状态机、事件和通知，不要只改一个字段就结束。

## 25. 最重要的几条习惯

1. 写查询前先看 `schema.prisma`。
2. 主表真实字段可以直接写在 `where`。
3. 关系字段不是数据库真实列，是 Prisma 根据 `@relation` 提供的入口。
4. 已经有外键 id 时，优先用外键字段查询。
5. 改表结构一定要生成并提交 migration。
6. 本地用 `prisma migrate dev`，生产用 `prisma migrate deploy`。
7. 生产排查先只读，修改数据要脚本化、可复核、可回滚。
