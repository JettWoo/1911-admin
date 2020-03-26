import React, { Component } from 'react'
import { Table, Modal, Button, Card, notification, Popconfirm, message } from 'antd';
import AdminApi from '../../api/adminApi'

class Adminitstrator extends Component {
    constructor () {
      super()
      this.state = {
          adminList: [], // 
          visible: false,
          columns: [
            {
                title: 'id',   //显示
                dataIndex: '_id',//数据索引字段
                key: '_id',  //key值
            },
            {
                title: '账号',
                dataIndex: 'userName',
                key: 'userName'
            },
            {
              title: '操作',
              key: 'action',
              render: (record) => (
                <Popconfirm
                  placement="top"
                  title='是否确定删除该记录'
                  onConfirm={ () => {
                    this.delRecord(record._id)
                  }}
                  onCancel={ () => {
                    message.error('取消删除');
                  }}
                  okText="确认"
                  cancelText="取消"
                >
                  <Button type='danger' size='small'>删除</Button>
                </Popconfirm>
              ),
            },
        ]
      }
    }
    /* 显示添加管理员弹窗 */
    showModal = () => {
        this.setState({
          visible: true,
        });
    }
    // 添加管理员回调
    handleOk = async () => {
      const userName = this.refs.us.value
      const passWord = this.refs.ps.value
      let result = await AdminApi.add({ userName, passWord})
      // 根据请求回调状态做不同的处理
      if (result.err !== 0) {
        // 通知提醒框
        return notification.error({description:'管理员添加失败，请详细检查网络',message:'错误',duration:1.5})
      } else {
        notification.success({description:'管理员添ok，模态框即将关闭',message:'成功',duration:1.5})
        this.setState({visible: false})
      }
    }
    // 关闭添加管理员弹窗
    handleCancel = () => {
      this.setState({
        visible: false,
      });
    }
    // 刷新页面数据
    refreshList = async () => {
      const result = await AdminApi.administratorList() 
        // console.log('返回的管理员列表数据：', result)
        if (result.err === 0) {
            this.setState({ adminList: result.list })
        }
    }
    // 删除一条管理员记录
    delRecord = async (_id) => {
      let result = await AdminApi.del(_id)
      if (result.err !== 0) { return false}
      this.refreshList()
    }
    // 页面挂载后做一些请求操作
    componentDidMount () {
      this.refreshList()
    }
    render() {
      const { visible, columns} = this.state;
      return (
        <div>
          <Card title='管理员列表'>
            <Button type='primary' icon="plus" onClick={this.showModal}>添加</Button>
            <Table columns={columns} dataSource={this.state.adminList} rowKey='_id' />
          </Card>
          <Modal
              title="添加管理员"
              visible={visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              >
              userName:<input type="text" ref='us'/><br/>
              passWord:<input type="password" ref='ps'/><br/>
          </Modal>
        </div>
      )
    }
}

export default  Adminitstrator
