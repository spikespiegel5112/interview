import service from '@/utils/request'
import {
  login,
  logout,
  getInfo
} from '@/api/login'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'

const user = {
  state: {
    userInfo: {},
    token: getToken(),
    name: 'innben',
    avatar: require("@/image/access/profile.jpg"),
    // roles: ["admin"],
    roles: [],
    permissions: ["*:*:*"],
    login: true
  },

  mutations: {
    setUserInfo: (state, data) => {
      // state.token = token
      state.userInfo = data
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    setLogin: (state, payload) => {
      state.login = payload
    }
  },

  actions: {
    // 登录
    Login({
      commit,
      dispatch
    }, userInfo) {
      return new Promise((resolve, reject) => {
        // debugger
        console.log(userInfo)
        service.post('/api/login', {
          "imageCode": userInfo.imageCode,
          "loginName": userInfo.loginName.trim(),
          "password": userInfo.password,
          "sessionUUID": userInfo.sessionUUID
        }).then(response => {
          // setToken(response.token)
          // commit('SET_TOKEN', response.token)
          const code = response.code
          switch (code) {
            case 0:
              resolve(response)
            case 10001:
              reject(response)
            default:
              resolve(response)
          }

          // dispatch('getUserInfo').then(response => {
          //   commit('user/setUserInfo', response)
          //   resolve(response)
          // }).catch(error => {
          //   reject(error)
          // })
        }).catch(error => {

          reject(error)
        })
        // login(username, password, code, uuid).then(res => {
        //   setToken(res.token)
        //   commit('SET_TOKEN', res.token)
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 获取用户信息
    getUserInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        service.get('/api/getCurrent', {}).then(response => {
          response = response.data
          const avatar = !response.avatar || response.avatar === '' ? require("@/image/access/profile.jpg") : process.env.VUE_APP_BASE_API + user.avatar;
          // if (response.roles && response.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          //   commit('SET_ROLES', response.roles)
          //   commit('SET_PERMISSIONS', response.permissions)
          // } else {
          //   commit('SET_ROLES', ['ROLE_DEFAULT'])
          // }
          // commit('SET_NAME', response.account)
          commit('SET_AVATAR', avatar)
          commit('setUserInfo', response)
          commit('setLogin', true)
          resolve(response)
        }).catch(error => {
          reject(error)
        })

        // getInfo(state.token).then(res => {
        //   const user = res.user
        //   const avatar = user.avatar == "" ? require("@/image/access/profile.jpg") : process.env.VUE_APP_BASE_API + user.avatar;
        //   if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
        //     commit('SET_ROLES', res.roles)
        //     commit('SET_PERMISSIONS', res.permissions)
        //   } else {
        //     commit('SET_ROLES', ['ROLE_DEFAULT'])
        //   }
        //   commit('SET_NAME', user.username)
        //   commit('SET_AVATAR', avatar)
        //   resolve(res)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 退出系统
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
