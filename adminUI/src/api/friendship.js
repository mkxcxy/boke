import service from "../utils/request";


//获取类别列表
export function getFriendship() {
    return service.request({
        url:`/index/api/v1/index/friendship`,
        method:'get',
    })
}

export function friendshipHandle(data,method) {
    return service.request({
        url:`/index/api/v1/index/friendship`,
        method:method,
        headers:{
            'authorization':window.localStorage.getItem('token')
        },
        data:data
    })
}
