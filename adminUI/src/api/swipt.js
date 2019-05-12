import service from "../utils/request";


//获取类别列表
export function getSwiptList(name,page) {
    return service.request({
        url:`/index/api/v1/index/swipt`,
        method:'get',
    })
}

export function swiptHandle(data,method) {
    return service.request({
        url:`/index/api/v1/index/swipt`,
        method:method,
        headers:{
            'authorization':window.localStorage.getItem('token')
        },
        data:data
    })
}
//
// export function typeHandle(data,method) {
//     return service.request({
//         url:`/permissions/api/v1/permissions/types`,
//         method:method,
//         headers:{
//             'authorization':window.localStorage.getItem('token')
//         },
//         data:data
//     })
// }

