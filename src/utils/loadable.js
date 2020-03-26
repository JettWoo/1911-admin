import React from 'react'
import LoadAble from 'react-loadable'

// 过度组件
function LoadingComponent () {
  return (
    <div>这里是过度组件</div>
  )
}

export default (LoadComponent) => {
  return LoadAble({
    loader: LoadComponent,
    loading: LoadingComponent
  })
}