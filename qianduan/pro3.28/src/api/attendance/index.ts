import { API } from '../../model/api'

export default new API.Build().push('WEB', 'POST', {
  signIn: '/attendance/signIn',
  signOut: '/attendance/signOut',
  yearSignOutTable: '/attendance/yearSignOutTable'
})
