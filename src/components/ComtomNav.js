import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Menu } from 'antd';
import { Fragment } from 'react';
import menuList from './menulist'
/* import { 
  HomeOutlined,
  SettingFilled,
  UserOutlined,
  RadarChartOutlined
 } from '@ant-design/icons' */
const { SubMenu } = Menu;


class CustomNav extends Component {

  handleClick = (e) => {
    this.props.history.push(e.item.props.path)
  }
  renderIcon(icon){
    /* switch (icon) {
      case 'home':
        return <HomeOutlined/>
      case 'set':
        return <SettingFilled/>
      case 'user':
        return <UserOutlined/>
      default:
        return <RadarChartOutlined />
    } */
  }
  
  renderItem(data){
    return data.map((item,index)=>{
      if(item.children){
        return(
          <SubMenu key={item.key} title={(()=>{
            return(
              <span>
                {this.renderIcon(item.icon)}
                {item.title}
              </span>
            )
          })()}>
            {/* 如果里面还有2级 将渲染的方法在调用一遍 */}
            {this.renderItem(item.children)}
          </SubMenu>
        )
      }else{
        return(
        <Menu.Item key={item.key} path={item.path}>
          {this.renderIcon(item.icon)}
          {item.title}
        </Menu.Item>
        )
      }
    })
  }
  render() {
    return (
      <Fragment>
        <Menu onClick={this.handleClick} mode="vertical" theme='dark'> {/* style={{ width: 256 }} */}
          {this.renderItem(menuList)}
        </Menu>
      </Fragment>
    )
  }
}

export default withRouter(CustomNav)