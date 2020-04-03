import router from './router/router'
import Cookies from 'js-cookie'

import {
  errorRoutes
} from './router/router'
import store from '@/store/store'
import {
  Message,
  MessageBox
} from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {
  getToken
} from '@/utils/auth'

NProgress.configure({
  showSpinner: false
})

const whiteList = ['/login', '/auth-redirect', '/bind', '/register']
const defaultRoute = ['dashboard', 'roles', 'rolesManagement', 'memberManagement', 'authorityManagement', 'authoritySetting',
  'meterial', 'meterialList', 'meterialRecivedList',
  'spareList',
  'inventoryCheck',
  'warehouseOperation',
  'outboundOperations',
  'inventoryOperation',
  'scrapOperation',
  'outboundRecord',
  'analysisOfAountInStock',
  'deadGoodsReport',
  'locationUtilization',
  'materialTurnover'

]
const mainRoutes = store.state.permission.routes
let result = errorRoutes


const parseRouteData = (userInfo, mainRoutes) => {
  let resourceData = JSON.parse(userInfo.resourceCode) || []
  let routeData = mainRoutes
  let result = []

  const transformData = resourceData => {
    const result = []
    Object.keys(resourceData).forEach(item => {
      result.push(Object.assign({
        name: item,
      }, resourceData[item]))
    })
    return result
  }
  const checkAcitve = (child, parentIndex) => {
    if (child.children && child.children.length > 0) {
      const data = JSON.parse(JSON.stringify(child))
      data.children = []
      child.children.forEach((item, index) => {
        data.children.push(checkAcitve(item, index))
      })
      const hiddenFlag = data.children.filter(item => item.hidden).length === data.children.length
      return Object.assign(child, {
        hidden: hiddenFlag,
        children: data.children
      })
    } else {
      let childResult
      if (resourceData.length === 0) {
        childResult = Object.assign(child, {
          hidden: userInfo.account === 'admin' ? child.hidden || false : true
        })
        return childResult
      }
      if (!resourceData[child.name] || !resourceData[child.name].active) {
        childResult = Object.assign(child, {
          hidden: true
        })
      } else if (child.hidden === true) {
        childResult = child
      } else {
        childResult = Object.assign(child, {
          hidden: false
        })
      }
      return childResult
    }
  }
  routeData.forEach((item, index) => {
    result.push(checkAcitve(item, index))
  })
  return result
}


router.beforeEach(async (to, from, next) => {
  NProgress.start()
  next()

})

router.afterEach((to, from) => {
  console.log('finsh', to)
  NProgress.done()
})

router.onError(error => {
  // debugger

  console.log('error', error)
})
