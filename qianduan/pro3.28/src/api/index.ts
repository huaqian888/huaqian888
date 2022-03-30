import { AxiosInstance } from 'axios'
import { API } from '../model/api'
import { HTTP } from '../model/http'

// 构建API调用
import file from './file'
import user from './user'
import group from './group'
import task from './task'
import attendance from './attendance'

const api = new API.API()

const axiosMap: Map<string, AxiosInstance> = new Map()

// 配置服务器环境前缀
const API_SERVER_PREFIX: string = 'VITE_APP_SERVER_'

// 构建axios实例
Object.keys(import.meta.env).forEach((key: string) => {
  if (key.startsWith(API_SERVER_PREFIX)) {
    const name = key.substring(API_SERVER_PREFIX.length)
    axiosMap.set(
      name,
      new HTTP.AxiosInstanceFactoryImpl().create({
        baseURL: import.meta.env[key] as string,
        timeout: import.meta.env.VITE_APP_API_TIMEOUT,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
    )
  }
})

API.API.build(api, file, axiosMap)
API.API.build(api, user, axiosMap)
API.API.build(api, group, axiosMap)
API.API.build(api, task, axiosMap)
API.API.build(api, attendance, axiosMap)

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $api: API.API
  }
}

// 遗留问题：api调用无法做到提示
export default api
