import { API } from '../../model'

export default new API.Build().push('WEB', 'POST', {
  queryUserInfoGroup: '/user/queryUserInfoGroup',
  login: '/user/login',
  register: '/user/register',
  updateUserPassword: '/user/updateUserPassword'
})
