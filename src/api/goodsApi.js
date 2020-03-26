import axios from '../utils/axios'

import getToken from '../utils/getToken'
class GoodsApi {
  foodList (page = 1, pageSize = 2) {
    // const url = '/hjj/goods'
    const url = '/jett/goods'
    const token = getToken()
    // console.log('token:', token)
    console.log('------------page:', page)
    return axios.get(url, { params: { page, pageSize, token, } })
  }

  /* 根据id删除一样食品 */
  delGoods (_id) {
    // const url = `/hjj/goods/${_id}`
    const token = getToken()
    const url = `/jett/goods/${_id}`
    return axios.delete(url, { data: {token}})
  }

  /* 添加商品 */
  goodsAdd (payload) {
    const token = getToken()
    const url = `/jett/goods`
    return axios.post(url, { payload, token })
  }

  /* 获取商品类别 */
  kindList () {
    const token = getToken()
    const url = '/jett/kind'
    return axios.get(url, { params: {token }})
  }
}

export default new GoodsApi()