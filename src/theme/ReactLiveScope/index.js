import React from 'react';

const DataLog = (props) => {
  let { children: data } = props
  console.log('-' + decodeURIComponent(location.pathname.split('/').pop()) + 'LiveCode:', data)
  const type = Object.prototype.toString.call(data).slice(8, -1)
  if (type === 'Object') {
    data = JSON.stringify(data)
  }
  if (type === 'Array') {
    data = data.toString()
  }
  return <div>
    <code>{data}</code> - {type}
  </div>
}

// 在这里添加你需要的 react-live 导入项
const ReactLiveScope = {
  React,
  ...React,
  DataLog,
};

export default ReactLiveScope;