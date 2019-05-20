import service from "../utils/request";


//获取类别列表
export function getComments(page=1,id='') {
    return service.request({
        url:`/index/api/v1/index/comments?id=${id}&page=${page}`,
        method:'get',
        headers:{
            'authorization':window.localStorage.getItem('token')
        }
    })
}

export function commmentsHandle(data,method) {
    return service.request({
        url:`/index/api/v1/index/comments`,
        method:method,
        headers:{
            'authorization':window.localStorage.getItem('token')
        },
        data:data
    })
}
