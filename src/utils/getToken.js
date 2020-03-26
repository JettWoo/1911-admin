function getToken() {
  try {
    if(localStorage.getItem('userInfo')) {
      return JSON.parse(localStorage.getItem('userInfo')).token
    }
  } catch (e) {
    console.log('用户token丢失')
  }
}

export default getToken