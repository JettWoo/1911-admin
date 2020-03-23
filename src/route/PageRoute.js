import React, { Component, Fragment } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Admin from '../pages/Admin/Admin'
import Login from '../pages/Login/Login'
import User from '../pages/User/User'
import Goods from '../pages/Goods/Goods'

export default class PageRoute extends Component {
  render() {
    return (
      <Fragment>
        <HashRouter>
          <Switch>
            <Route path='/login' component={Login}></Route>
            
            <Route path='/admin' render = {() => {
              return (
                <Admin>
                  <Route path='/admin/main' render={()=> {
                    return (
                      <h2>欢迎来到xx管理系统</h2>
                    )
                  }}></Route>
                  <Route path='/admin/user' component={User}></Route>
                  <Route path='/admin/goods' component={Goods}></Route>
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
