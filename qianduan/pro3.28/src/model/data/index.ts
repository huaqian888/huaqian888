import { AxiosResponse } from 'axios'

export namespace DATA {
  export class Result<T> {
    code: Number
    message?: string
    data?: T
    response: AxiosResponse

    constructor(response: AxiosResponse, code: Number, message?: string, data?: T) {
      this.response = response
      this.code = code
      this.message = message
      this.data = data
    }

    static build<T = any>(response: AxiosResponse): Result<T> {
      return new Result<T>(response, response.data.code, response.data.message, response.data.data)
    }
  }
}
