## guard inspector pipe filters区别

## jwt生成token后，后端服务重启如何再验证之前生成的token

## dto和entity区别

## 保证数据响应
![](../../../static/docs/Pasted%20image%2020260914151347.png)

## TypeORM 实体装饰器基础

`@Entity` 这类装饰器本质上和前面 Nest 路由装饰器是同一套思路：装饰器本身只是往类和属性上打元数据标记，不直接操作数据库；真正"变成表结构"是 TypeORM 在启动同步或跑迁移时，读取这些标记生成 DDL 语句。先认这几个常见装饰器，后面看关系装饰器的例子才不会觉得眼生。

### 常见装饰器

- `@Entity('users')`：类装饰器，声明这个类对应数据库的 `users` 表；不传参数时默认用类名生成表名。
- `@PrimaryGeneratedColumn()`：自增主键列；写成 `@PrimaryGeneratedColumn('uuid')` 就换成自动生成的 UUID 主键。
- `@PrimaryColumn()`：也是主键，但不自动生成，需要自己赋值（比如业务上就用手机号当主键）。
- `@Column(options)`：普通列，常用配置项：`type`（数据库类型）、`length`、`nullable`、`default`、`unique`、`name`（映射到数据库里的实际列名，跟属性名不一致时用）。
- `@CreateDateColumn()` / `@UpdateDateColumn()`：分别在 insert / update 时自动写入时间戳，不用手动赋值。
- `@DeleteDateColumn()`：配合软删除（`repository.softRemove()`）使用，删除时不真的删记录，只把这一列写上删除时间。

### 示例

```ts
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

对应生成的表结构大致是：`id` 自增主键、`name varchar(50)`、`email varchar unique`、`isActive boolean default true`，`createdAt`/`updatedAt` 两列由 TypeORM 自动维护，不需要在业务代码里手动赋值。

> `@Entity()` 本身不会建表，它只是打标记。真正建表靠两种方式：开发环境常用 `synchronize: true`，让 TypeORM 每次启动都按实体结构自动建表/改表；生产环境应该用迁移文件（`migration:generate` + `migration:run`），因为 `synchronize` 在生产环境直接对着线上表结构做增删列，一旦实体定义写错很容易直接把线上表结构改坏。

## OneToOne oneToMany ManyToMany

### 解决什么问题

ER 建模里数据之间的关联只有三种基数关系：一对一、一对多、多对多。TypeORM 用 `@OneToOne`/`@OneToMany`+`@ManyToOne`/`@ManyToMany` 这三组装饰器对应这三种关系，落到数据库层面，区别只在两件事：**外键放在哪张表**、**要不要额外的中间表**。搞清楚这两点，三种关系的写法就是水到渠成的结果，不用死记装饰器怎么配对。

### 三种关系的定义与用法

**OneToOne（一对一）**：外键放在其中一方，用 `@JoinColumn()` 显式声明外键落在哪一边。

```ts
// user.entity.ts
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Profile)
  @JoinColumn() // 外键 profileId 落在 user 表
  profile: Profile;
}

// profile.entity.ts
@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.profile)
  user: User; // 反向映射，不产生任何列
}
```

**OneToMany / ManyToOne（一对多，两个装饰器成对出现）**：外键始终放在"多"的那一方，"一"的那一方不存外键。

```ts
// department.entity.ts（一）
@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];
}

// employee.entity.ts（多）
@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Department, (department) => department.employees)
  department: Department; // 外键 departmentId 落在 employee 表
}
```

**ManyToMany（多对多）**：两边都不存对方的外键，TypeORM 会自动生成一张中间表存两边的主键对；只有一方写 `@JoinTable()`，代表由这一方维护中间表。

```ts
// article.entity.ts
@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Tag)
  @JoinTable() // 中间表 article_tags_tag 由这一方维护
  tags: Tag[];
}

// tag.entity.ts
@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Article, (article) => article.tags)
  articles: Article[]; // 反向映射
}
```

| 关系                  | 外键位置                                | 中间表 | 关键装饰器                                                  |
| --------------------- | --------------------------------------- | ------ | ----------------------------------------------------------- |
| OneToOne              | 任意一方（写 `@JoinColumn()` 的那一方） | 否     | `@OneToOne` + 一方 `@JoinColumn()`                          |
| OneToMany / ManyToOne | "多"的一方                              | 否     | 一方 `@OneToMany`，另一方 `@ManyToOne`                      |
| ManyToMany            | 都不存                                  | 是     | 一方 `@ManyToMany` + `@JoinTable()`，另一方只 `@ManyToMany` |

> `@JoinColumn()`/`@JoinTable()` 只能写在关系的一边，两边都写会报错；反向那一方的装饰器只是给 TypeORM 提供反向查询用的元信息，不会在数据库层面产生任何列或表。

### 配套机制

三种关系定义好之后，实际项目里还会遇到几个绕不开的配置项：

**级联操作 cascade**：默认情况下，保存/删除一方不会自动处理关联的另一方，需要各自调用一次 `save`/`remove`。加上 `cascade` 选项后，操作"一"的一方时会自动带上关联数据：

```ts
@OneToMany(() => Employee, (employee) => employee.department, { cascade: true })
employees: Employee[];
```

```ts
const department = new Department();
department.employees = [new Employee(), new Employee()];
await departmentRepository.save(department); // cascade: true，employees 会跟着一起 insert
```

`cascade` 也可以只开放部分操作，比如 `{ cascade: ['insert', 'update'] }`，避免"保存的时候误把关联记录也删了"这种意外。

**eager / lazy 加载**：控制关联数据默认要不要一起查出来。

- `eager: true`：每次查询这个实体都会自动 JOIN 加载关联数据，不用在查询时手动加 `relations` 选项；只能在关系的一方声明，两边都设 `eager: true` 会报错。
- 关联属性声明为 `Promise<T>`（lazy relation）：访问该属性时才会触发一次额外查询，需要 `await`。

```ts
@OneToMany(() => Employee, (employee) => employee.department, { eager: true })
employees: Employee[];
```

`eager` 用起来省事，但每次查询这个实体都会带上关联表，用不到关联数据的场景也逃不掉这次 JOIN；更常见的做法是不开 `eager`，查询时按需通过 `relations: ['employees']` 显式指定。

**自关联（self-referencing relation）**：同一张表关联自己，比如分类的父子结构，两个装饰器都指向实体自身：

```ts
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Category, (category) => category.children)
  parent: Category;

  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];
}
```

**多对多要挂额外字段时，拆成中间实体**：`@ManyToMany` + `@JoinTable()` 自动生成的中间表只有两边的外键，没法加自定义列（比如"加入时间""在项目里的角色"）。这种情况要放弃 `@ManyToMany`，把中间表显式建成一个 Entity，退化成两个一对多关系：

```ts
@Entity()
export class UserProject {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userProjects)
  user: User;

  @ManyToOne(() => Project, (project) => project.userProjects)
  project: Project;

  @Column()
  role: string; // 中间表上的额外字段

  @CreateDateColumn()
  joinedAt: Date;
}
```

**nullable 与 onDelete**：关系装饰器的第三个参数可以配置外键列的约束，对应数据库外键的行为：

```ts
@ManyToOne(() => Department, (department) => department.employees, {
  nullable: false,   // 外键列不能为空，员工必须归属某个部门
  onDelete: 'CASCADE', // Department 被删除时，关联的 Employee 记录一并删除
})
department: Department;
```

`onDelete` 常见取值 `CASCADE`（级联删除）、`SET NULL`（外键置空，需要配合 `nullable: true`）、`RESTRICT`（有关联数据时禁止删除父记录），本质是数据库外键约束的 `ON DELETE` 行为，不是 TypeORM 自己发明的机制。

### 边界：这是 TypeORM 的机制，不是 Nest 的

以上装饰器和配置项都是 **TypeORM** 自己的 API，跟 Nest 框架本身没关系。Nest 只是通过 `@nestjs/typeorm` 这个官方集成包，把 TypeORM 的 Repository、Entity 注入到 Nest 的依赖注入体系里（比如 `@InjectRepository()`），关系怎么定义、怎么查询，完全是 TypeORM 的机制，不是 Nest 发明的。

如果项目换成别的 ORM/ODM，写法会完全不同：

- **Prisma**：关系不用装饰器，写在 `schema.prisma` 里用 `@relation` 声明，比如 `posts Post[]` / `author User @relation(fields: [authorId], references: [id])`，走 `@nestjs/prisma` 集成。
- **Mongoose**（MongoDB，文档型）：没有外键概念，一对多/多对多靠内嵌文档或 `ref` + `populate` 实现，走 `@nestjs/mongoose`。

机制上仍然是"一对一/一对多/多对多"这三种关系思路，但装饰器、配置项要对应查目标 ORM 的文档，不能照搬 TypeORM 的写法。

## Prisma 写法对照

Prisma 不用装饰器，所有模型和关系都写在一个独立的 `schema.prisma` 文件里，用它自己的 DSL 声明；跑 `prisma generate` 之后才会生成对应的 TS 类型和查询客户端。跟 TypeORM 对照着看，能更快上手。

### 模型定义，对应 TypeORM 的 Entity

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String   @db.VarChar(50)
  email     String   @unique
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

对应关系：

| TypeORM | Prisma | 作用 |
| --- | --- | --- |
| `@Entity('users')` | `model User { ... }` | 声明一张表 |
| `@PrimaryGeneratedColumn()` | `id Int @id @default(autoincrement())` | 自增主键 |
| `@Column({ unique: true })` | `email String @unique` | 唯一约束 |
| `@Column({ default: true })` | `isActive Boolean @default(true)` | 默认值 |
| `@CreateDateColumn()` | `createdAt DateTime @default(now())` | 插入时自动写入 |
| `@UpdateDateColumn()` | `updatedAt DateTime @updatedAt` | 更新时自动写入 |

### 三种关系的写法

**一对一**：外键放在其中一方，靠 `@unique` 约束这一列只能对应一条记录（去掉 `@unique` 就变成一对多）。

```prisma
model User {
  id      Int      @id @default(autoincrement())
  profile Profile?
}

model Profile {
  id     Int  @id @default(autoincrement())
  userId Int  @unique // 外键 + 唯一约束，保证一对一
  user   User @relation(fields: [userId], references: [id])
}
```

**一对多**：跟 TypeORM 思路一样，外键放在"多"的一方；"一"的一方用数组字段表示反向关联。

```prisma
model Department {
  id        Int        @id @default(autoincrement())
  employees Employee[]
}

model Employee {
  id           Int        @id @default(autoincrement())
  departmentId Int
  department   Department @relation(fields: [departmentId], references: [id])
}
```

**多对多**：这是跟 TypeORM 差别最大的地方——只要两边都声明对方的数组字段，Prisma 会自动生成隐式中间表，不需要手写类似 `@JoinTable()` 的东西：

```prisma
model Article {
  id   Int   @id @default(autoincrement())
  tags Tag[]
}

model Tag {
  id       Int       @id @default(autoincrement())
  articles Article[]
}
```

如果中间表需要挂额外字段（比如"加入时间""角色"），思路跟 TypeORM 一样：放弃隐式多对多，把中间表显式建成一个 model，退化成两个一对多：

```prisma
model User {
  id           Int           @id @default(autoincrement())
  userProjects UserProject[]
}

model Project {
  id           Int           @id @default(autoincrement())
  userProjects UserProject[]
}

model UserProject {
  userId    Int
  projectId Int
  role      String
  joinedAt  DateTime @default(now())

  user    User    @relation(fields: [userId], references: [id])
  project Project @relation(fields: [projectId], references: [id])

  @@id([userId, projectId]) // 联合主键，代替自增 id
}
```

### 跟 TypeORM 的关键差异

- **多对多不用手写中间表**：TypeORM 需要显式 `@JoinTable()` 声明由哪一方维护中间表，Prisma 看到双方都有对方的数组字段就会自动建隐式中间表，少一步配置，但也意味着这张隐式表没法直接在代码里操作，想加字段就必须提前改成显式 model。
- **没有 `synchronize`，只有 migration**：Prisma 修改 `schema.prisma` 后要跑 `prisma migrate dev` 生成并执行迁移，没有 TypeORM 那种"开发环境自动同步表结构"的模式，相当于强制走了 TypeORM 里更安全的那条路径。
- **查询客户端是生成出来的**：`prisma generate` 会根据 schema 生成带完整类型的 `PrismaClient`，字段改名、关系改动之后类型会跟着变，编译期就能发现用错字段名的问题；TypeORM 的 Repository API 是固定的，Entity 上的字段变化不会自动收紧查询方法的类型约束。