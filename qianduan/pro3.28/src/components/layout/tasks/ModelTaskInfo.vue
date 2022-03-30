<template>
  <n-modal
    preset="card"
    :bordered="false"
    style="width: 50%; min-width: 800px"
    header-style="padding-bottom: 0px;"
    :mask-closable="false"
    :auto-focus="false"
    :trap-focus="false"
    closable
    v-bind="$attrs"
  >
    <template #header>
      <n-thing>
        <template #avatar>
          <n-icon size="20" style="margin-top: 5px">
            <taskIcon />
          </n-icon>
        </template>
        <template #header>
          <input
            class="font-c input-c"
            type="text"
            v-model="title"
            @keyup.enter="handleTitle"
            :style="'width: ' + curWidth"
          />
        </template>
        <template #description>
          <div style="font-family: Arial, Helvetica, sans-serif; font-size: 0.8em">
            <span>李晓磊</span>
            <span>创建于：</span>
            <n-time :time="moment(props.info.taskCreateTime).toDate()" type="datetime" />
          </div>
        </template>
      </n-thing>
    </template>
    <div class="left-c style-c">
      <n-list>
        <n-list-item>
          <n-thing content-indented>
            <template #avatar>
              <n-icon size="20">
                <descriptionIcon />
              </n-icon>
            </template>
            <template #header>
              <span class="font-s">描述</span>
            </template>
            <template #description>
              <div style="padding: 10px; background-color: rgb(217, 221, 209); border-radius: 10px">
                <ShowMarkDown :context="description"></ShowMarkDown>
              </div>
            </template>
            <template #default>
              <n-list style>
                <n-list-item class="list-c">
                  <n-tag :color="{ color: 'transparent' }" :bordered="false">
                    负责人：{{ executorName }}
                    <ButtonAvatar :text="principalComputed" avatar></ButtonAvatar>
                    <template #avatar>
                      <n-icon>
                        <principalIcon />
                      </n-icon>
                    </template>
                  </n-tag>
                </n-list-item>
                <n-list-item class="list-c" v-if="planTime !== undefined">
                  <n-tag :color="{ color: 'transparent' }" :bordered="false">
                    计划时间：
                    <n-time :time="planTime[0]" format="yyyy-MM-dd hh:mm:ss" />
                    <span>至</span>
                    <n-time :time="planTime[1]" format="yyyy-MM-dd hh:mm:ss" />
                    <template #avatar>
                      <n-icon>
                        <planTimeIcon />
                      </n-icon>
                    </template>
                  </n-tag>
                </n-list-item>
                <n-list-item class="list-c">
                  <n-tag :color="{ color: 'transparent' }" :bordered="false">
                    优先级：
                    <n-gradient-text type="error">{{ priorityComputed }}</n-gradient-text>
                    <template #avatar>
                      <n-icon>
                        <priorityIcon />
                      </n-icon>
                    </template>
                  </n-tag>
                </n-list-item>
                <n-list-item class="list-c">
                  <n-tag :color="{ color: 'transparent' }" :bordered="false">
                    权重：
                    <n-tag type="info" size="small">{{ weight }}</n-tag>
                    <template #avatar>
                      <n-icon>
                        <weightIcon />
                      </n-icon>
                    </template>
                  </n-tag>
                </n-list-item>
                <n-list-item class="list-c">
                  <n-tag :color="{ color: 'transparent' }" :bordered="false">
                    状态：
                    <n-tag type="warning" size="small">{{ statusComputed }}</n-tag>
                    <template #avatar>
                      <n-icon>
                        <statuesIcon />
                      </n-icon>
                    </template>
                  </n-tag>
                </n-list-item>
                <n-list-item class="list-c">
                  <n-tag :color="{ color: 'transparent' }" :bordered="false">
                    完成时间：
                    <n-time
                      v-show="finishiTimeComputed"
                      type="datetime"
                      :time="finishiTime"
                      format="yyyy-MM-dd hh:mm:ss"
                    />
                    <template #avatar>
                      <n-icon>
                        <finishiTimeIcon />
                      </n-icon>
                    </template>
                  </n-tag>
                </n-list-item>
              </n-list>
            </template>
          </n-thing>
        </n-list-item>
        <n-list-item>
          <n-thing content-indented>
            <template #avatar>
              <n-icon size="20">
                <submitLogIcon />
              </n-icon>
            </template>
            <template #header>
              <span class="font-s">提交记录</span>
            </template>
            <template #default>
              <n-timeline>
                <n-timeline-item type="info" title="进度报告" time="2022-1-22 17:00:20">
                  <span>第一次报告</span>
                  <n-tag type="success" size="small">已评审</n-tag>
                </n-timeline-item>
                <n-timeline-item type="info" title="评审报告" time="2022-1-22 17:00:20">
                  <span>第二次报告</span>
                  <n-tag type="warning" size="small">未评审</n-tag>
                </n-timeline-item>
              </n-timeline>
            </template>
          </n-thing>
        </n-list-item>
      </n-list>
    </div>
    <div class="right-c style-c">
      <n-button-group style="width: calc(100%)">
        <n-space align="center" style="width: 100%" vertical>
          <n-icon size="100" :color="'#7fecad'" :depth="5">
            <finishiIcon v-if="finishiComputed" />
            <unfinishiIcon v-else />
          </n-icon>
          <PopoverForm
            title="状态"
            :icon-compont="statuesIcon"
            v-model:value="status"
            :options="statusOptions"
            @update:value="handleStatusValue"
          ></PopoverForm>
          <PopoverForm
            title="负责人"
            :icon-compont="principalIcon"
            v-model:value="principal"
            :options="principalOptions"
            @update:value="handlePrincipalValue"
          ></PopoverForm>
          <PopoverForm
            title="优先级"
            :icon-compont="priorityIcon"
            v-model:value="priority"
            :options="priorityOptions"
            @update:value="handlePriorityValue"
          ></PopoverForm>
          <PopoverForm
            title="权重"
            type="input"
            :icon-compont="weightIcon"
            v-model:value="weight"
            @update:value="handleWeightValue"
          ></PopoverForm>
          <PopoverForm
            :width="300"
            title="计划时间"
            :icon-compont="planTimeIcon"
            type="datetimerange"
            v-model:values="planTime"
            @update:values="handlePlanTimeValue"
          ></PopoverForm>
          <PopoverForm
            title="描述"
            type="button"
            @button-click="ModelMarkDown.showClick"
            :icon-compont="descriptionIcon"
            disabled
          ></PopoverForm>
          <PopoverForm
            title="提交"
            type="button"
            @button-click="ModelReport.showClick('id')"
            :icon-compont="submitIcon"
            disabled
          ></PopoverForm>
          <PopoverForm
            title="删除"
            :icon-compont="deletedIcon"
            type="button"
            @button-click="handleDelete(props.info.id)"
            :button-type="'error'"
            :ghost="true"
            disabled
          ></PopoverForm>
          <n-button type="primary" size="medium" @click="updateTask" style="width: 130px"
            >确定修改</n-button
          >
        </n-space>
      </n-button-group>
    </div>
  </n-modal>

  <!-- 描述模块 -->
  <n-modal
    v-model:show="ModelMarkDown.showModel.value"
    preset="dialog"
    positive-text="确定"
    @positive-click="ModelMarkDown.submitCallback"
    negative-text="取消"
    :show-icon="false"
    style="width: 50%"
  >
    <MarkDown ref="markDownDescription" :min-height="200"></MarkDown>
  </n-modal>

  <!-- 提交模块 -->
  <EditReport
    v-model:show="ModelReport.showModel.value"
    width="80%"
    :task-id="props.info?.id.toString()"
    :end-time="props.info?.taskEndTime"
  ></EditReport>
</template>

<script setup lang="ts">
import {
  Notebook as taskIcon,
  BoxModel as descriptionIcon,
  Eye as priorityIcon,
  ChartPie as weightIcon,
  BrandInstagram as statuesIcon
} from '@vicons/tabler'
import {
  Person12Regular as principalIcon,
  Timer24Regular as planTimeIcon,
  Timer16Filled as finishiTimeIcon,
  Delete16Filled as deletedIcon,
  AlertOn24Regular as submitIcon,
  ShapeSubtract20Regular as submitLogIcon,
  TargetArrow16Filled as finishiIcon,
  TargetEdit16Filled as unfinishiIcon
} from '@vicons/fluent'
import ShowMarkDown from '../commons/ShowMarkDown.vue'
import ButtonAvatar from '../commons/ButtonAvatar.vue'
import EditReport from '../tasks/EditReport.vue'
import {
  computed,
  onMounted,
  onUnmounted,
  PropType,
  ref,
  watch,
  defineProps,
  defineEmits,
  inject
} from 'vue'
import PopoverForm from '../commons/PopoverForm.vue'
import { MessageUtil } from '../../../utils/notice/notice'
import { SelectOption } from 'naive-ui'
import MarkDown from '../commons/MarkDown.vue'
import moment from 'moment'
import { API } from '../../../model'
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
const reload: any = inject('reload')!
const handleStatusValue = (v: string) => {
  status.value = v
}
const handlePrincipalValue = (v: string) => {
  principal.value = v
}
const handlePriorityValue = (v: string) => {
  priority.value = v
}
const handleWeightValue = (v: string) => {
  weight.value = v
}
const handlePlanTimeValue = (v: string) => {
  planTime.value = v
}
const updateTask = async () => {
  Api.updateTask({
    taskId: props.info.id,
    taskName: props.info.title,
    taskDescribe: props.info.taskDescribe,
    priority: parseInt(priority.value),
    taskEndTime: '2022-01-09',
    weight: parseInt(weight.value)
  }).then((data) => {
    if (data?.code === 200) {
      m.handleSuccess('修改成功')
      Emits('updateTask', false)
      // reload()
    }
  })
}

onMounted(() => {
  window.addEventListener('resize', OnResize)

  OnResize()
  watch(
    () => props.info,
    (v) => {
      title.value = v.title
      status.value = v.statusNumber + ''
      description.value = v.taskDescribe
      priority.value = v.priorityNumber + ''
      planTime.value = [
        parseInt(moment(v.taskStartime).format('x')),
        parseInt(moment(v.taskEndTime).format('x'))
      ]
      weight.value = v.weight
      principal.value = v.executorId + ''
      executorName.value = v.executorName
    }
  )
})
// 监听页面缩放设置输入框的宽度
const OnResize = () => {
  curWidth.value = document.documentElement.clientWidth * 0.5 * 0.72 + 'px'
  // m.handleInfo(curWidth.value)
}
onUnmounted(() => {
  window.removeEventListener('resize', OnResize)
})
const props = defineProps({
  info: {
    type: Object as PropType<DataOption>,
    default: () => { }
  },
  members: {
    type: Object as PropType<Map<number, string>>,
    default: () => new Map()
  },
  groups: {
    type: Object as PropType<Map<number, string>>,
    default: () => new Map()
  }
})
const Emits = defineEmits(['delete', 'updateTask'])
const m = MessageUtil()
const curWidth = ref()
const Api = inject<API.API>('$api')!
// 报告弹窗
const ModelReport = (() => {
  const showModel = ref(false)
  const showClick = (id: string | number) => {
    showModel.value = !showModel.value
  }
  return {
    showModel,
    showClick
  }
})()
// 描述
const markDownDescription = ref()
const ModelMarkDown = (() => {
  const showModel = ref(false)
  const showClick = () => {
    showModel.value = !showModel.value
  }
  const submitCallback = () => {
    description.value = markDownDescription.value.getContext()
  }
  return {
    showModel,
    showClick,
    submitCallback
  }
})()
const status = ref<string>()
const statusOptions: SelectOption[] = [
  {
    value: '0',
    label: '进行中'
  },
  {
    value: '1',
    label: '已完成'
  }
]
const statusComputed = computed(() => {
  return status.value === '0' ? '进行中' : '已完成'
})
const finishiComputed = computed(() => {
  return status.value !== '0'
})
watch(status, (val) => {

  if (val === '1') {
    finishiTime.value = new Date()
  } else {
    finishiTime.value = undefined
  }

})
const title = ref<string>('')
const handleTitle = () => {
  m.handleInfo('修改成功: ' + title.value)
}
const description = ref<string>()
const principal = ref<string>()
const principalOptions = computed(() => {
  const item: SelectOption[] = []
  props.members.forEach((v, k) => {
    item.push({
      label: v,
      value: k + ''
    })
  })
  return item
})
const principalComputed = computed(() => {
  return props.members.get(parseInt(principal.value! + ''))
})
const priority = ref<string>('1')
const priorityOptions: SelectOption[] = [
  {
    value: '4',
    label: '紧急且重要'
  },
  {
    value: '3',
    label: '紧急不重要'
  },
  {
    value: '2',
    label: '重要不紧急'
  },
  {
    value: '1',
    label: '不紧急不重要'
  }
]
const priorityComputed = computed(() => {
  let item: string = ''
  switch (parseInt(priority.value)) {
    case 4:
      item = '紧急且重要'
      break
    case 3:
      item = '紧急不重要'
      break
    case 2:
      item = '重要不紧急'
      break
    case 1:
      item = '不紧急不重要'
      break
  }
  return item
})
const executorName = ref()
const weight = ref()
const planTime = ref()
const finishiTime = ref<Date>()
const finishiTimeComputed = computed(() => {
  return finishiTime.value !== undefined
})
const handleDelete = (id: string | number) => {
  Api.deleteTask({}, { params: { taskId: id } }).then((data) => {
    if (data!.code === 200) {
      m.handleInfo('任务删除成功')
      Emits('delete')
    } else {
      m.handleError('任务已开始或无权操作，任务删除失败')
    }
  })
}
</script>

<style scoped lang="scss">
.left-c {
  width: 80%;
}
.right-c {
  width: 20%;
  vertical-align: top;
}
.style-c {
  display: inline-block;
}
.list-c {
  padding: 0px;
  padding-top: 5px;
  font-size: 0.8em;
}
.font-s {
  font-weight: bold;
}
.input-c {
  border: 0;
  padding: 5px 0;
  font-weight: bolder;
  // width: v-bind(curWidth);
}
.input-c:focus {
  outline: none;
  border-radius: 3px;
  box-shadow: 0 0 0 1px #a9d39f;
}
.button-c {
  width: 130px;
  padding-left: 10px;
  justify-content: start;
}
</style>
