<template>
  <div class="backlog">
    <CardBacklog
      title-name="紧急且重要"
      :options="userTasksD"
      @update-option="updateOption"
      @model-show="ModelTask.showClick"
      @click.stop
      class="backlog-div"
      header-style="padding: 5px; background-color: #ff3300; border-radius: 10px 10px 0 0;"
      footer-style="background-color: #ff3300; border-radius: 0 0 10px 10px;"
    ></CardBacklog>
    <CardBacklog
      title-name="紧急不重要"
      :options="userTasksM"
      @model-show="ModelTask.showClick"
      @click.stop
      class="backlog-div"
      header-style="padding: 5px; background-color: #ffb61e; border-radius: 10px 10px 0 0;"
      footer-style="background-color: #ffb61e; border-radius: 0 0 10px 10px;"
    ></CardBacklog>
    <CardBacklog
      title-name="重要不紧急"
      :options="userTasksL"
      @model-show="ModelTask.showClick"
      @click.stop
      class="backlog-div"
      header-style="padding: 5px; background-color: #44cef6; border-radius: 10px 10px 0 0;"
      footer-style="background-color: #44cef6; border-radius: 0 0 10px 10px;"
    ></CardBacklog>
    <CardBacklog
      title-name="不紧急不重要"
      :options="userTasksS"
      @model-show="ModelTask.showClick"
      @click.stop
      class="backlog-div"
      header-style="padding: 5px; background-color: #3de1ad; border-radius: 10px 10px 0 0;"
      footer-style="background-color: #3de1ad; border-radius: 0 0 10px 10px;"
    ></CardBacklog>

    <ModelTaskInfo
      v-model:show="ModelTask.showModel.value"
      :info="ModelTask.taskInfo.value"
      @updateTask="receive"
    ></ModelTaskInfo>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, provide, ref } from 'vue'
import { API } from '../../model'
import { MessageUtil } from '../../utils/notice/notice'
import CardBacklog from '../layout/backlog/CardBacklog.vue'
import ModelTaskInfo from '../layout/tasks/ModelTaskInfo.vue'
import { Entity } from '../../global'
onMounted(() => {
  getUserTasks()
  getAllUsersInfo()
})
const m = MessageUtil()
const Api = inject<API.API>('$api')!
// const store = Store()
const userTasks = ref<Entity.Task[]>([])
const userTasksS = ref<Entity.Task[]>()
const userTasksL = ref<Entity.Task[]>()
const userTasksM = ref<Entity.Task[]>()
const userTasksD = ref<Entity.Task[]>()
const getUserTasks = async () => {
  await Api.queryTaskUserByStatus(
    {},
    {
      params: {
        userId: window.sessionStorage.getItem('userId'),
        status: 0
      }
    }
  ).then((data) => {
    if (data!.code === 200) {
      userTasks.value = data!.data

      userTasksD.value = []
      userTasksL.value = []
      userTasksM.value = []
      userTasksS.value = []
      const itemD: Entity.Task[] = []
      const itemL: Entity.Task[] = []
      const itemM: Entity.Task[] = []
      const itemS: Entity.Task[] = []
      userTasks.value.forEach((v) => {
        if (parseInt(v.priority!) === 4) {
          itemD.push(v)
        } else if (parseInt(v.priority!) === 3) {
          itemL.push(v)
        } else if (parseInt(v.priority!) === 2) {
          itemM.push(v)
        } else if (parseInt(v.priority!) === 1) {
          itemS.push(v)
        }
      })
      userTasksD.value = itemD
      userTasksL.value = itemL
      userTasksM.value = itemM
      userTasksS.value = itemS
    }
  })
}
const allUsersInfo = ref<Map<number, Entity.Account>>()
provide('allUsersInfo', allUsersInfo)
const getAllUsersInfo = () => {
  Api.queryUserInfoAll({ limit: 10, pageOffset: 0 }).then((data) => {
    if (data!.code === 200) {
      let item: Entity.Account[] = []
      const map = new Map()
      item = data!.data.userInfoList

      item.forEach((v) => {
        map.set(v.userId, v)
      })
      allUsersInfo.value = map
    }
  })
}
const updateOption = () => {
  m.handleInfo('来客人啦！小伙子们，吼出来接客啦！！！')
}
const receive = (v: boolean) => {
  getUserTasks()
  ModelTask.showModel.value = v
}
interface DataOption {
  id: string
  title: string
  principal: string
  group: string | undefined
  priority: string
  priorityNumber: string
  weight: string
  status: string
  statusNumber: number
  parentId: string
  executorId: string
  executorName: string
  projectId: string
  taskDescribe: string
  taskCreateTime: string
  taskStartime: string
  taskEndTime: string
  taskCompleteTime: string | null
  taskType: string
}
const ModelTask = (() => {
  const showModel = ref(false)
  const taskInfo = ref<DataOption>()
  const showClick = (info: DataOption) => {
    showModel.value = !showModel.value
    taskInfo.value = info
    console.log('卡片信息', taskInfo.value)
  }
  return {
    showModel,
    showClick,
    taskInfo
  }
})()
</script>

<style lang="scss">
@import '@/style/common/ViewSize.scss';
@import '@/style/variable/TheView.scss';
.backlog {
  min-height: 700px;
  max-height: 100%;
  width: $Width;
  max-width: $MaxWidth;
  background-color: $TheProjectsBg;
  padding-top: 1px;
  display: inline-table;
}
.backlog-div {
  width: 670px;
  margin: 10px 20px;
  background-color: antiquewhite;
  border-radius: 10px;
}
</style>
