<template>
  <n-card :title="data.taskName">
    <template #header-extra>
      <span
        :style="item.style"
        class="status-tag"
        v-for="(item, index) in data.status"
        :key="index"
        >{{ item.value }}</span
      >
    </template>

    <n-descriptions label-placement="left" :column="1">
      <n-descriptions-item label="负责人">李晓磊</n-descriptions-item>
      <n-descriptions-item label="开始时间">{{
        moment(new Date()).format('LLLL')
      }}</n-descriptions-item>
      <n-descriptions-item label="结束时间">{{
        moment(new Date()).format('LLLL')
      }}</n-descriptions-item>
      <n-descriptions-item label="完成时间">{{
        moment(new Date()).format('LLLL')
      }}</n-descriptions-item>
      <n-descriptions-item label="优先级">
        <n-rate readonly :default-value="data.priority"></n-rate>
      </n-descriptions-item>
      <n-descriptions-item label="权重">
        <n-gradient-text type="info">{{ data.weight }}</n-gradient-text>
      </n-descriptions-item>
    </n-descriptions>

    <template #action>
      <n-tooltip placement="bottom" trigger="hover" v-for="(item, index) in showTools" :key="index">
        <template #trigger>
          <el-button
            :type="item.type"
            :icon="item.icon"
            circle
            @click="emitEvent(`${item.name}-click`, data)"
          ></el-button>
        </template>
        <span> {{ item.message }} </span>
      </n-tooltip>
    </template>
  </n-card>
</template>

<script setup lang="ts">
import { computed, ref, defineProps, defineEmits } from 'vue'
import moment from 'moment'
import { Delete, Edit, Plus } from '@element-plus/icons-vue'

const props = defineProps({
  tools: {
    type: String,
    default: 'add,edit,delete'
  }
})

const data = ref({
  taskName: '项目名',
  status: [
    {
      value: '未开始',
      style: 'color: #CCCCCC'
    },
    {
      value: '主动领取',
      style: 'color: #0099CC'
    },
    {
      value: '进行中',
      style: 'color: #66CC66'
    },
    {
      value: '提前终止',
      style: 'color: red'
    },
    {
      value: '超时完成',
      style: 'color: #FFFF00'
    }
  ],
  priority: 1,
  weight: 1
})

const buttons = [
  { name: 'add', type: 'default', icon: Plus, message: '添加子任务' },
  { name: 'edit', type: 'primary', icon: Edit, message: '修改' },
  { name: 'delete', type: 'danger', icon: Delete, message: '删除' }
]

const showTools = computed(() => {
  const toolNames = props.tools.split(',')
  const tools = []
  buttons.forEach((value) => {
    if (toolNames.includes(value.name)) tools.push(value)
  })
  return tools
})

const emits = defineEmits(['add-click', 'edit-click', 'delete-click'])

function emitEvent(name: string, data) {
  console.log(name, data)
  emits(name, data)
}
</script>

<style scoped>
.status-tag {
  padding: 3px;
}
</style>
