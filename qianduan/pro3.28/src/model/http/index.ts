import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method as AxiosMethod
} from 'axios'
import { DR } from '..'
import { DATA } from '../data/index'

// 问题：createAxiosInstance的方式没有抽离出去

export namespace HTTP {
  export interface HTTPRquest<T> {
    (data?: object, config?: AxiosRequestConfig): Promise<DATA.Result<T> | null>
  }

  export interface Method {
    <T>(instance: AxiosInstance, url: string): HTTPRquest<T>
  }

  export interface MethodFactory {
    create(method: AxiosMethod): Method
  }

  export class MethodFactoryImpl implements MethodFactory {
    create(method: AxiosMethod): Method {
      return function <T>(axiosInstance: AxiosInstance, url: string): HTTPRquest<T> {
        return function <T>(
          datas?: object,
          config?: AxiosRequestConfig
        ): Promise<DATA.Result<T> | null> {
          if (config) {
            config.data = datas
            config.url = url
            config.method = method
            return Promise.resolve(
              axiosInstance(config)
                .then((response: AxiosResponse) => DATA.Result.build(response))
                .catch((error) => {
                  if (error instanceof Error) DR.Notification(error)
                  return null
                })
            )
          } else {
            return Promise.resolve(
              axiosInstance({
                method: method,
                url: url,
                data: datas
              })
                .then((response: AxiosResponse) => DATA.Result.build(response))
                .catch((error) => {
                  if (error instanceof Error) DR.Notification(error)
                  return null
                })
            )
          }
        }
      }
    }
  }

  export interface AxiosInstanceFactory {
    create(config: AxiosRequestConfig): AxiosInstance
  }

  export class AxiosInstanceFactoryImpl implements AxiosInstanceFactory {
    create(config: AxiosRequestConfig<any>): AxiosInstance {
      const axiosInstance: AxiosInstance = axios.create(config)

      // 请求拦截器，进行配置更改
      axiosInstance.interceptors.request.use(
        (config: AxiosRequestConfig) => {
          const token: string = window.sessionStorage.getItem('token') || ''
          config.headers!.Authorization = token
          return config
        },
        (error) => {
          return Promise.reject(error)
        }
      )

      // 响应拦截器，在then,cath之前对数据进行一些处理
      axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => {
          return response
        },
        (Error) => {
          return Error.response
        }
      )

      return axiosInstance
    }
  }
}
