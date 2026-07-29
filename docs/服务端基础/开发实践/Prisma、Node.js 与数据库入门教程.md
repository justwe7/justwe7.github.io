# Node.js 后端与数据库入门：Prisma 实战笔记

> 写给谁看：写过前端、用服务器写过几个 demo，但没有真正把一个 Node.js 服务扛过线上流量的人。这篇笔记不追求覆盖 Prisma 和 PostgreSQL 的全部知识，只讲清楚"当前项目 `server/` 目录里实际在用的那部分"，目标是看完能读懂项目代码、能自己写查询、能安全地做表结构变更和生产排查，而不是成为数据库专家。
>
> 对照的真实项目：`server/`（NestJS + Prisma + PostgreSQL，小程序后端）。文中所有代码、表名、命令都来自这个项目的实际写法，不是通用示例。

## 一、怎么用这篇笔记

这篇笔记按"从看懂代码，到自己写查询，到敢改表结构，到能排查生产问题"的顺序组织，前后有依赖关系，建议按顺序读一遍，之后再当速查手册用。

- 第二、三章是地基：搞清楚一次请求是怎么走到数据库的、数据库本身怎么理解，这两章看完之后，后面所有代码看起来才不会陌生。
- 第四、五章是日常写业务代码最常用的部分：怎么读 `schema.prisma`、怎么写查询。
- 第六、七章是"改结构、发布上线"相关的，风险更高，也是前端背景最容易忽略、最容易踩坑的部分，建议认真看完再动手。
- 第八、九、十章是排查和运维向的内容，第九章是一份可以直接复制粘贴的 SQL 速查表，不需要通读，用的时候再翻。
- 第十一、十二章是收尾，出问题时先查错误对照表，日常开发记住最后那几条习惯就够了。

## 二、一次请求是怎么流转的

### 请求的完整链路

在动手看代码之前，先建立一个整体的心智模型：一次小程序请求，从发出到数据落库，经过了哪些环节。

```text
小程序页面
  -> 调用后端 API（发一个 HTTP 请求）
  -> NestJS Controller 接收请求，只负责收参数、返回结果
  -> Service 里写真正的业务逻辑（校验、组装数据、决定要不要写库）
  -> PrismaService 负责真正操作数据库（增删改查）
  -> PostgreSQL 保存数据，返回结果
  -> 结果原路返回给 Service -> Controller -> 小程序
```

### 为什么要分 Controller 和 Service 两层

前端写惯了组件里"一个函数从头做到尾"，后端这里刻意拆成了两层，是有意为之的分工：

- **Controller**：只负责"这是一个什么样的 HTTP 请求"——路径是什么、方法是 GET 还是 POST、参数怎么解析、最后返回什么格式。它不应该出现具体的业务判断逻辑。
- **Service**：真正的业务逻辑写在这里，比如"要不要允许这个用户下单""这个产品是否在售""状态该怎么流转"。Service 不关心自己是被 HTTP 请求调用的，还是被一个定时任务调用的——这层拆分让业务逻辑可以脱离 HTTP 上下文被复用和测试。

NestJS 用 `@Controller()`、`@Injectable()` 这类装饰器（decorator）标记一个类是什么角色，再靠依赖注入（Dependency Injection，简称 DI）把 Service 自动"塞"进需要它的地方，而不是每次手动 `new`：

```ts
@Injectable()
export class OrdersService {
  // 构造函数参数里声明需要什么，NestJS 启动时会自动注入对应的实例
  constructor(private readonly prisma: PrismaService) {}
}
```

这一点先有个印象即可，不需要在这篇笔记里深挖 NestJS 的模块系统——后面看到 `constructor(private readonly prisma: PrismaService) {}` 这样的写法，知道它的意思是"这个类拿到了一个可以操作数据库的工具"就够用了。

### 关键文件地图

| 文件 | 作用 |
| --- | --- |
| `server/prisma/schema.prisma` | 定义数据库有哪些表、字段、关系和枚举，是整个项目"数据长什么样"的唯一权威说明 |
| `server/src/prisma/prisma.service.ts` | 创建 Prisma 数据库客户端，服务启动时连接数据库、关闭时断开 |
| `server/src/prisma/prisma.module.ts` | 把 `PrismaService` 注册成全局服务，其他模块可以直接注入使用，不用每处重新连接 |
| `server/.env` | 本地或服务器真实运行配置，包含数据库连接地址，不提交 git |
| `server/.env.example` / `server/.env.production.example` | 分别是本地和生产的配置模板，给人参照着填 `.env` 用 |
| `server/prisma/migrations/` | 每次表结构变化时生成的迁移记录，一步步"改造数据库"的施工日志 |

## 三、数据库入门心智模型

不熟悉数据库的话，先把它按"很多张 Excel 表"来理解，能覆盖日常开发遇到的大部分场景：

| 数据库概念 | 可以理解成 |
| --- | --- |
| table / 表 | 一张 Excel 表 |
| row / record / 记录 | Excel 里的一行 |
| column / 字段 | Excel 里的一列 |
| primary key / 主键 | 每行数据的唯一编号，常见字段是 `id` |
| foreign key / 外键 | 指向另一张表某一行编号的字段，比如 `offeringId` |
| relation / 关系 | Prisma 帮你根据外键把两张表"连"起来，方便一起查 |
| enum / 枚举 | 固定选项，比如订单状态只能是 `PENDING_FORM` 这几个值之一 |

用项目里真实的两张表举例。`Order`（订单）可以理解成一张订单 Excel：

| id | orderNo | userId | offeringId | status |
| --- | --- | --- | --- | --- |
| order-1 | 202607030001 | user-1 | offering-1 | PENDING_FORM |

`ProductOffering`（在售产品）可以理解成另一张产品 Excel：

| id | offeringCode | displayName | visibility |
| --- | --- | --- | --- |
| offering-1 | staff_x | 企业员工问诊 | ENTERPRISE |

订单表里的 `offeringId` 是 `offering-1`，意思就是"这张订单对应的是 `ProductOffering` 表里 `id` 为 `offering-1` 的那一行"——这就是外键最朴素的作用：用一个 id，把一行数据和另一张表的某一行关联起来，而不是把产品名称、价格这些信息重复抄一份到订单表里。

## 四、读懂 schema.prisma

### 数据库结构定义在哪

整个项目的数据库结构只有一个权威来源：`server/prisma/schema.prisma`。改数据库结构，永远是先改这个文件，而不是直接跑 SQL 改数据库（原因见第七章）。

文件开头声明了用什么数据库、连接地址从哪来：

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

意思是：项目用 PostgreSQL，实际连接地址由环境变量 `DATABASE_URL` 提供（具体怎么配置见第七章）。

### model 表示一张表

```prisma
model Order {
  id         String
  orderNo   String
  userId    String
  offeringId String
  status    OrderStatus
}
```

读法：有一张 `Order` 表，它有 `id`、`orderNo`、`userId`、`offeringId`、`status` 这些字段。

### enum 表示固定选项

```prisma
enum OrderStatus {
  PENDING_PAYMENT
  PENDING_FORM
  PENDING_TRIAGE
  COMPLETED
}
```

读法：订单状态只能从这几个值里选，代码里写错一个字母编译期就会报错，不像纯字符串那样容易手滑写出一个不存在的状态。

### 最容易搞混的点：关系字段不是数据库里的真实列

这是整篇笔记里最值得慢下来理解的一个点，因为它决定了你写查询时该用哪个字段。以 `Order` 关联 `ProductOffering` 为例：

```prisma
model Order {
  offeringId String
  offering   ProductOffering @relation(fields: [offeringId], references: [id])
}
```

这两行要分开理解：

- `offeringId` 是 `Order` 表里**真实存在**的一列，数据库里能直接查到它。
- `offering` 是 Prisma **额外提供**的关系字段，数据库表结构里根本没有这一列——它是 Prisma 根据 `@relation` 声明"计算"出来的，方便你在代码里直接拿到关联的那条 `ProductOffering` 数据，而不用自己手写 JOIN。

`@relation(fields: [offeringId], references: [id])` 这句话的意思是：`Order.offeringId` 指向 `ProductOffering.id`。

理解了这一点，下面两种写法的区别就很清楚了。通过关系字段查：

```ts
await this.prisma.order.findFirst({
  where: {
    offering: {
      is: { offeringCode: 'staff_x' },
    },
  },
});
```

意思是：查订单，并且要求这条订单关联的在售产品 `offeringCode` 是 `staff_x`。

如果你手上已经有产品的 `id` 了，更推荐直接查真实外键：

```ts
await this.prisma.order.findFirst({
  where: { offeringId: offering.id },
});
```

这个写法更直接：查订单，要求订单的 `offeringId` 等于当前产品 `id`。**能用真实外键字段查询，就不要绕道关系字段**——关系字段那种写法本质上是让数据库多做一次关联判断，只有在你手上确实只有产品编码、没有 id 的时候才值得用。

## 五、用 Prisma 写查询

### Node.js 是怎么"连上"Prisma 的

项目里封装了一个 `PrismaService`，做两件事：服务启动时连接数据库，关闭时断开连接。

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

`PrismaModule` 把它注册成全局模块，所以任何一个 Service 的构造函数里只要声明一下就能拿到它：

```ts
constructor(private readonly prisma: PrismaService) {}
```

之后就可以直接写：

```ts
await this.prisma.order.findFirst(...)
await this.prisma.order.create(...)
await this.prisma.productOffering.findUniqueOrThrow(...)
```

`this.prisma.order` 对应的就是 `Order` 这张表，`this.prisma.productOffering` 对应 `ProductOffering` 表——表名首字母小写，就是对应的 Prisma Client 属性名。

### Prisma Client 是生成出来的，不是手写的

`schema.prisma` 只是"说明书"，Node.js 代码真正调用的、带类型提示的那一整套查询方法，是根据这份说明书**生成**出来的：

```bash
cd server
npm run prisma:generate
```

什么时候需要重新生成：

| 场景 | 是否需要 |
| --- | --- |
| 修改了 `schema.prisma` | 需要 |
| 拉取了别人新增的迁移和 schema | 建议执行 |
| 安装依赖后首次启动项目 | 需要 |
| 只是改业务代码，没碰 schema | 通常不需要 |

忘记这一步是新手最常踩的坑：改了 `schema.prisma` 却没跑 `generate`，代码里用新字段会报"找不到这个属性"，看起来像是一个诡异的类型错误，实际上只是没重新生成。

### 五个基本查询动作怎么读

查一条：

```ts
await this.prisma.order.findFirst({
  where: { userId, status: OrderStatus.PENDING_FORM },
});
```

读法：找这个用户的一条待完善订单。

按唯一字段查、找不到就报错：

```ts
await this.prisma.productOffering.findUniqueOrThrow({
  where: { offeringCode: input.offeringCode },
});
```

读法：根据 `offeringCode` 找一个产品，找不到就抛出错误（这个写法比 `findFirst` 后自己再判断 `null` 更省事，适合"理论上必须存在"的场景）。

创建一条：

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

更新一条：

```ts
await this.prisma.order.update({
  where: { id: order.id },
  data: { status: OrderStatus.PENDING_TRIAGE },
});
```

查列表、带排序和分页：

```ts
await this.prisma.order.findMany({
  where: { userId },
  orderBy: { createdAt: 'desc' },
  take: 10,
});
```

读法：查这个用户的订单列表，按创建时间倒序，最多取 10 条。

### 常用参数速查

| 写法 | 用途 |
| --- | --- |
| `where` | 查询条件 |
| `data` | 创建或更新时要写入的数据 |
| `include` | 把整个关联对象也一起带回来 |
| `select` | 只取指定字段，不要全部 |
| `orderBy` | 排序 |
| `skip` / `take` | 分页 |

`include` 和 `select` 是最容易混的两个：`include` 是"在原有字段基础上，再多带一份关联数据"；`select` 是"我只要这几个字段，其他都不要"，两者不建议在同一层混用。

```ts
// include：查订单，同时把关联的产品和支付记录也查出来
await this.prisma.order.findFirst({
  where: { orderNo },
  include: { offering: true, payments: true },
});

// select：只取订单号、状态，以及关联产品的编码和名称
await this.prisma.order.findFirst({
  where: { orderNo },
  select: {
    orderNo: true,
    status: true,
    offering: {
      select: { offeringCode: true, displayName: true },
    },
  },
});
```

### 写一个新查询前，按这个顺序想

不熟悉的时候容易一上来就想代码怎么写，更稳妥的做法是先按顺序想清楚这五个问题：

1. 我要查哪张表？
2. 我要查一条还是多条？
3. 查询条件是什么？
4. 需要关联表的数据吗？
5. 这是读取、新增、修改，还是删除？

以真实需求"查当前用户是否已有同一个产品的待完善订单"为例，拆解出来是：

```text
主表：Order
一条还是多条：只要知道有没有，一条即可
条件：userId 是当前用户 且 status 是 PENDING_FORM 且 offeringId 是当前产品 id
```

对应代码：

```ts
await this.prisma.order.findFirst({
  where: {
    userId,
    status: OrderStatus.PENDING_FORM,
    offeringId: offering.id,
  },
});
```

### 项目里真实的写法长什么样

订单模块里查产品，通常会一次把后面要用到的关联数据都 `include` 进来，避免多次查询：

```ts
const offering = await this.prisma.productOffering.findUniqueOrThrow({
  where: { offeringCode: input.offeringCode },
  include: {
    serviceDefinition: { include: { category: true } },
    audienceSegment: true,
  },
});
```

查订单详情，通常一次带出这条订单相关的所有信息：

```ts
await this.prisma.order.findFirst({
  where: { orderNo, userId },
  include: {
    offering: true,
    serviceDefinition: { include: { category: true } },
    payments: { orderBy: { createdAt: 'desc' } },
    refunds: true,
    events: { orderBy: { createdAt: 'asc' } },
  },
});
```

> 状态更新通常要配合状态机、事件记录和通知一起处理，不要只改一个 `status` 字段就认为流程结束了——真实业务里，一次状态变化背后往往还牵扯到要不要发通知、要不要写一条 `OrderStatusEvent` 记录，这些逻辑在 Service 层完成，不属于这篇笔记的范围，但要有这个意识。

## 六、表结构怎么改

### 什么算表结构修改

新增表、新增字段、修改字段类型、新增枚举值、新增索引、新增关系、删除字段——这些都属于表结构修改，标准流程是：

1. 修改 `server/prisma/schema.prisma`。
2. 在本地生成迁移文件。
3. 重新生成 Prisma Client。
4. 修改业务代码，配合新字段/新表。
5. 跑测试。
6. 把 `schema.prisma` 和新生成的迁移文件一起提交。

本地开发命令：

```bash
cd server
npm run prisma:migrate
npm run prisma:generate
npm test
```

`npm run prisma:migrate` 实际执行的是 `prisma migrate dev`，它会：读取 `schema.prisma` → 对比本地数据库当前结构 → 生成一份新的 migration 文件 → 把这个 migration 应用到本地数据库。

> **`prisma migrate dev` 只能在本地开发环境使用，绝对不要在生产环境执行它。** 原因是这个命令在某些情况下可能要求重置数据库、或者临时生成新迁移来"纠正"不一致——这些行为对本地无所谓，对生产数据是不可接受的。生产环境的正确命令是 `prisma migrate deploy`（见第七章），它只会执行已经提交好的迁移文件，不会临时生成任何东西。

### 示例一：给订单加一个字段

假设要给订单加一个"用户备注"字段。第一步改 `schema.prisma`：

```prisma
model Order {
  id       String  @id @default(uuid())
  orderNo  String  @unique
  userNote String?
}
```

`String?` 里的 `?` 表示这个字段可以为空。第二步生成迁移，Prisma 会让你输入一个迁移名称，可以填 `add_order_user_note`：

```bash
cd server
npm run prisma:migrate
```

第三步生成 Prisma Client：

```bash
npm run prisma:generate
```

第四步在代码里用上新字段：

```ts
await this.prisma.order.update({
  where: { id: order.id },
  data: { userNote: input.userNote },
});
```

第五步跑测试确认没有破坏原有逻辑：

```bash
npm test
```

### 示例二：新增一张关联表

假设要新增一张"订单备注记录"表，一个订单可以有多条备注（一对多关系）：

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

对照第四章讲过的关系字段规则来读：`OrderNote.orderId` 是真实字段，保存这条备注属于哪个订单；`OrderNote.order` 是 Prisma 关系字段，方便代码里直接拿到订单信息；`Order.notes` 是反向关系，表示"一个订单有多条备注"，同样不是真实列。

查询一个订单并带出它的所有备注：

```ts
await this.prisma.order.findFirst({
  where: { orderNo },
  include: { notes: true },
});
```

### 索引什么时候加

索引可以先理解成"目录"：没有索引时，数据库可能要从头到尾翻一遍表；有索引时，能更快定位到符合条件的数据。项目里常见的索引写法：

```prisma
@@index([userId, createdAt])
@@index([offeringId])
@@index([status, createdAt])
```

大致对应的场景是：经常按 `userId + createdAt` 查订单列表、经常按 `offeringId` 查订单、经常按 `status + createdAt` 查订单，所以各自加了一个索引。

| 场景 | 是否考虑加索引 |
| --- | --- |
| 列表页经常按某字段筛选 | 考虑 |
| 经常按某字段排序 | 考虑 |
| 某字段用于关联另一张表（外键） | 通常要有 |
| 字段很少用于查询条件 | 通常不用 |

不要为了"看起来更快"给所有字段都加索引——索引能加快查询，但会让写入和更新变慢一点，是一个需要权衡的取舍，不是免费的性能提升。

### 迁移文件到底是什么

迁移文件存放在 `server/prisma/migrations/` 下，每个目录通常长这样：

```text
20260702190000_order_intake_forms_jsonb/
  migration.sql
```

可以这样理解两者的关系：`schema.prisma` 是"最终结构说明书"，`migrations/` 目录是"一步一步改造数据库的施工记录"。改了表结构之后提交代码，通常要同时提交这两部分：`schema.prisma` 和对应的新迁移目录。

## 七、本地到生产的发布链路

### 环境变量：DATABASE_URL 怎么配

连接地址由环境变量 `DATABASE_URL` 提供。本地开发模板 `server/.env.example` 里是：

```env
DATABASE_URL="postgresql://postgres@127.0.0.1:5432/mp_health_dev?schema=public"
```

拆开看每一段的含义：

```text
postgresql://    使用 PostgreSQL 数据库
postgres         用户名
127.0.0.1        数据库地址，本机
5432             数据库端口
mp_health_dev    数据库名称
schema=public    使用 public 这个 schema
```

生产模板 `server/.env.production.example` 里是：

```env
DATABASE_URL="postgresql://postgres@127.0.0.1:5432/health_lvtong?schema=public"
```

本地和生产实际读取的都是 `server/.env`（不提交 git，需要各自根据模板手动创建）。**最容易出的低级错误是生产环境的 `.env` 不小心连到了开发库 `mp_health_dev`**，发布前一定要确认这一点。

### 生产发布该用哪个命令

本地开发用 `prisma migrate dev`（见第六章）；生产发布只能用 `prisma migrate deploy`：

```bash
cd server
npm run prisma:migrate:deploy
npm run prisma:generate
```

`migrate deploy` 只会执行已经提交、已经在 `migrations/` 目录里存在的迁移文件，不会在生产环境临时生成新的迁移——这正是它比 `migrate dev` 安全的地方。

项目日常发布脚本已经把这一步包含在内了，正常发布直接执行：

```bash
bash server/scripts/deploy-production.sh
```

这个脚本默认按顺序做：`git pull` → `npm ci` → `prisma migrate deploy` → `prisma generate` → `npm run build` → `pm2 reload` → 健康检查。

### 发布前的安全确认清单

删除表、删除字段、修改字段类型这类变更要格外谨慎，执行生产迁移前至少确认：

1. 生产数据库已有备份。
2. `migration.sql` 已经人工检查过内容。
3. 代码里已经不再读取被删除的表或字段。
4. 能接受这次结构变更的回滚成本。

如果 `migration.sql` 里出现下面这些语句，要停下来认真确认它们的影响，而不是直接执行：

```sql
DROP TABLE
DROP COLUMN
ALTER COLUMN
```

这些通常意味着会删除数据，或者改变已有数据的保存方式，一旦执行、数据可能就回不来了。

## 八、排查问题的工具箱：三种手段怎么选

排查问题（比如"用户说下单后看不到订单"）时，先从业务问题本身拆起，而不是直接扎进数据库：用户是谁（`userId` 或手机号）、订单号是什么、产品 `offeringCode` 是什么、大概什么时间下单——问清楚这些，再决定去哪张表查。

| 想查什么 | 主要看哪张表 |
| --- | --- |
| 用户是否存在 | `User` |
| 用户订单 | `Order` |
| 下单产品 | `ProductOffering` |
| 支付状态 | `Payment` |
| 退款状态 | `Refund` |
| 状态流转记录 | `OrderStatusEvent` |
| 后台任务 | `Job` 相关表，以 schema 实际定义为准 |

确定要查哪张表之后，有三种排查手段，各有适用场景：

| 工具 | 适合场景 | 不适合场景 |
| --- | --- | --- |
| Prisma 临时脚本 | 不熟 SQL、需要复杂关联查询、想要类型提示和代码复查 | 想要图形化浏览大量数据、快速筛选 |
| `psql` 命令行 | 已经熟悉 SQL、需要快速执行一条查询、在服务器上没有图形界面 | 不熟 SQL 时容易手滑写错条件 |
| Navicat 图形化工具 | 想直观浏览表结构和数据、简单条件筛选、导出小批量数据 | 涉及多表关联的复杂查询（不如直接写 SQL 清楚） |

**不熟 SQL 时，优先用 Prisma 脚本**，原因是它有类型提示、可读性强、容易复查，出错概率比手写 SQL 低。三种方式都遵循一条共同原则：**排查用只读查询，需要改数据时走脚本化流程（见第十章），不要在排查过程中顺手执行 `UPDATE`/`DELETE`**。

### 用 Prisma 写临时排查脚本

可以在 `server/scripts/` 下新建一个临时脚本，比如 `debug-order.ts`：

```ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const order = await prisma.order.findFirst({
    where: { orderNo: '替换成订单号' },
    include: {
      offering: true,
      serviceDefinition: true,
      payments: true,
      refunds: true,
      events: { orderBy: { createdAt: 'asc' } },
    },
  });

  console.dir(order, { depth: null });
}

main().finally(async () => {
  await prisma.$disconnect();
});
```

运行：

```bash
cd server
npx tsx scripts/debug-order.ts
```

> 临时排查脚本不要提交真实订单号、手机号、openid 等敏感信息；排查完如果没有长期价值，用完就删掉，不要留在仓库里越积越多。

### 用 psql 做快速排查

连接本地库：

```bash
psql "postgresql://postgres@127.0.0.1:5432/mp_health_dev?schema=public"
```

进入后常用命令：`\dt` 查看有哪些表；`\d "Order"` 查看 `Order` 表结构。

```sql
SELECT "orderNo", "userId", status, "offeringId", "createdAt"
FROM "Order"
ORDER BY "createdAt" DESC
LIMIT 10;
```

上面这条查最近 10 条订单。**注意：本项目表名和字段名很多是大写开头或驼峰写法，SQL 里必须加双引号**，比如 `"Order"`、`"ProductOffering"`、`"orderNo"`，不加引号 PostgreSQL 会默认按全小写去匹配，直接查不到。如果还不熟 SQL，SQL 查询要先从只读 `SELECT` 开始，不要一上来就写 `UPDATE` 或 `DELETE`。

### 用 Navicat 做图形化排查

Navicat 可以理解成"数据库版 Excel + 查询窗口"，适合浏览表、筛选数据、写只读 SQL、导出少量排查结果。新建 PostgreSQL 连接时的字段对应关系：

| Navicat 字段 | 对应 `DATABASE_URL` 里的部分 |
| --- | --- |
| Host / 主机 | `127.0.0.1` 或服务器数据库地址 |
| Port / 端口 | `5432` |
| User Name / 用户名 | `postgres` |
| Database / 数据库 | `mp_health_dev`（本地）或 `health_lvtong`（生产） |
| Schema | 通常是 `public` |

连接成功后常见路径是：连接名 → Databases → 目标数据库 → Schemas → public → Tables。打开表能看到字段、数据和索引，字段名要对照 `schema.prisma` 看，不要只凭界面猜测业务含义。

简单条件（比如 `orderNo` 等于某个值）可以直接用表格自带的筛选功能；一旦涉及多张表关联（比如"订单关联产品"），不要在表格界面里来回点，直接打开查询窗口写 SQL 更清楚，第九章的速查 SQL 可以直接粘贴进去用。

> **生产库连接要养成的安全习惯**：连接名明确标注 PROD（比如 `health_lvtong_PROD`），并且用不同颜色区分，避免手滑连错库；默认只写 `SELECT`；执行 `UPDATE`/`DELETE` 前先 `SELECT` 确认影响范围；真要修改数据，优先走 Prisma 脚本（第十章），不要在 Navicat 里临时手改；不熟 SQL 时，不要点"设计表""删除表""清空表"这类界面按钮。
>
> 如果在 Navicat 里手动改了表结构，但没有同步修改 `schema.prisma` 和迁移文件，项目代码根本不知道这个变化，后续发布还可能覆盖或冲突——所以表结构变更永远走第六章那套"改 schema → 生成迁移 → 提交代码 → 生产 `migrate deploy`"的流程，不要在 Navicat 里点界面直接改。

## 九、速查附录：项目常用排查 SQL

以下 SQL 主要用于只读排查，复制使用前先把示例里的订单号、用户 ID、产品编码替换成真实值。本项目很多表名和字段名是大写或驼峰写法，SQL 里要加双引号，比如 `"Order"`、`"ProductOffering"`、`"orderNo"`、`"offeringCode"`。

**排查的基本套路**：先查 `Order` 主表确认订单是否存在、状态是什么；再查 `ProductOffering` 确认下单产品是否正确；涉及支付查 `Payment`；涉及退款查 `Refund`；涉及状态变化查 `OrderStatusEvent`；涉及通知或异步任务查 `NotificationLog` 和 `Job`；涉及后台操作查 `AuditLog`。

### 查最近订单

用于快速确认最近是否有新订单写入。

```sql
SELECT
  "orderNo", "userId", status, "serviceType",
  "paymentMode", "payableCents", "createdAt"
FROM "Order"
ORDER BY "createdAt" DESC
LIMIT 20;
```

### 按订单号查订单主信息

这是订单排查最常用的入口。

```sql
SELECT
  id, "orderNo", "userId", "offeringId", "serviceDefinitionId",
  "serviceType", status, "titleSnapshot", "priceCents", "payableCents",
  "paymentMode", source, "createdAt", "updatedAt",
  "paidAt", "completedAt", "cancelledAt"
FROM "Order"
WHERE "orderNo" = '替换成订单号';
```

### 按订单号查产品信息

订单表只保存 `offeringId`，产品名称、编码、上下架状态在 `ProductOffering`。

```sql
SELECT
  o."orderNo", o.status AS "orderStatus",
  p.id AS "offeringId", p."offeringCode", p."displayName",
  p.visibility, p."isOnSale", p."allowSelfPay", p."priceCents"
FROM "Order" o
JOIN "ProductOffering" p ON p.id = o."offeringId"
WHERE o."orderNo" = '替换成订单号';
```

### 按用户查订单列表

用于排查"用户说看不到订单"。

```sql
SELECT
  "orderNo", status, "serviceType", "titleSnapshot",
  "payableCents", "paymentMode", "createdAt"
FROM "Order"
WHERE "userId" = '替换成用户ID'
ORDER BY "createdAt" DESC
LIMIT 50;
```

### 按手机号查用户

手机号是敏感信息，查询结果不要复制到公开文档或提交到 git。

```sql
SELECT id, mobile, "wechatOpenid", status, "createdAt", "lastLoginAt"
FROM "User"
WHERE mobile = '替换成手机号';
```

查到用户 `id` 后，再用上面"按用户查订单列表"继续排查。

### 按产品编码查在售产品

用于确认前端传入的 `offeringCode` 是否存在、是否企业权益、是否在售。

```sql
SELECT
  id, "offeringCode", "displayName", visibility, "isOnSale",
  "allowSelfPay", "priceCents", "serviceDefinitionId",
  "audienceSegmentId", "createdAt", "updatedAt"
FROM "ProductOffering"
WHERE "offeringCode" = '替换成产品编码';
```

### 查所有在售产品

用于核对当前有哪些产品可下单。

```sql
SELECT
  "offeringCode", "displayName", visibility, "isOnSale",
  "allowSelfPay", "priceCents", "sortOrder"
FROM "ProductOffering"
WHERE "isOnSale" = true
ORDER BY visibility, "sortOrder", "updatedAt" DESC;
```

### 查同一产品的待完善订单

用于排查"为什么下单被拦截去完善旧订单"。

```sql
SELECT
  o."orderNo", o."userId", o.status, o."titleSnapshot",
  p."offeringCode", p."displayName", o."createdAt"
FROM "Order" o
JOIN "ProductOffering" p ON p.id = o."offeringId"
WHERE o."userId" = '替换成用户ID'
  AND o.status = 'PENDING_FORM'
  AND p."offeringCode" = '替换成产品编码'
ORDER BY o."createdAt" DESC;
```

### 查订单支付记录

用于排查"已支付但订单状态不对"或"支付回调是否成功"。

```sql
SELECT
  p.id, p."orderId", p."outTradeNo", p.provider, p.status,
  p."amountCents", p."transactionId",
  p."createdAt", p."updatedAt", p."paidAt"
FROM "Payment" p
JOIN "Order" o ON o.id = p."orderId"
WHERE o."orderNo" = '替换成订单号'
ORDER BY p."createdAt" DESC;
```

### 按商户单号查支付记录

如果微信支付侧给的是 `out_trade_no`，通常对应这里的 `outTradeNo`。

```sql
SELECT
  id, "orderId", "outTradeNo", status,
  "amountCents", "transactionId", "createdAt", "paidAt"
FROM "Payment"
WHERE "outTradeNo" = '替换成商户单号';
```

### 查订单退款记录

用于排查退款是否发起、是否成功、失败原因是什么。

```sql
SELECT
  r.id, r.status, r."amountCents", r.reason, r."outRefundNo",
  r."operatorId", r."requestedAt", r."succeededAt", r."failedAt"
FROM "Refund" r
JOIN "Order" o ON o.id = r."orderId"
WHERE o."orderNo" = '替换成订单号'
ORDER BY r."requestedAt" DESC;
```

### 查订单状态流转记录

用于排查订单状态是何时、因为什么原因变化的。

```sql
SELECT
  e."fromStatus", e."toStatus", e."actorType", e."actorId",
  e.reason, e.metadata, e."createdAt"
FROM "OrderStatusEvent" e
JOIN "Order" o ON o.id = e."orderId"
WHERE o."orderNo" = '替换成订单号'
ORDER BY e."createdAt" ASC;
```

### 查订单通知发送记录

用于排查管理员或用户是否收到微信订阅消息。

```sql
SELECT
  "orderNo", scene, status, "receiverUserId", "receiverOpenid",
  "templateId", error, "sentAt", "createdAt"
FROM "NotificationLog"
WHERE "orderNo" = '替换成订单号'
ORDER BY "createdAt" DESC;
```

### 查待执行或失败任务

用于排查通知、提醒等异步任务是否卡住。

```sql
SELECT
  id, type, status, payload, attempts, "maxAttempts",
  "lastError", "runAt", "lockedAt", "finishedAt", "createdAt"
FROM "Job"
WHERE status IN ('PENDING', 'FAILED')
ORDER BY "runAt" ASC
LIMIT 50;
```

只想按订单号查任务，可以在 JSON 载荷里搜订单号：

```sql
SELECT id, type, status, payload, attempts, "lastError", "createdAt"
FROM "Job"
WHERE payload::text LIKE '%替换成订单号%'
ORDER BY "createdAt" DESC;
```

### 查审计日志

用于排查后台谁操作过订单、做了什么动作。

```sql
SELECT
  action, "actorType", "actorUserId", "resourceType", "resourceId",
  "orderNo", before, after, metadata, "createdAt"
FROM "AuditLog"
WHERE "orderNo" = '替换成订单号'
ORDER BY "createdAt" DESC;
```

### 统计不同状态订单数量

用于快速看订单状态分布。

```sql
SELECT status, COUNT(*) AS count
FROM "Order"
GROUP BY status
ORDER BY count DESC;
```

### 查某天创建的订单

项目使用 `Asia/Shanghai` 业务时区，但数据库时间字段是 `timestamptz`。按自然日排查时，建议明确写出时区边界，不要依赖默认时区推断：

```sql
SELECT "orderNo", status, "titleSnapshot", "createdAt"
FROM "Order"
WHERE "createdAt" >= TIMESTAMPTZ '2026-07-03 00:00:00+08'
  AND "createdAt" <  TIMESTAMPTZ '2026-07-04 00:00:00+08'
ORDER BY "createdAt" DESC;
```

## 十、修改生产数据的安全流程

### 排查和改数据是两件事，流程不一样

只是排查，用 `SELECT` 或 Prisma 只读查询（第八、九章）就够了。要真正修复数据，不要在数据库里手动改，优先写一次性脚本——脚本可读、可复查、跑之前能先改成查询模式验证条件对不对，这些是手改数据库做不到的。

修复某个订单标题的例子：

```ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const order = await prisma.order.update({
    where: { orderNo: '替换成订单号' },
    data: { titleSnapshot: '修复后的标题' },
  });

  console.log(order.orderNo, order.titleSnapshot);
}

main().finally(async () => {
  await prisma.$disconnect();
});
```

运行前，建议先把 `update` 临时改成 `findUnique` 或 `findFirst` 跑一遍，确认命中的确实是预期那条订单，再改回 `update` 正式执行。

### 表结构迁移和新增业务数据不是一回事

```text
表结构迁移：改变有哪些表、字段、索引和关系（见第六章）
新增业务数据：往已有表里增加一条产品、配置、角色或其他业务记录
```

生产环境新增业务数据，同样优先写一次性 Prisma 脚本，不建议直接手敲 SQL——Prisma 脚本可读可复查，能用 `upsert` 避免重复插入，字段名和关系有类型提示，比手写 `INSERT` 更不容易写错。

推荐流程：本地写脚本 → 在本地或测试库验证 → 确认生产 `server/.env` 指向生产库 → 生产服务器执行脚本 → 查询验证结果。

新增或更新一个在售产品的例子：

```ts
// server/scripts/ops/upsert-product-offering.ts
import { PrismaClient, ProductVisibility } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const serviceDefinition = await prisma.serviceDefinition.findFirstOrThrow({
    where: { category: { code: 'EMPLOYEE_SERVICE' }, enabled: true },
  });

  const offering = await prisma.productOffering.upsert({
    where: { offeringCode: 'staff_x' },
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

  console.log({ id: offering.id, offeringCode: offering.offeringCode, displayName: offering.displayName });
}

main().finally(async () => {
  await prisma.$disconnect();
});
```

`upsert` 的语义是：`offeringCode` 已存在就更新，不存在就创建，避免手动先查一遍再决定走 `create` 还是 `update`。

生产服务器执行前，先确认当前目录和环境变量：

```bash
cd server
cat .env
```

重点确认 `NODE_ENV=production`，并且 `DATABASE_URL` 指向生产库 `health_lvtong`，而不是开发库 `mp_health_dev`——这是发布类事故里最常见、也最容易避免的一类失误。确认无误后执行脚本：

```bash
npx tsx scripts/ops/upsert-product-offering.ts
```

执行后用只读 SQL 或 Prisma 查询验证数据是否正确。

### 如果必须直接写 SQL

至少先用事务包起来，确认无误后再提交：

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

先用 `ROLLBACK` 跑一遍确认结果完全符合预期，再把 `ROLLBACK` 改成 `COMMIT` 正式提交。如果还不熟 SQL，本项目里更推荐优先使用 Prisma 脚本这条路径。

> **生产数据排查与修改的安全规则**：优先只读查询；不直接执行 `DELETE`；不直接执行大范围 `UPDATE`；修改生产数据前先备份、确认条件、找人复核；查询结果不要复制到公开聊天或提交到 git；不要把 `DATABASE_URL`、openid、手机号、身份证号写进文档或代码。像 `DELETE FROM "Order";` 这种没有 `WHERE` 条件的语句，一旦手滑执行就是整张表清空，不要抱有侥幸心理。

## 十一、常见错误怎么判断

| 现象 | 常见原因 | 处理 |
| --- | --- | --- |
| `DATABASE_URL is required` | 没有配置数据库连接 | 检查 `server/.env` |
| Prisma `P1003` | 数据库不存在，或连接到了错误的库 | 检查 `DATABASE_URL` 里的库名 |
| 找不到某个 Prisma 字段（类型报错） | 改了 schema 但没跑 `generate` | 执行 `npm run prisma:generate` |
| 生产启动拒绝连接 | 生产环境连到了 dev/test/local 库 | 修改生产 `server/.env` |
| 迁移失败 | migration 记录和数据库当前实际结构不一致 | 停止发布，先查迁移 SQL 和备份，不要强行继续 |
| 查询结果没有关联对象 | 没写 `include` 或 `select` 关联字段 | 加上 `include: { offering: true }` 之类的声明 |

## 十二、最重要的几条习惯

日常开发的命令速查：只改业务查询，跑 `npm test` 即可；改了 `schema.prisma`，要依次跑 `npm run prisma:migrate` → `npm run prisma:generate` → `npm test`；拉取了别人改的 schema 或 migration，要 `npm install` → `npm run prisma:generate` → `npm run prisma:migrate:deploy` → `npm test`；本地启动服务用 `npm run dev`；生产发布用 `bash server/scripts/deploy-production.sh`。

比记住命令更重要的是这几条习惯：

1. 写查询前先看 `schema.prisma`，搞清楚这张表实际有哪些字段。
2. 主表真实字段可以直接写在 `where` 里；关系字段不是数据库真实列，是 Prisma 根据 `@relation` 提供的入口，已经有外键 id 时优先用外键字段查询。
3. 改表结构一定要生成并提交迁移文件，不要指望"代码能跑就行"，数据库那边也要跟着走完整流程。
4. 本地用 `prisma migrate dev`，生产永远用 `prisma migrate deploy`，这两个命令不能混用。
5. 生产排查先只读；确实需要修改数据，走脚本化、可复核、可回滚的路径，而不是在数据库里手动改一下就完事。
