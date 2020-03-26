import React, { Component } from 'react'
import GoodsApi from '../../api/goodsApi'
import { Card, message } from 'antd'
export default class GoodsAdd extends Component {
  constructor () {
    super()
    this.state = {
      "name":"默认名字",
      "desc":'超好吃,是真的超好吃不是假的超好吃',
      "path":null,
      "link":"http://www.baidu.com",
      "stock":0,
      "putaway":0,
      "price":0,
      "unit":"件",
      "kind":'',
      "types":[] 
    }
  }

  async componentDidMount () {
    const { err, list } = await GoodsApi.kindList()
    this.setState({ types: list })
  }
  submit = async () => {
    // if (!this.state.path) { return message.info('请先上传图片') }
    const result = await GoodsApi.goodsAdd(this.state)

    console.log('result:', result)
  }
  // 图片上传
  upload = async () => {
    // 获取图片的内容
    let file = this.refs.img.files[0]
    if (!file) { return message.error('请先选择一张图片') }
    // 图片的验证
    let { size, type } = file
    const types = ['jpg',"jpeg",'gif','png']
    if (size > 1000000) { return message.warning('图片大小超过1M') }
    if (types.indexOf(type.split('/')[1])  === -1 ) { return message.warning('只允许jpg.jpeg,gif,png四种类型') }
    
    // 将图片转为base64
    const reader = new FileReader()

    reader.onload = () => {
      // console.log(reader.result)
      this.setState({path: reader.result})
    }

    reader.readAsDataURL(file)
  }
  render() {
    let {name,desc,path,link,stock,putaway,price,unit,types,kind} = this.state
    return (
      <div>
        <Card title='商品添加'>
            名称: <input type='text' value={name} onChange={(e)=>{
              this.setState({name:e.target.value})
            }}/><br/>
            描述: <input type='text' value={desc} onChange={(e)=>{
              this.setState({desc:e.target.value})
            }}/><br/>
            链接: <input type='text' value={link} onChange={(e)=>{
              this.setState({link:e.target.value})
            }}/><br/>
            库存: <input type='number' value={stock} onChange={(e)=>{
              this.setState({stock:e.target.value})
            }}/><br/>
            发布状态: 
            <select value={putaway} onChange={(e)=>{
              this.setState({putaway:Number(e.target.value)})
            }}>
              <option value={-1}>下架</option>
              <option value={0}>未上架</option>
              <option value={1}>上架</option>
            </select>
            
            <br/>
            价格: <input type='number' value={price} onChange={(e)=>{
              this.setState({price:e.target.value})
            }}/><br/>
            单位: <input type='text' value={unit} onChange={(e)=>{
              this.setState({unit:e.target.value})
            }}/><br/>
            {/* 渲染类别 */}
            类别:
            <select value={kind} onChange={(e)=>{
                console.log('e.target.value', e.target.value)
                this.setState({kind:e.target.value})
            }}>
              {types.map((item,index)=>{
                return( <option value={item._id} key={item._id}>{item.kindName}</option>)
              })}
            </select>
            {/* 缩略图 */}
            缩略图:
            <input type="file" ref='img'/> <button onClick={this.upload}>上传图片</button>
            {/* {config.serverIp} */}
            <img width='120' height='80' src={path} alt=""/>
            <button onClick={this.submit}>添加</button>
         </Card>
      </div>
    )
  }
}
