<template>
  <bar-view-oparetion :button-options="barOparetion.buttons" @button-click="barOparetion.click">
  </bar-view-oparetion>

  <n-modal
    v-model:show="createTaskModalShow"
    preset="dialog"
    title="创建任务"
    positive-text="创建"
    negative-text="取消"
    @positive-click="createTaskButton(0)"
    :mask-closable="false"
    :style="{ width: modalWidth }"
  >
    <create-task :group-id="1" ref="createTaskRef" />
  </n-modal>

  <n-card>
    <n-tabs type="line">
      <n-tab-pane name="1" tab="小组任务">
        <task-table tools="add" @add-click="createTaskModalShow = true" />
      </n-tab-pane>
      <n-tab-pane name="2" tab="任务池">
        <task-table tools="edit,delete" />
      </n-tab-pane>
      <n-tab-pane name="3" tab="小组成员任务">
        <task-table tools="edit,delete" />
      </n-tab-pane>
      <n-tab-pane name="4" tab="小组任务">
        <task-table tools="edit,delete" />
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script setup lang="ts">
import { Refresh } from '@vicons/tabler'
import { BarSide } from '../../global'
import BarViewOparetion from '../layout/commons/BarViewOparetion.vue'
import TaskTable from '../layout/tasks/TaskTable.vue'
import CreateTask from '../layout/tasks/CreateTask.vue'
import { ref, inject, defineProps } from 'vue'
import { useMessage } from 'naive-ui'
import { API } from '../../model'
import moment from 'moment'
import { Store } from '../../stores'
import { onBeforeRouteLeave } from 'vue-router'
const store = Store()
onBeforeRouteLeave((to, from) => {
  store.showSideOperationFlag = false
})

// util
const message = useMessage()
const api: API.API = inject<API.API>('$api')!
const props = defineProps({
  groupId: {
    type: Number,
    default: 1
  }
})

// createTask
const createTaskModalShow = ref(false)
const createTaskRef = ref(null)

function createTaskButton(parentTaskId: number) {
  return createTaskRef.value
    .check()
    .then(async (value) => {
      const task = {
        taskName: value.name,
        priority: value.priority,
        weight: value.weight,
        taskStartime: new Date(value.startTime).toUTCString(),
        taskEndTime: new Date(value.endTime).toUTCString(),
        parentId: parentTaskId,
        taskDescribe: value.describe
      }

      if (value.select.type === 'pool') {
        task.taskType = 2
        task.groupId = props.groupId
      } else if (value.select.type === 'selectUser') {
        task.executorId = value.select.value.id
        task.taskType = 1
      } else {
        task.executorId = value.select.value.groupLead
        task.groupId = value.select.value.id
        task.taskType = 1
      }

      const data = await api.createTask(task)
      if (data?.code !== 200) {
        message.error(data?.message)
        return false
      }
      message.success(data?.message)
      return true
    })
    .catch((msg: string) => {
      message.error(msg)
      return false
    })
}

const barOparetion = (function () {
  const buttons: Array<BarSide.Button> = [
    {
      id: '0',
      description: '刷新',
      icon: Refresh,
      callback: () => {}
    },
    {
      id: '0',
      description: '创建任务',
      icon: Refresh,
      callback: () => {
        createTaskModalShow.value = true
      }
    }
  ]
  const click = (item: BarSide.Button) => {
    item.callback()
  }
  return {
    buttons,
    click
  }
})()
const modalWidth = ref(`${parseInt(document.body.clientWidth * 0.9)}px`)
</script>

<style></style>
