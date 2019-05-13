import axios from 'axios'

const service = axios.create({
  baseURL: '/api', // api的base_url
  timeout: 5000 // 请求超时时间
})

service.defaults.headers.common['authorization'] = window.localStorage.getItem('token');

// request拦截器
// service.interceptors.request.use(config => {
//     //   if (store.getters.token) {
//     //     config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
//     //   };
//     if (store.getters.token) {
//         config.headers.Authorization = `Bearer ${getToken()}`;
//     }
//     return config
// }, error => {
//     // Do something with request error
//     console.log(error) // for debug
//     Promise.reject(error)
// })
//
// // respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.code !== 200) {
      // Message({
      //   message: res.message,
      //   type: 'error',
      //   duration: 5 * 1000
      // })
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
