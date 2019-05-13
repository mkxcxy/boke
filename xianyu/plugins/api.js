import service from "./request";


//获取权限列表
export function getSwiptList() {
  return service.request({
    url:"/index/api/v1/index/getSwiptList",
    method:'get',
    headers:{
      'authorization':window.localStorage.getItem('token')
    }
  })
}

//获取用户列表
export function getUserInfo(name,page) {
  return service.request({
    url:`/index/api/v1/index/getUserInfo`,
    method:'get',
    headers:{
      'authorization':window.localStorage.getItem('token')
    }
  })
}

//用户操作
export function userHandle(data,method) {
  return service.request({
    url:"/permissions/api/v1/permissions/users",
    method:method,
    headers:{
      'authorization':window.localStorage.getItem('token')
    },
    data:data
  })
}

// export function addUser(data) {
//     return service.request({
//         url:"/permissions/api/v1/permissions/users",
//         method:'post',
//         headers:{
//             'authorization':window.localStorage.getItem('token')
//         },
//         data:data
//     })
// }
//
// //用户删除
// export function deleteUser(data) {
//     return service.request({
//         url:"/permissions/api/v1/permissions/users",
//         method:'delete',
//         headers:{
//             'authorization':window.localStorage.getItem('token')
//         },
//         data:data
//     })
// }
//
// //用户修改
//
// export function deleteUser(data) {
//     return service.request({
//         url:"/permissions/api/v1/permissions/users",
//         method:'delete',
//         headers:{
//             'authorization':window.localStorage.getItem('token')
//         },
//         data:data
//     })
// }
