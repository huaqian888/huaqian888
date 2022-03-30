import { API } from '../../model/api'

export default new API.Build().push('WEB', 'POST', {
  createProject: '/group/createProject',
  addGroupUsesr: '/group/addGroupUsesr',
  createGroup: '/group/createGroup',
  deleteGroupUser: '/group/deleteGroupUser',
  queryGroupByGroup: '/group/queryGroupByGroup',
  queryGroupById: '/group/queryGroupById',
  queryProjectById: '/group/queryProjectById',
  queryProjectTaskNumber: '/group/queryProjectTaskNumber',
  queryUserInfoAll: '/user/queryUserInfoAll',
  queryUserInfoGroup: '/user/queryUserInfoGroup',
  queryUserInfoById: '/user/queryUserInfoById',
  updateGroupName: '/group/updateGroupName',
  queryProjectAll: '/group/queryProjectAll'
})
