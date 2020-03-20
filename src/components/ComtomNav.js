import React, { Component, Fragment } from 'react'
import { Menu } from 'antd'
export default class ComtomNav extends Component {
  render() {
    return (
      <Fragment>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <span>用户管理</span>
          </Menu.Item>
          <Menu.Item key="2">
            {/* <VideoCameraOutlined /> */}
            <span>nav 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            {/* <UploadOutlined /> */}
            <span>nav 3</span>
          </Menu.Item>
        </Menu>
      </Fragment>
    )
  }
}
