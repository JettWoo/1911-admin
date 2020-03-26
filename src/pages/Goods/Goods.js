import React, { Component } from 'react'
import { Card, Table, message, Pagination, Popconfirm, Button, Spin, Tag} from 'antd'
import style from './goods.module.less'
import GoodsApi from '../../api/goodsApi'
export default class Goods extends Component {
  constructor () {
    super()
    this.state = {
      page: 1, // 当前页码数
      pageSize: 2, // 每页显示的条数
      goodsList: [],
      count: 0,
      spining: false,
      columns:[
        {title: '_id',dataIndex: '_id',key: '_id',width:120}, /* ,fixed:'left' */
        {title: '名称',dataIndex: 'name',key: 'name',width:120}, 
        {title: '库存',dataIndex: 'stock',key: 'stock',width:80},
        {title: '价格',dataIndex: 'price',key: 'price',width:120},
        {title: '缩略图',dataIndex: 'path',key: 'path',render(path){
          return(<img width ='150' height='80' src={path} alt='菜品图片'/>)/* src={rootPath+path} */
        },width:150},
        {title: '描述',dataIndex: 'desc',key: 'desc',width:200},
        {title: '单位',dataIndex: 'unit',key: 'unit',width:80},
        {title: '类别',dataIndex: 'kind',key: 'kind',width:80, render: (kind) => {
          return kind.kindName
        }},
        {title: '状态',dataIndex: 'putaway',key: 'putaway',render(putaway){
          let obj={'-1':{color:'red',msg:'已下架'},'0':{color:'yellow',msg:'未上架'},'1':{color:'green',msg:'已上架'}}
          return(<Tag color={obj[putaway].color}>{obj[putaway].msg}</Tag>)  
        },width:120},
        {title: '操作',key: 'action',width:120,render:(recode)=>{ /* ,fixed:'right' */
          return(
            <div>
              <Popconfirm title='你确定要删除该商品嘛?'
                onConfirm={()=>{
                  this.delGoods(recode._id)
                }}
                onCancel = { () => {
                  return message.warning('取消删除')
                }}
              >
                <Button type='danger' size='small'>删除</Button>
              </Popconfirm>
            </div>
          )
      }
      }
      ]}
  }

  componentDidMount () {
    this.refreshList()
  }
  async refreshList () {
    const { page, pageSize } = this.state
    this.setState({ spining: true })
    console.log('page:', page)
    let { err, msg, list, count} = await GoodsApi.foodList(page, pageSize)
    if (err !== 0) { return message.error(msg) }
    this.setState({goodsList: list, count, spining: false})
  }
  async delGoods (_id) {
    let {err,msg} = await GoodsApi.delGoods(_id)
    if(err !== 0){ return message.error(msg)}
    message.success('删除成功')
    this.refreshList()
  }
  onChange(pageNumber) {
    this.setState({page: pageNumber}, () => {
      this.refreshList()
    })
  }
  render() {
    let {goodsList,columns,count,pageSize,page, spining} = this.state
    // console.log('count:', count)
    return (
      <div className={style.box}>
        <Card title='商品管理' className={style.card}>
          <Button type='primary' onClick = { () => {
            this.props.history.push('/admin/goods/add')
          }}
           >添加食品</Button>
          <Spin spinning={spining}>
            {/* 列表渲染 */}
            <Table
              columns={columns}
              dataSource={goodsList}
              pagination={false}
              rowKey='_id'
              scroll={ {y:300,x:840} }
            >  
            </Table>
          </Spin>
          {/* 自定义分页器 */}
          <Pagination
            showQuickJumper
            defaultCurrent={1}
            total={count}
            pageSize={pageSize}
            current={page}
            onChange={this.onChange.bind(this)}
            style={{'marginTop': '20px', 'textAlign': 'center'}}
          />
        </Card>
      </div>
    )
  }
}
