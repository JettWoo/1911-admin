import React, { Component } from 'react'
import {  Layout } from 'antd';
import CustomNav from '../../components/ComtomNav'
import Style from './style/admin.module.less'

const { Header, Sider, Content } = Layout;

export default class Admin extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    return (
      <div className={Style.admin}>
        <Layout className={Style.container}>
          {/* 左侧导航栏 */}
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <CustomNav></CustomNav>
          </Sider>
          {/* 右侧内容区域 */}
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              <h1>XX管理系统</h1>
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}