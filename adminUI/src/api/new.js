import service from "../utils/request";


//获取类别列表
export function getNew(name='',page=1,id='') {
    return service.request({
        url:`/index/api/v1/index/new?id=${id}&title=${name}&page=${page}`,
        method:'get',
    })
}

export function newHandle(data,method) {
    return service.request({
        url:`/index/api/v1/index/new`,
        method:method,
        headers:{
            'authorization':window.localStorage.getItem('token')
        },
        data:data
    })
}
