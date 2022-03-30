<template>
  <el-table :data="data">
    <template v-for="(item, index) in staticHeader" :key="index">
      <el-table-column :label="item.title" :prop="item.key"> </el-table-column>
    </template>

    <el-table-column label="负责人">
      <template #default="scope">
        {{ getExecutorName(scope.row) }}
      </template>
    </el-table-column>

    <el-table-column label="优先级">
      <template #default="scope">
        <n-rate readonly :default-value="scope.row.priority"></n-rate>
      </template>
    </el-table-column>

    <el-table-column label="权重">
      <template #default="scope">
        <n-gradient-text type="info">{{ scope.row.weight }}</n-gradient-text>
      </template>
    </el-table-column>

    <el-table-column label="状态">
      <template #default="scope">
        <span
          :style="item.style"
          class="status-tag"
          v-for="(item, index) in status(scope.row)"
          :key="index"
          >{{ item.value }}</span
        >
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template #default="scope">
        <n-tooltip
          placement="bottom"
          trigger="hover"
          v-for="(item, index) in showTools"
          :key="index"
        >
          <template #trigger>
            <el-button
              :type="item.type"
              :icon="item.icon"
              circle
              @click="$emit(`${item.name}Click`, scope.row)"
            ></el-button>
          </template>
          <span> {{ item.message }} </span>
        </n-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts"></script>

<script lang="ts">
import { Entity } from '../../../global'
import { defineComponent } from 'vue'

import moment from 'moment'
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
interface TaskLabel extends Entity.Task {
  executorUserName: string
}
export default defineComponent({
  props: {
    // data: {
    //   type: Array as PropType<Array<Prop.TaskLabel>>,
    //   default: []
    // },
    tools: {
      type: String,
      default: 'add,edit,delete'
    }
  },
  data() {
    return {
      staticHeader: [
        {
          title: '任务名',
          key: 'taskName'
        },
        {
          title: '开始时间',
          key: 'taskStartime'
        },
        {
          title: '结束时间',
          key: 'taskEndTime'
        },
        {
          title: '完成时间',
          key: 'taskEndTime'
        }
      ],
      buttons: [
        { name: 'add', type: 'default', icon: Plus, message: '添加子任务' },
        { name: 'edit', type: 'primary', icon: Edit, message: '修改' },
        { name: 'delete', type: 'danger', icon: Delete, message: '删除' }
      ],
      data: [
        {
          taskId: '',
          parentId: '',
          taskName: 'taskName',
          taskDescribe: 'string',
          executorId: 'string',
          groupId: 'string',
          executorUserName: 'name',
          projectId: 'string',
          weight: 1,
          priority: 1,
          status: 2,
          taskCreateTime: 'Thu Jan 06 17:29:10 CST 2022',
          taskStartTime: 'Thu Jan 31 17:29:10 CST 2022',
          taskEndTime: 'Thu Jan 31 17:29:10 CST 2022',
          taskType: 'string'
        }
      ]
    }
  },
  computed: {
    showTools() {
      const toolNames = this.tools.split(',')
      const tools = []
      this.buttons.forEach((value) => {
        if (toolNames.includes(value.name)) tools.push(value)
      })
      return tools
    }
  },
  methods: {
    status(task: TaskLabel): Array<object> {
      const result: Array<object> = []
      if (moment(task.taskStartTime).isAfter(new Date())) {
        result.push({
          value: '未开始',
          style: 'color: #CCCCCC'
        })
      } else {
        if (task.taskType === 2) {
          result.push({
            value: '主动领取',
            style: 'color: #0099CC'
          })
        }
      }

      // 未完成
      if (
        task.status === 0 &&
        moment(task.taskStartTime).isBefore(new Date()) &&
        moment(task.taskEndTime).isAfter(new Date())
      ) {
        result.push({
          value: '进行中',
          style: 'color: #66CC66'
        })
      }

      if (task.status === 2) {
        result.push({
          value: '提前终止',
          style: 'color: red'
        })
      }

      if (task.status === 1) {
        result.push({
          value: '超时完成',
          style: 'color: #FFFF00'
        })
      }

      return result
    },
    getExecutorName(task: TaskLabel): string {
      return task.executorUserName
    }
  }
})
</script>

<style scoped>
.status-tag {
  padding: 3px;
}
</style>
