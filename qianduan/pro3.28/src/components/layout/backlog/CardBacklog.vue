<template>
  <n-card size="medium" style="display: inline-table" content-style="padding: 0">

    <template #header>
      <n-icon>
        <task />
      </n-icon>
      <span>{{ titleName }}</span>
    </template>
    <template #header-extra>
      <n-select
        v-model:value="statusSelect"
        size="small"
        :options="statusOptions"
        style="width: 85px"
        class="select-c"
      />
    </template>
    
    <div
      class="cardback-main"
      infinite-scroll-distance="1"
      style="overflow: auto"
    >
      <CardTask
        class="card-task"
        v-for="(item, index) in props.options"
        :key="index"
        :data-info="item"
        :test="index"
        @click="handleClick(item)"
      ></CardTask>
    </div>
    <template #footer></template>
  </n-card>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, PropType, computed, inject, Ref } from 'vue'
import { ClipboardTaskListRtl20Filled as task } from '@vicons/fluent'
import CardTask from './CardTask.vue'
import { Entity } from '../../../global'
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
const props = defineProps({
  titleName: {
    type: String,
    default: '标题'
  },
  options: {
    type: Array as PropType<Entity.Task[]>,
    default: () => []
  }
})
const Emits = defineEmits(['updateOption', 'modelShow'])
Emits('updateOption')
const handleClick = (info: Entity.Task) => {
  Emits('modelShow', infoComputed(info))
}
const statusSelect = ref('0')
const statusOptions = [
  {
    label: '进行中',
    value: '0'
  },
  {
    label: '已完成',
    value: '1'
  },
  {
    label: '全部',
    value: '2'
  }
]
4
const usersInfo = inject<Ref<Map<number, Entity.Account>>>('allUsersInfo')
const infoComputed = (info: Entity.Task): DataOption => {
  return {
    id: info.taskId!,
    title: info.taskName!,
    principal: usersInfo?.value.get(parseInt(info.executorId!))?.userId!,
    group: info.groupId,
    priority: priorityText(info.priority!),
    priorityNumber: info.priority!,
    weight: info.weight + '',
    status: info.status === 0 ? '进行中' : '已完成',
    statusNumber: info.status!,
    parentId: info.parentId!,
    executorId: info.executorId!,
    executorName: info.executorName!,
    projectId: info.projectId!,
    taskDescribe: info.taskDescribe!,
    taskCreateTime: info.taskCreateTime!,
    taskStartime: info.taskStartime!,
    taskEndTime: info.taskEndTime!,
    taskCompleteTime: info.taskCompletetime!,
    taskType: info.taskType! + ''
  }
}
const priorityText = (key: string): string => {
  let item: string = '紧急不重要'
  switch (parseInt(key)) {
    case 1:
      item = '不紧急不重要'
      break
    case 2:
      item = '重要不紧急'
      break
    case 3:
      item = '紧急不重要'
      break
    case 4:
      item = '紧急且重要'
      break
  }
  return item
}
</script>

<style lang="scss">
.cardback-main {
  height: 400px;
  background-color: rgb(238, 226, 213);
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: azure;
  }
  &::-webkit-scrollbar-thumb {
    background-color: cadetblue;
  }
  .card-task {
    width: 300px;
    display: inline-block;
    border-radius: 10px;
    margin: 5px 10px;
    background-color: rgb(218, 207, 193);
  }
}
</style>
