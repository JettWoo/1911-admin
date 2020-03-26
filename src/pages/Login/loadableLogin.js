import React from 'react'
import LoadAble from 'react-loadable'

function Loading () {
  return(
    <div style = { {width:"100vw",height:"100vh",background:"red"} }> 加载ing</div>
  )
}

export default LoadAble({
  loader: () => import('./Login'), // 需要路由懒加载的组件
  loading: Loading
})