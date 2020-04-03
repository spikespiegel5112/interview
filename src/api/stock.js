import request from '@/utils/request'

// 获取库位区域
export const findStockArea = () => {
  return request({
    url: '/api/thirdParty/findStockArea',
    method: 'get'
  })
}

// 新增盘点
export const inventoryAdd = (data) => {
  return request({
    url: '/api/stock/inventory/add',
    method: 'post',
    data
  })
}

// 删除盘点
export const inventoryDelete = (data) => {
  return request({
    url: '/api/stock/inventory/delete',
    method: 'post',
    data
  })
}




// 盘点详情查询
export const getInventoryDetail = (params) => {
  return request.get('/api/stock/inventory/detail/find', {params});
}

// 盘点详情更新
export const updateInventoryDetail = (data) => {
  return request.post('/api/stock/inventory/detail/update', data);
}

// 删除盘点详情
export const inventoryDetailDelete = (data) => {
  return request({
    url: '/api/stock/inventoryDetail/delete',
    method: 'post',
    data
  })
}

// 审核盘点详情
export const inventoryDetailAudit = (data) => {
  return request({
    url: '/api/stock/inventory/audit',
    method: 'post',
    data
  })
}




