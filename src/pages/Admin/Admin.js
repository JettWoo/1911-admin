import React, { Component } from 'react'
import { Layout} from 'antd';
import CustomNav from '../../components/ComtomNav'
import Style from './style/admin.module.less'
const { Header, Sider, Content, Footer } = Layout;


export default class Admin extends Component {
    constructor () {
        super()
        this.state = {
            collapsed: false
        }
    }
    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            <div className={Style.admin}>
                 <Layout  className={Style.container}>
                     {/* 左侧导航栏 */}
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                        <div className="logo" />
                        <CustomNav></CustomNav>
                    </Sider>
                    {/* 右侧内容区域 */}
                    <Layout className="site-layout">
                        {/* 右侧头部 */}
                        <Header className="site-layout-background" style={{ padding: 0 }}>
                            {/* {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                            })} */}
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
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
