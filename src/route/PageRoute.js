import React, { Component, Fragment } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import loadable from '../utils/loadable'
// import Admin from '../pages/Admin/Admin'
import Login from '../pages/Login/loadableLogin'
import User from '../pages/User/User'
import Goods from '../pages/Goods/Goods'
import GoodsAdd from '../pages/Goods/GoodsAdd'
import Administrator from '../pages/Administrator/Adminitstrator'
// import Echarts from '../pages/Echarts/Pie/Pie'
import Echarts from '../pages/Echarts/Line/Line'
const Admin = loadable(()=> import('../pages/Admin/Admin'))
export default class PageRoute extends Component {
  render() {
    return (
      <Fragment>
        <HashRouter>
          <Switch>
            <Redirect exact path='/' to="/admin"></Redirect>
            <Route path='/login' component={Login}></Route>
            
            <Route path='/admin' render = {() => {
              return (
                <Admin>
                  <Switch>
                    <Route path='/admin/main' render={()=> {
                      return (
                        <h2 style={{'text-align': 'center', color: '#333' , fontSize: '36px'}}>欢迎来到xx管理系统</h2>
                      )
                    }}></Route>
                    <Route path='/admin/user' component={User}></Route>
                    <Route path='/admin/goods/add' component={GoodsAdd}></Route>
                    <Route path='/admin/goods' component={Goods}></Route>
                    <Route path='/admin/administrator' render = {() => {
                    return (
                      <Administrator></Administrator>
                      )
                    }} >
                    </Route>
                    <Route path='/admin/statistics' component={Echarts}>

                    </Route>
                  </Switch>
                </Admin>
              )
            }}></Route>
            <Route render = {()=> {
              return (
                <p>404 Pages Not Found</p>
              )
            }}></Route>
          </Switch>
      </HashRouter>
      </Fragment>
    )
  }
}
