//全局封装axios请求

import service from "../utils/request";



//获取用户信息
export function getInfo(token) {
    return service({
        url:"/index/api/v1/index/",
        method:'post',
        headers:{
            'authorization':window.localStorage.getItem('token')
        }
    })
}

export function login(data) {
    return service({
        url:"/login/api/v1/login",
        method:'post',
        headers:{
            'authorization':window.localStorage.getItem('token')
        },
        data:data
    })
}

