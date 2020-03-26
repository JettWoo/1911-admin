import axios from '../utils/axios'
import getToken from '../utils/getToken'
class AdminApi {
    login (payload) {
        // console.log('-----------')
        // const url = '/hjj/admin/login'
        const url = '/jett/admin/login'
        return axios.post(url, payload)
    }

    /* 获取所有管理员的数据 */
    administratorList () {
        // const url ='/hjj/admin'
        const url ='/jett/admin/list'
        return axios.get(url)
    }

    /* 添加管理员 */
    add (payload) {
        // const url = '/hjj/admin'
        const url = '/jett/admin/regist'
        return axios.post(url, payload)
    }

    /* 删除管理员数据 */
    del (_id) {
        // const url = '/hjj/admin'
        const url = '/jett/admin/delete'
        const token = getToken()
        console.log('token:', token)
        return axios.delete(url, { data: {token, del_id: _id} })
    }
}

export default new AdminApi()