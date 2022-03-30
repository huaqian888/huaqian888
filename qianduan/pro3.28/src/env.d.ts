/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 环境变量类型声明
interface ImportMetaEnv {
  // 文件服务器BASE_URL
  readonly VITE_APP_SERVER_FILE: string
  // WEB服务器BASE_URL
  readonly VITE_APP_SERVER_WEB: string
  // 请求超时时间
  readonly VITE_APP_API_TIMEOUT: number
  // 任务最大权重
  readonly VITE_APP_TASK_MAX_WEIGHT: number
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}