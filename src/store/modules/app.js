import Cookies from 'js-cookie'
import request from '../../utils/request'

const state = {
  backRoute: '',
  sidebar: {
    opened: true,
    withoutAnimation: false
  },
  device: 'desktop',
  size: Cookies.get('size') || 'medium',
  currentEditingResourceCode: '',
  dictionary: []
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  },
  updateBackRoute: (state, payload) => {
    state.backRoute = payload
  },
  updateEditingResourceCode: (state, payload) => {
    state.currentEditingResourceCode = payload
  },
  updateDictionary: (state, payload) => {
    state.dictionary.push({
      type: payload.type,
      data: payload.data
    })
  }
}

const actions = {
  toggleSideBar({
    commit
  }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({
    commit
  }, {
    withoutAnimation
  }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({
    commit
  }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize({
    commit
  }, size) {
    commit('SET_SIZE', size)
  },
  async getDictionaryThirdParty({
    commit, state
  }, dictionaryType) {
    // 2 物料分类
    const getDictionaryPromise = dictionaryType => {
      return new Promise((resolve, reject) => {
        request.get('/api/thirdParty/findDict', {
          params: {
            category: dictionaryType
          }
        }).then(response => {
          console.log('/api/thirdParty/findDict', response)
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    }
    let result = state.dictionary.find(item => item.type === dictionaryType)
    if (!result) {
      try {
        result = await getDictionaryPromise(dictionaryType)
        commit('updateDictionary', {
          type: dictionaryType,
          data: result
        })
      } catch (error) {
        result = []
      }
    }
    return result
  },
  async getDictionary({
    commit, state
  }, dictionaryType) {
    // 2 物料分类
    const getDictionaryPromise = dictionaryType => {
      return new Promise((resolve, reject) => {
        request.get('/api/dictItem/select/' + dictionaryType, {
          params: {}
        }).then(response => {
          console.log('/api/dictItem/select/{code}', response)
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    }
    let result = state.dictionary.find(item => item.type === dictionaryType)
    if (!result) {
      try {
        result = await getDictionaryPromise(dictionaryType)
        commit('updateDictionary', {
          type: dictionaryType,
          data: result
        })
      } catch (error) {
        result = []
      }
    }
    return result
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
