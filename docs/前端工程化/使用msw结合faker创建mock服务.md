## 什么是msw
[MSW (Mock Service Worker) ](https://mswjs.io/)是目前非常推荐的前端 mock 工具，它通过拦截 `fetch` / `XHR` 请求来返回 mock 数据，完全模拟真实请求行为。

**优点：**
- 拦截真实网络请求，无需更改业务代码    
- 支持开发环境与测试环境 mock    
- 支持 REST 和 GraphQL    
- 可以按需启用/禁用    
- 无需修改 API 请求地址

## 添加到项目中
在基于CRA@5创建的react项目中配置，本文档基于"msw": "^2.9.0"编写

### 一、 安装
```bash
npm install msw --save-dev
```

### 二、创建 mock handler，因业务接口正常都会有规范，创建一个方法用于生成RESTful接口响应体
```js
// src/mocks/handlers.js
import { http } from 'msw'
import createResponse from './createResponse'

export const handlers = [
  // 填写需要mock的接口，如handlers未匹配项目则会发起真实http请求。path支持http协议全路径
  http.post(`/api/index`, () => {
    return createResponse({
      id: 1
    })
  }),
]

// src/mocks/createResponse.js
import { HttpResponse } from 'msw'

export default async function createResponse (data, delay = 300) {
  await new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
  return HttpResponse.json({
    status: 0,
    message: '成功',
    content: data,
  })
}
```

### 三、设置 mock service worker
```js
// src/mocks/inject.js
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)
```

### 四、生成`mockServiceWorker.js`到静态资源目录下
```bash
npx msw init public/ --save

// 确认生成后的文件存在
your-project/
├── public/
│   ├── index.html
│   └── mockServiceWorker.js ✅
├── src/
│   └── mocks/
```

### 五、在应用运行前注册，
注意项目中配置的`PUBLIC_URL`变量，如有配置需要明文指定路径。同时添加一个开关是否需要启用mock
```bash
PUBLIC_URL=/m/
REACT_APP_API_MOCK=true
```

```js
// 开启mock服务
if (process.env.REACT_APP_API_MOCK === 'true') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { worker } = require('./mocks/inject.js')
  worker.start({
    serviceWorker: {
      url: `${process.env.PUBLIC_URL}/mockServiceWorker.js`, // 👈 手动指定路径
    },
  })
}
```

如果有遇到请求的接口直接被302重定向并返回index.html的内容，`config/webpackDevServer.config.js`删除重定向逻辑
```js
onAfterSetupMiddleware(devServer) {
  // Redirect to `PUBLIC_URL` or `homepage` from `package.json` if url not match
  // 禁止开发环境自动重定向到首页
  // devServer.app.use(redirectServedPath(paths.publicUrlOrPath));
  // ...
},
```


## 使用faker大魔王动态生成mock内容
[`faker` ](https://github.com/faker-js/faker)是业界主流的随机数据生成库，MSW 可以与它无缝搭配

安装
```bash
npm install @faker-js/faker --save-dev
```

### 与msw集成，并设置生成中文mock数据
```js
// src/mocks/handlers.js
import { http } from 'msw'
// eslint-disable-next-line camelcase
import { Faker, zh_CN } from '@faker-js/faker'
import createResponse from './createResponse'
// eslint-disable-next-line camelcase
const mock = new Faker({ locale: [zh_CN] })
const baseURL = process.env.REACT_APPAPI_ROOT

export const handlers = [

  // 账单列表
  http.post(`${baseURL}/list`, () => {
    return createResponse({
      loanList: Array.from({ length: mock.number.int({ min: 0, max: 5 }) }, () => ({
        loanGid: mock.string.uuid(),
        productType: mock.number.int({ min: 1, max: 2 }),
        exceedDays: mock.number.int({ min: -10, max: 15 }),
        status: mock.helpers.arrayElement([0, 1, 3, 21]),
        repayStatus: mock.number.int({ min: 1, max: 3 }),
        loanAmount: mock.number.int({ min: 10000, max: 100000 }),
        loanLeftAmount: mock.number.int({ min: 10000, max: 100000 }),
        repayLeftSubNum: mock.number.int({ min: 1, max: 3 }),
        repayLeftAmount: mock.number.int({ min: 10000, max: 100000 }),
        loanTime: mock.date.recent().getTime(),
        dueTime: mock.date.recent().getTime(),
        // privilegeInfo: {
        //   forwardLeftAmount: mock.number.int({ min: 10000, max: 100000 }),
        //   privilegeDesc: mock.commerce.productName(),
        //   isOverdue: mock.helpers.arrayElement([true, false]),
        //   dueTime: mock.date.recent().getTime()
        // },
        partnerProduct: {
          rateType: mock.number.int({ min: 1, max: 2 }),
          loanRate: mock.number.int({ min: 1, max: 10 }),
          logoUrl: mock.image.url(),
          apiChannel: mock.helpers.arrayElement([10001, 50001, 50002]), // 随机生成一个数组，数组元素为 10001、20002、10003 中的一个,
          loanTerms: [1, 2, 3],
          period: mock.number.int({ min: 1, max: 12 })
        }
      }))
    })
  }),


  // 
  http.post(`${baseURL}/api/:id`, () => {
    return createResponse({
      productType: 56
    })
  })
]

```

如果仅仅需要有内容即可，可以直接使用默认导出的`faker`实例
```js
import { faker as mock } from '@faker-js/faker'
import createResponse from './createResponse'
```