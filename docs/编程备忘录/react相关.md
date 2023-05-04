#### 组件兼容html属性

```tsx
import IconNoDataWallet from '@/assets/img/nodatatips/wallet.png'
import React, { ClassAttributes, HTMLAttributes } from 'react'

type IProps = {
  tips?: string
}
const NoData: React.FC<
  JSX.IntrinsicAttributes &
    ClassAttributes<HTMLDivElement> &
    HTMLAttributes<HTMLDivElement> &
    IProps
> = (props) => {
  const { tips = '没有更多数据了', ...domAttr } = props
  return (
    <div className=" pt-64" {...domAttr}>
      <img src={IconNoDataWallet} className=" w-60 mx-auto block" />
      <p className=" text-center text-lg text-gray-light">{tips}</p>
    </div>
  )
}

export default NoData
```