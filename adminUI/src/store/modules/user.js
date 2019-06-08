import {login, logout, getInfo} from '@/api/login'
import {getToken, setToken, removeToken} from '@/utils/auth'

const user = {
    state: {
        token: getToken(),
        name: '',
        avatar: '',
        roles: [],
        userData: {}
    },

    mutations: {
        SET_USERDATA: (state, token) => {
            state.userData = token;
        },
        // SET_TOKEN: (state, token) => {
        //     state.token = token
        // },
        // SET_NAME: (state, name) => {
        //     state.name = name
        // },
        // SET_AVATAR: (state, avatar) => {
        //     state.avatar = avatar
        // },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },

    actions: {
        // 登录
        Login({commit}, userInfo) {

        },

        // 获取用户信息
        GetInfo({commit, state}) {
            return new Promise((resolve, reject) => {
                getInfo().then(response => {
                    let data = response;
                    if (data.code != '200') { // 验证当前jwt是否合法
                        reject(data.message);
                    }
                    // console.log(data.data.userName)
                    commit('SET_USERDATA', data.data)
                    commit('SET_ROLES', data.permissions)
                    // console.log(data)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        LogOut({commit, state}) {
            state.userData = {};
            state.roles = [];
            removeToken();
        },

        // 前端 登出
        FedLogOut({commit}) {
            return new Promise(resolve => {
                // commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        }
    }
}

export default user
