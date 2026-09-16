> 记录 Nest 里 `@Controller`、`@Get` 这类装饰器是怎么把一个普通类方法变成一个真实的 HTTP 路由的，不是背 API，而是搞清楚这层"魔法"背后到底发生了什么。

## 一、装饰器要解决什么问题

用原生 Express 写路由，是手动把路径、方法、处理函数一条条注册到一个路由表里：

```ts
app.get('/users/:id', (req, res) => {
  res.json(userService.findOne(req.params.id));
});
app.post('/users', (req, res) => {
  res.json(userService.create(req.body));
});
```

路由信息（路径、方法）和业务逻辑（处理函数）写在一起，项目大了之后路由表分散在各处的 `app.get/post/put` 调用里，很难一眼看出"这个 Controller 一共暴露了哪些接口"。

Nest 把这层声明搬到了装饰器上：

```ts
@Controller('users')
export class UsersController {
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}
```

路径和方法变成了方法上的"标签"，一个 Controller 类里所有装饰器扫一遍就能看出完整的接口清单。但要注意：**装饰器本身不做路由匹配和请求分发**，它只是往类和方法上贴元数据；真正把 URL 分发到对应方法，是 Nest 启动阶段读取这些元数据、注册到底层 HTTP 框架（Express/Fastify）之后才发生的事。这也是下面"实现原理"要讲的部分。

---

## 二、基本用法

一个 Controller 通常由三类装饰器组成：

| 装饰器 | 作用位置 | 作用 |
| --- | --- | --- |
| `@Controller('users')` | 类 | 声明这个类下所有路由的公共前缀 `/users` |
| `@Get()` / `@Post()` / `@Put()` / `@Delete()` | 方法 | 声明该方法响应的 HTTP 方法和子路径 |
| `@Param()` / `@Query()` / `@Body()` | 方法参数 | 声明该参数从请求的哪个部分取值 |

方法装饰器的路径参数会和类装饰器的前缀拼接，比如上面例子里 `findOne` 实际监听的是 `GET /users/:id`。参数装饰器和路由装饰器走的是同一套元数据机制，只是挂载的位置从"方法"变成了"方法的某个参数"——这一点在下一节看完原理之后会更容易理解。

---

## 三、实现原理

### 装饰器的执行时机

先明确一个容易搞混的点：`@Get(':id')` 这一行代码，是在**类被定义的时候**执行一次，而不是每次请求进来时执行。TypeScript 装饰器本质是一个在类/方法声明时被调用的函数，它拿到的是"目标类"或"目标方法"这个引用，能做的事就是往这个引用上挂点什么东西——Nest 选择挂的东西，就是路由元数据。

### reflect-metadata：元数据存在哪

Nest 底层依赖 `reflect-metadata` 这个库，在装饰器函数内部调用 `Reflect.defineMetadata(key, value, target)`，把信息以键值对的形式挂到类或方法对象上。简化后 `@Get()` 大致是这样实现的：

```ts
function Get(path: string = ''): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    Reflect.defineMetadata('method', 'GET', descriptor.value);
    Reflect.defineMetadata('path', path, descriptor.value);
    return descriptor;
  };
}
```

`@Controller('users')` 同理，把前缀路径挂到类本身上。到这一步为止，程序里还没有任何真正的路由，只是每个方法对象身上多了几条"贴纸"——这些贴纸可以在之后任意时刻通过 `Reflect.getMetadata(key, target)` 读出来。

上面 `Get()` 返回的函数拿到的三个参数，是 TypeScript 方法装饰器的固定签名，对应关系可以这样理解：

```ts
class UsersController {
  @Get('users')
  findOne() { /* ... */ }
}

// 等价于引擎在类定义时这样调用了一次装饰器函数：
Get('users')(
  UsersController.prototype,   // target：方法所在的类原型
  'findOne',                    // propertyKey：方法名
  Object.getOwnPropertyDescriptor(UsersController.prototype, 'findOne')  // descriptor
);
```

`descriptor` 就是 `Object.getOwnPropertyDescriptor` 返回的属性描述符，长这样：

```js
{
  value: [Function: findOne], // 方法本身的函数引用
  writable: true,
  enumerable: false,
  configurable: true,
}
```

`descriptor.value` 就是 `findOne` 这个函数对象本身。元数据挂在 `descriptor.value` 上而不是 `target` 上，是因为路由信息是这一个方法专属的：挂在函数对象自己身上，之后不管从哪里拿到这个函数引用（比如遍历 prototype 上的方法列表时），都能精确读出这个方法自己的路由信息，不会和同一个类里其他方法的元数据混在一起。`@Controller()` 反过来是把前缀直接挂在 `target`（类本身）上，因为前缀是整个类共享的信息，不存在"挂在哪个方法上"的问题。

### 这跟 Java 的反射是一回事吗

概念上像，但机制不同，更准确的对应关系是 Java 的**注解 + 反射读取注解**，而不是反射本身：

| Java | TS + Nest |
| --- | --- |
| `@GetMapping("/users")` 注解 | `@Get('users')` 装饰器 |
| 运行时用反射读注解（`method.getAnnotation(...)`） | 运行时用 `Reflect.getMetadata` 读装饰器写入的元数据 |
| JVM 原生支持"自省任意类的方法、字段列表" | JS 没有这种语言级自省能力 |

Java 反射能直接自省任意类的结构：不需要提前标记，`Class.getDeclaredMethods()`、`getFields()` 就能拿到方法、字段列表，这是 JVM 原生具备的能力。JS 没有这种能力——没法凭空问"这个类有哪些方法"。`reflect-metadata` 这个库做的事，其实是提供一套 `Reflect.defineMetadata`/`getMetadata` API，让开发者手动往对象上挂键值对，之后再手动读出来，本身不会扫描代码结构。所以 Nest 这套机制本质是在模拟"Java 注解 + 反射读取"的组合效果，只是 JS 生态里没有语言原生支持，得靠这个库和装饰器配合手动实现。

### 启动阶段：扫描元数据，注册真实路由

真正"变成路由"发生在应用启动、调用 `NestFactory.create()` 之后。Nest 内部会：

1. 遍历所有被 `@Module` 收纳的 Controller 类；
2. 对每个 Controller，用 `Reflect.getMetadata` 读出类上的路径前缀，再遍历它的所有方法，读出每个方法上的 HTTP 方法和子路径元数据；
3. 把"前缀 + 子路径 + HTTP 方法 + 处理函数"这四元组，逐条注册到底层 HTTP 适配器（默认是 Express，也可以换成 Fastify）的真实路由表里——本质上就是替你调用了一遍 `app.get(finalPath, handler)`；
4. 参数装饰器（`@Param`/`@Body` 等）的元数据也会被读到，但它不是用来注册路由的，具体怎么用、什么时候用，见下一小节。

### @Body() 这类参数装饰器：元数据是在请求时才被消费的

`@Body()` 和 `@Get()` 挂载的位置不一样：`@Get()` 是方法装饰器，`@Body()` 是**参数装饰器**，签名里多了一个 `parameterIndex`，标记的是"方法的第几个参数"：

```ts
function Body(): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    const existing = Reflect.getMetadata(ROUTE_ARGS_METADATA, target.constructor, propertyKey) || {};
    existing[`body:${parameterIndex}`] = { index: parameterIndex, type: 'body' };
    Reflect.defineMetadata(ROUTE_ARGS_METADATA, existing, target.constructor, propertyKey);
  };
}
```

也就是说 `addData(@Body() dto: CreateUserDto)` 执行到这一行时，只是往 `addData` 这个方法上记了一笔"第 0 个参数要从 body 里取"，跟 `@Get()` 一样是声明期打标记，本身不涉及任何真实请求。

真正的区别在于这份元数据**什么时候被读**：

- `@Controller`/`@Get` 的元数据只在应用启动时读一次，用来生成路由表，之后就不再看了；
- `@Body`/`@Param`/`@Query` 的元数据是**每次请求命中这个路由时都要重新读一次**——Nest 在请求处理管道（`RouterExecutionContext`）里，会按这份"参数装配说明书"，从当前请求的 `req.body`/`req.params`/`req.query` 里分别取值，按索引拼成一个参数数组，再用类似 `handler.apply(controllerInstance, args)` 的方式调用真正的方法。

所以 `addData(@Body() dto: CreateUserDto)` 能拿到请求体，不是因为 Nest "认识" `dto` 这个参数名或 `CreateUserDto` 这个类型，而是运行时按索引把提前提取好的值一个个塞进了调用参数列表——这也是为什么参数装饰器必须紧贴在对应参数前面：换了位置就是换了这个位置要提取哪部分请求数据，跟参数名本身无关。

所以从头到尾，装饰器语法解决的只是"声明期"的问题——把路由和参数信息以一种结构化、可被反射读取的方式贴在代码旁边；真正的路由分发和参数装配，还是最终落回了 Express/Fastify 原生机制之上，Nest 只是在启动时和每次请求时分别把两类"贴纸"翻译成了对它们的调用。理解这一层，就知道为什么装饰器不能加在运行时动态生成的方法上（此时类已经定义完毕，装饰器早就执行过了），也能理解为什么 Nest 的启动阶段比一个原生 Express 应用要慢一些——多了这一整套反射扫描的过程。
