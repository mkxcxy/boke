import service from "../utils/request";


//获取类别列表
export function getNavbar(name,page) {
    return service.request({
        url:`/index/api/v1/index/navbar`,
        method:'get',
    })
}

export function navbarHandle(data,method) {
    return service.request({
        url:`/index/api/v1/index/navbar`,
        method:method,
        headers:{
            'authorization':window.localStorage.getItem('token')
        },
        data:data
    })
}
