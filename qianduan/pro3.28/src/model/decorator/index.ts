// import { ElNotification } from 'element-plus'

export namespace DR {
  // export function Notification(error: Error) {
  //   ElNotification({
  //     title: 'ERROR',
  //     message: (error as Error).message,
  //     type: 'error',
  //     duration: 0 // ms
  //   })
  // }

  export function ThrowError(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    target[propertyKey] = (...args: any) => {
      try {
        return target(...args)
      } catch (error) {
        if (error instanceof Error) {
          Notification(error)
        }
      }
    }
    return target
  }
}
