import {
  DialogOptions,
  useLoadingBar,
  useDialog,
  useMessage,
  MessageOptions,
  useNotification,
  NotificationOptions
} from 'naive-ui'
import { Ref } from 'vue'

type LoadingBarVar = {
  handleStart: () => void
  handleFinish: () => void
  handleError: () => void
}

type DialogVar = {
  handleWaring: (option: DialogOptions) => void
  handleInfo: (option: DialogOptions) => void
  handleSuccess: (option: DialogOptions) => void
  handleError: (option: DialogOptions) => void
}

type MessageVar = {
  handleWaring: (content: string, option?: MessageOptions) => void
  handleInfo: (content: string, option?: MessageOptions) => void
  handleSuccess: (content: string, option?: MessageOptions) => void
  handleError: (content: string, option?: MessageOptions) => void
  handleloading: (content: string, option?: MessageOptions) => void
}

type NotificationVar = {
  handleWaring: (option: NotificationOptions) => void
  handleInfo: (option: NotificationOptions) => void
  handleSuccess: (option: NotificationOptions) => void
  handleError: (option: NotificationOptions) => void
}

// 需要把调用其方法的组件放在 n-loading-bar-provider 内部
const loadingBarUtil = (disableRef: Ref<boolean>): LoadingBarVar => {
  const loadingBar = useLoadingBar()
  const handleStart = () => {
    loadingBar.start()
    disableRef.value = false
  }
  const handleFinish = () => {
    loadingBar.finish()
    disableRef.value = true
  }
  const handleError = () => {
    disableRef.value = true
    loadingBar.error()
  }
  return {
    handleStart,
    handleFinish,
    handleError
  }
}

// 需要把调用其方法的组件放在 n-dialog-provider 内部
const DialogUtil = (): DialogVar => {
  const dialog = useDialog()
  const handleWaring = (option: DialogOptions) => {
    dialog.warning(option)
  }
  const handleInfo = (option: DialogOptions) => {
    dialog.info(option)
  }
  const handleSuccess = (option: DialogOptions) => {
    dialog.success(option)
  }
  const handleError = (option: DialogOptions) => {
    dialog.success(option)
  }
  return {
    handleWaring,
    handleInfo,
    handleSuccess,
    handleError
  }
}

// 需要把调用其方法的组件放在 n-message-provider 内部
const MessageUtil = (): MessageVar => {
  const message = useMessage()
  const handleWaring = (content: string, option?: MessageOptions) => {
    const localContent = content || '警告'
    message.warning(localContent, option)
  }
  const handleInfo = (content: string, option?: MessageOptions) => {
    const localContent = content || '提示'
    message.info(localContent, option)
  }
  const handleSuccess = (content: string, option?: MessageOptions) => {
    const localContent = content || '成功'
    message.success(localContent, option)
  }
  const handleError = (content: string, option?: MessageOptions) => {
    const localContent = content || '错误'
    message.error(localContent, option)
  }
  const handleloading = (content: string, option?: MessageOptions) => {
    const localContent = content || '加载'
    message.loading(localContent, option)
  }
  return {
    handleWaring,
    handleInfo,
    handleSuccess,
    handleError,
    handleloading
  }
}

const NotificationUtil = (): NotificationVar => {
  const notification = useNotification()
  const handleWaring = (option: NotificationOptions) => {
    notification.warning(option)
  }
  const handleInfo = (option: NotificationOptions) => {
    notification.info(option)
  }
  const handleSuccess = (option: NotificationOptions) => {
    notification.success(option)
  }
  const handleError = (option: NotificationOptions) => {
    notification.success(option)
  }
  return {
    handleWaring,
    handleInfo,
    handleSuccess,
    handleError
  }
}

export { loadingBarUtil, DialogUtil, MessageUtil, NotificationUtil }
