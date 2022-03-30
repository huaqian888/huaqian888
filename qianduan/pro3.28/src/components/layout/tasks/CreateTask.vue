<template>
  <el-form :model="fromData" label-width="120px" label-position="right">
    <el-form-item label="任务名">
      <el-input v-model.trim="fromData.taskName" placeholder="请输入项目名" clearable />
    </el-form-item>
    <el-form-item label="优先级">
      <n-rate v-model:value="fromData.priority" :count="4" :default-value="1"></n-rate>
    </el-form-item>
    <el-form-item label="权重">
      <el-input-number v-model="fromData.weight" :min="1" :max="taskMaxWeight"></el-input-number>
    </el-form-item>
    <el-form-item label="放入任务池">
      <n-switch
        :rail-style="railStyle"
        v-model:value="fromData.pool"
        :checked-value="true"
        :unchecked-value="false"
      >
        <template #checked>是</template>
        <template #unchecked>否</template>
      </n-switch>
    </el-form-item>

    <el-form-item label="项目时间范围">
      <n-date-picker
        v-model:value="fromData.date"
        type="datetimerange"
        :shortcuts="rangeShortcuts"
        clearable
      />
    </el-form-item>

    <el-form-item label="任务分配" v-if="!fromData.pool">
      <el-cascader v-model="fromData.selectValue" :options="selectOptions" clearable />
    </el-form-item>

    <mark-down ref="md" />
  </el-form>
</template>

<script setup lang="ts">
import MarkDown from '../commons/MarkDown.vue'
import { defineProps, inject, reactive, ref, defineExpose } from 'vue'
import { API } from '../../../model'
import { Entity } from '../../../global'
interface selectOption {
  taskName: string
  priority: number
  weight: number
  date: Array<string> | number | null
  pool: Boolean
  selectType: string
  selectValue: Array<object>
}
// Props
const props = defineProps({
  groupId: {
    type: Number,
    default: 1
  }
})

// fromData
const fromData = reactive<selectOption>({
  taskName: '',
  priority: 1,
  weight: 1,
  date: null,
  pool: false,
  selectType: 'selectUser',
  selectValue: []
})

const selectOptions = reactive([
  {
    label: '用户',
    value: 'user',
    children: new Array(0)
  },
  {
    label: '组',
    value: 'group',
    children: new Array(0)
  }
])

async function getAllSelectOptions() {
  // user
  const api: API.API = inject<API.API>('$api')!
  let data = await api.queryUserInfoGroup({ groupId: props.groupId, limit: 10, pageOffset: 0 })

  if (data?.code === 200) {
    data.data.userInfoList.forEach((value: Entity.Account) => {
      selectOptions[0].children.push({
        label: value.userName,
        value: {
          id: null,
          groupLeadId: value.userId,
          name: value.userName
        }
      })
    })
  }
  data = await api.queryGroupByGroup({}, { params: { groupId: props.groupId } })
  if (data?.code === 200) {
    data.data.forEach((value: Entity.Group) => {
      selectOptions[1].children.push({
        label: value.groupName as string,
        value: {
          id: value.groupId,
          groupLeadId: value.groupLead,
          name: value.groupName
        }
      })
    })
  }
}

getAllSelectOptions()

const md = ref()
const dataSelect = ref()

function check(): Promise<any> {
  const data = fromData

  if (data.taskName === '') return Promise.reject(new Error('项目名不能为空'))

  if (!data.pool && !data.date) return Promise.reject(new Error('时间不符合要求'))

  if (!data.pool && !data.selectValue) return Promise.reject(new Error('时间不符合要求'))

  const result = {
    name: data.taskName,
    priority: data.priority,
    weight: data.weight,
    startTime: data.date[0],
    endTime: data.date[1],
    select: {
      type: data.pool ? 'pool' : data.selectType,
      value: data.selectValue
        ? {
            id: JSON.parse(JSON.stringify(data.selectValue[1]))?.id,
            groupLead: JSON.parse(JSON.stringify(data.selectValue[1]))?.groupLeadId,
            name: JSON.parse(JSON.stringify(data.selectValue[1]))?.name
          }
        : null
    },
    describe: md.value.getContext()
  }
  return Promise.resolve(result)
}

defineExpose({
  check
})

// setting
const taskMaxWeight = Number(import.meta.env.VITE_APP_TASK_MAX_WEIGHT)

const rangeShortcuts = {
  '6小时': () => {
    const curr = new Date().getTime()
    return [curr, curr + 1000 * 60 * 60 * 6]
  },
  '1天': () => {
    const curr = new Date().getTime()
    return [curr, curr + 1000 * 60 * 60 * 24]
  },
  '3天': () => {
    const curr = new Date().getTime()
    return [curr, curr + 1000 * 60 * 60 * 24 * 3]
  },
  '7天': () => {
    const curr = new Date().getTime()
    return [curr, curr + 1000 * 60 * 60 * 24 * 7]
  }
}

// style
const railStyle = ({ focused, checked }) => {
  const style = {}
  if (!checked) {
    style.background = '#d03050'
    if (focused) {
      style.boxShadow = '0 0 0 2px #d0305040'
    }
  } else {
    style.background = '#2080f0'
    if (focused) {
      style.boxShadow = '0 0 0 2px #2080f040'
    }
  }
  return style
}
</script>

<style scoped></style>
