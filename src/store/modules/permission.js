import {
  constantRoutes,
  errorRoutes
} from '@/router/router'
import {
  getRouters
} from '@/api/menu'
import Layout from '@/layout/index'
import InnerLayout from '@/views/InnerLayout'

const permission = {
  state: {
    routes: [{
      path: '',
      component: Layout,
      children: [{
        "name": "dashboard",
        "path": "/dashboard",
        component: () => import("@/views/Dashboard.vue"),
        "meta": {
          "title": "主页",
          "icon": "dashboard",
          functionaility: []
        },
      }, {
        "name": "warehouse",
        "path": "/warehouse",
        component: InnerLayout,
        "meta": {
          "title": "仓储操作",
          "icon": "cart",
          functionaility: []
        },
        "children": [{
          "name": "inventoryCheck",
          "path": "inventorycheck",
          component: () => import("@/views/Warehouse/InventoryCheck/InventoryCheck.vue"),
          "meta": {
            "title": "管理",
            "icon": "magnifier",
            functionaility: ['query', 'batchDelete', 'export']
          }
        }]
      }]
    }],
    addRoutes: [],
    functionaility: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    },
    setFunctionaility: (state, payload) => {
      state.functionaility = payload
    }
  },
  actions: {
    // 生成路由
    GenerateRoutes({
      commit
    }) {
      return new Promise(resolve => {
        // 向后端请求路由数据
        getRouters().then(res => {
          const accessedRoutes = filterAsyncRouter(res.data)
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        })
      })
    }
  }
}


// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  return asyncRouterMap.filter(route => {
    if (route.component) {
      // Layout组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}

export const loadView = (view) => { // 路由懒加载
  return () => import(`@/views/${view}`)
}

export default permission
