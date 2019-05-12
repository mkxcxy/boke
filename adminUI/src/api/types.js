import service from "../utils/request";


//获取类别列表
export function getType(name='',page=1) {
    return service.request({
        url:`/index/api/v1/index/types?name=${name}&page=${page}`,
        method:'get',
        headers:{
            'authorization':window.localStorage.getItem('token')
        }
    })
}

export function typeHandle(data,method) {
    return service.request({
        url:`/index/api/v1/index/types`,
        method:method,
        headers:{
            'authorization':window.localStorage.getItem('token')
        },
        data:data
    })
}

