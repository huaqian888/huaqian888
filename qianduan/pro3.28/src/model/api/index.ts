import { AxiosInstance, Method as AxiosMethod } from 'axios'
import { HTTP } from '../http'

export namespace API {
  export class ApiInfo {
    // 服务器名
    service: string
    method: AxiosMethod
    // 调用API名
    name: string
    // 接口url
    url: string

    constructor(service: string, method: AxiosMethod, name: string, url: string) {
      this.service = service
      this.method = method
      this.name = name
      this.url = url
    }
  }

  export interface ApiOptions {
    [propName: string]: string
  }

  export class Build {
    listApiInfo: Array<ApiInfo> = []

    entries(): Array<ApiInfo> {
      return this.listApiInfo
    }

    push(service: string, method: AxiosMethod, options: ApiOptions): Build {
      Object.entries(options).forEach(([key, value]) => {
        this.listApiInfo.push({
          service,
          method,
          name: key,
          url: value
        })
      })
      return this
    }
  }

  export interface ServiceOption {
    [propName: string]: string
  }

  export class API {
    [propName: string]: HTTP.HTTPRquest<any>

    static build(api: API, build: Build, axiosMap: Map<string, AxiosInstance>): void {
      const methodFactory = new HTTP.MethodFactoryImpl()

      build.entries().forEach((info: ApiInfo) => {
        api[info.name] = methodFactory.create(info.method)(
          axiosMap.get(info.service) as AxiosInstance,
          info.url
        )
      })
    }
  }
}
