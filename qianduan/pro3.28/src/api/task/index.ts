import { API } from '../../model'

export default new API.Build().push('WEB', 'POST', {
  createTask: '/task/createTask',
  queryTaskByGroupId: '/task/queryTaskByGroupId',
  deleteTask: '/task/deleteTask',
  submitTaskReport: '/task/submitTaskReport',
  queryTaskUserByStatus: '/task/queryTaskUserByStatus',
  updateTask: '/task/updateTask'
})
