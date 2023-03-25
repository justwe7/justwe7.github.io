> **[Pro Components](https://procomponents.ant.design/components) 编写的文档只列出了与antd文档有差异或者新增的api，需要对照 [Ant Design](https://ant.design/components/overview-cn/) 进行查阅**

## ProTable
### 全局配置表单查询项宽度
支持`ProTable`标签配置`search`属性或者指定`columns`中单一子项配置`search`对象，[参数文档](https://procomponents.ant.design/components/table?current=1&pageSize=5#search-%E6%90%9C%E7%B4%A2%E8%A1%A8%E5%8D%95)

如全局指定表单查询项布局为`50%(12/24)`
```js
<ProTable search={{
    labelWidth: 'auto',
    span: 12
  }} />
```

### 指定某项表单所占宽度
```js
<ProTable columns={
  {
    title: '手机号',
    colSize: 0.8, // 调整该表单项所占空间宽度span为: 8*n
    order: 10, // 查询项权重，越大越靠前
    dataIndex: 'mobile',
  },
} />
```

### 表单查询项配置为必填
使用 `formItemProps` 传递给 Form.Item 的配置可以配置 rules，但是默认的查询表单 rules 是不生效的。需要通过`form`配置 ignoreRules
```js
<ProTable form={{ ignoreRules: false }} columns={
  {
    title: '标题',
    dataIndex: 'title',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ]
    }
  }
} />
```

### 隐藏表格右上角的工具栏（刷新，设置）
5.2.3版本展示有问题，设置css覆盖掉滚动条: 
  ```js
  <ProTable options={false} />
```
```css
.ant-pro-table-list-toolbar-left {
  // overflow-y: hidden;
  min-height: 32px;
}
```

### 隐藏表单搜索
  ```js
  <ProTable search={false} />
```
```css
.ant-pro-table-list-toolbar-left {
  // overflow-y: hidden;
  min-height: 32px;
}
```

### 表单查询项异步请求
假设有接口 `getSourceList` 返回筛选项list:
```js
'GET /api/token/sources': async (req: Request, res: Response) => {
  await waitTime(500);
  res.status(200).send([
    { label: '全部', value: '1' },
    { label: '微信', value: '2', disabled: true },
    { label: 'h5', value: '3' },
    { label: 'APP', value: '4' },
  ]);
},
```
1. 通过request字段直接定义:
  ```js
   <ProTable columns={[{
    title: '渠道',
    dataIndex: 'source',
    valueType: 'select',
    request: getSourceList
  }]} />
  ```
2. 通过`renderFormItem`指定渲染
  ```js
   <ProTable columns={[{
    title: '渠道',
    dataIndex: 'source',
    valueType: 'select',
    renderFormItem: (_, { defaultRender }) => {
      return (<ProFormSelect
        debounceTime={1000}
        request={getSourceList}
      />)
    },
  }]} />
  ```