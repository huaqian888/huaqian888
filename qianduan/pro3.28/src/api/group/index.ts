import { API } from '../../model'

export default new API.Build().push('WEB', 'POST', {
  queryGroupByGroup: '/group/queryGroupByGroup',
  addGroupUser: '/group/addGroupUser',
  updateProject: '/group/updateProject',
  deleteGroup: '/group/deleteGroup',
  queryGroupsByUserId: '/group/queryGroupsByUserId'
})
