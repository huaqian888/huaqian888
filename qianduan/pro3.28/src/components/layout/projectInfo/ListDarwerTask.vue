<template>
  <div class="taskManagement">
    <n-space>

      <n-input
        class="input-c"
        v-model:value="title"
        type="text"
        placeholder="请输入任务名"
        style="width: 150px"
        :maxlength="15"
        @change="handlefilterTitle"
        clearable
      >
        <template #prefix>
          <n-icon size="20">
            <titleIcon />
          </n-icon>
        </template>
      </n-input>
      <n-select
        class="select-c"
        v-model:value="principal"
        placeholder="请选择负责人"
        :options="principalOption"
        @update:value="handlefilterPrincipal"
        clearable
      />
      <n-select
        class="select-c"
        v-model:value="status"
        placeholder="请选择状态"
        :options="statueOption"
        @update:value="handlefiterStatus"
        clearable
      />
      <n-select
        class="select-c"
        v-model:value="group"
        placeholder="请选择小组"
        :options="groupOption"
        @update:value="handlefiterGroup"
        clearable
      />
      <n-select
        class="select-c"
        v-model:value="priority"
        placeholder="请选择优先级"
        :options="priorityOption"
        @update:value="handlefiterPriority"
        clearable
      />
      <!-- <n-date-picker
        v-model:value="rangeTime"
        type="datetimerange"
        placeholder="请选择开始时间"
        clearable
      /> -->

      <n-button class="select-c" type="primary" size="medium" @click="creatTask">创建任务</n-button>
    </n-space>
    <!-- 任务管理表格 -->
    <n-data-table :columns="columns" :data="data" :rowProps="rowProps" :pagination="pagination" />
    <ModelTaskInfo
      v-model:show="ModelTask.showModel.value"
      :info="info"
      @delete="ModelTask.showClick"
      :groups="props.groups"
      :members="props.members"
    ></ModelTaskInfo>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, reactive, h, PropType, computed, inject } from 'vue'
import { MessageUtil } from '../../../utils/notice/notice'
import { Writing as titleIcon } from '@vicons/tabler'
import { NTag, SelectOption } from 'naive-ui'
import ModelTaskInfo from '../tasks/ModelTaskInfo.vue'
import { TableBaseColumn } from 'naive-ui/lib/data-table/src/interface'
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
const m = MessageUtil()
const props = defineProps({
  creatFlag: {
    type: Boolean,
    default: false
  },
  datas: {
    type: Array as PropType<Entity.Task[]>,
    default: () => []
  },
  groups: {
    type: Object as PropType<Map<number, string>>,
    default: () => new Map()
  },
  members: {
    type: Object as PropType<Map<number, string>>,
    default: () => new Map()
  }
})
const Emits = defineEmits(['update:creatFlag', 'delete'])
const creatTask = () => {
  Emits('update:creatFlag', !props.creatFlag)
}
const status = ref()
const statueOption = [
  {
    value: '0',
    label: '进行中'
  },
  {
    value: '1',
    label: '已完成'
  }
]
const handlefiterStatus = (value: string, option: SelectOption) => {
  if (option != null) {
    m.handleInfo(option.label as string)
    columns[5].filterOptionValue = option.label as string
  } else {
    columns[5].filterOptionValue = null
  }
  pagination.page = 1
}
const group = ref()
const groupOption = computed(() => {
  const item: SelectOption[] = []
  props.groups.forEach((v, k) => {
    item.push({
      label: v,
      value: k
    })
  })
  
  return item
})
const handlefiterGroup = (value: string, option: SelectOption) => {
  if (option != null) {
    m.handleInfo(option.label as string)
    columns[2].filterOptionValue = option.label as string
  } else {
    columns[2].filterOptionValue = null
  }
  pagination.page = 1
}
const priority = ref()
const priorityOption = [
  {
    value: '1',
    label: '紧急且重要'
  },
  {
    value: '2',
    label: '紧急不重要'
  },
  {
    value: '3',
    label: '不紧急重要'
  },
  {
    value: '4',
    label: '不紧急不重要'
  }
]
const handlefiterPriority = (value: string, option: SelectOption) => {
  if (option != null) {
    m.handleInfo(option.label as string)
    columns[3].filterOptionValue = option.label as string
  } else {
    columns[3].filterOptionValue = null
  }
  pagination.page = 1
}
const rangeTime = ref()
const title = ref()
const handlefilterTitle = (value: string) => {
  if (value != null) {
    m.handleInfo(value)
    columns[0].filterOptionValue = value
  } else {
    columns[0].filterOptionValue = null
  }
  pagination.page = 1
}
const principal = ref()
const principalOption = computed(() => {
  const item: SelectOption[] = []
  props.members.forEach((v, k) => {
    item.push({
      label: v,
      value: k
    })
  })
  
  return item
})
const handlefilterPrincipal = (value: string, option: SelectOption) => {
  if (option != null) {
    m.handleInfo(option.label as string)
    columns[1].filterOptionValue = option.label as string
  } else {
    columns[1].filterOptionValue = null
  }
  pagination.page = 1
}
const columns = reactive<TableBaseColumn[]>([
  {
    key: 'title',
    title: '任务名',
    align: 'center',
    filterMultiple: false,
    filterOptionValue: null,
    ellipsis: {
      tooltip: true
    },
    filter(filterOptionValue, option) {
      const item: string = option.title as string
      return item.indexOf(filterOptionValue as string) !== -1
    }
  },
  {
    key: 'principal',
    title: '负责人',
    align: 'center',
    filterMultiple: false,
    filterOptionValue: null,
    ellipsis: {
      tooltip: true
    },
    filter(filterOptionValue, option) {
      const item: string = option.principal as string
      return item.indexOf(filterOptionValue as string) !== -1
    }
  },
  {
    key: 'group',
    title: '关联小组',
    align: 'center',
    filterMultiple: false,
    filterOptionValue: null,
    ellipsis: {
      tooltip: true
    },
    filter(filterOptionValue, option) {
      return option.group === filterOptionValue
    }
  },
  {
    key: 'priority',
    title: '优先级',
    align: 'center',
    ellipsis: {
      tooltip: true
    },
    filterMultiple: false,
    filterOptionValue: null,
    render(row) {
      
      return h(
        NTag,
        {
          type: row.priority === '紧急且重要' ? 'error' : 'warning'
        },
        {
          default: () => row.priority
        }
      )
    },
    filter(filterOptionValue, option) {
      return option.priority === filterOptionValue
    }
  },
  {
    key: 'weight',
    title: '权重',
    align: 'center',
    filterMultiple: false,
    filterOptionValue: null,
    ellipsis: {
      tooltip: true
    },
    render(row) {
      return h(
        NTag,
        {
          type: 'primary'
        },
        {
          default: () => row.weight
        }
      )
    }
  },
  {
    key: 'status',
    title: '状态',
    align: 'center',
    filterMultiple: false,
    filterOptionValue: null,
    ellipsis: {
      tooltip: true
    },
    render(row) {
      return h(
        NTag,
        {
          type: row.status === '进行中' ? 'info' : 'success'
        },
        {
          default: () => row.status
        }
      )
    },
    filter(value, option) {
      return option.status === value
    }
  }
])
const data = computed(() => {
  
  const item: DataOption[] = []
  props.datas.forEach((v) => {
    item.push({
      id: v.taskId!,
      title: v.taskName!,
      principal: props.members.get(parseInt(v.executorId!))!,
      group: props.groups.get(parseInt(v.groupId!)),
      priority: priorityText(v.priority!),
      priorityNumber: v.priority!,
      weight: v.weight + '',
      status: v.status === 0 ? '进行中' : '已完成',
      statusNumber: v.status!,
      parentId: v.parentId!,
      executorId: v.executorId!,
      executorName: v.executorName!,
      projectId: v.projectId!,
      taskDescribe: v.taskDescribe!,
      taskCreateTime: v.taskCreateTime!,
      taskStartime: v.taskStartime!,
      taskEndTime: v.taskEndTime!,
      taskCompleteTime: v.taskCompletetime!,
      taskType: v.taskType! + ''
    })
  })
  
  return item
})
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
const pagination = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [5, 10, 15],
  onChange: (page: number) => {
    pagination.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
  }
})
const info = ref<DataOption>()
const rowProps = (row: DataOption, key: number) => {
  return {
    onclick: () => {
      ModelTask.showModel.value = true
      info.value = row
      
    }
  }
}

const ModelTask = (() => {
  const showModel = ref(false)
  const showClick = () => {
    showModel.value = !showModel.value
    Emits('delete')
  }
  return {
    showModel,
    showClick
  }
})()
</script>

<style lang="scss">
.taskManagement {
  width: 100%;
}
.select-c {
  width: 150px;
}
</style>
