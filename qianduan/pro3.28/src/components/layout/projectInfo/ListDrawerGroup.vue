<template>
  <n-spin size="large" v-if="loading" />
  <div v-else>
    <n-button type="primary" size="medium" @click="creatGroup">新建小组</n-button>
    <n-data-table
      :columns="column"
      :data="setData"
      :pagination="pagination"
      :row-props="rowProps"
    ></n-data-table>
  </div>
</template>

<script setup lang="ts">
import { DataTableColumn, NAvatar, NButton } from 'naive-ui'
import { defineProps, defineEmits, h, onMounted, PropType, ref, VNodeChild, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Entity } from '../../../global'
import { MessageUtil } from '../../../utils/notice/notice'
interface dataOption {
  key: string
  img: VNodeChild
  name: string
  leader: string
}
interface ProjectGroup extends Entity.Group {
  groupLeadName?: string
  groupMembers?: Array<Entity.Account>
}
const m = MessageUtil()
const Router = useRouter()
const props = defineProps({
  colums: {
    type: Array as PropType<DataTableColumn[]>,
    default: () => []
  },
  dataList: {
    type: Array as PropType<ProjectGroup[]>,
    default: () => []
  },
  pagination: {
    type: Object,
    default: () => {}
  },
  creatFlag: {
    type: Boolean,
    default: false
  }
})
const Emits = defineEmits(['creatFlag', 'updateFlag', 'deleteGroup'])
const setData = ref()
watch(
  () => props.dataList,
  (v) => {
    const item: dataOption[] = []
    v.forEach((vv) => {
      item.push({
        key: vv.groupId!,
        img: h(NAvatar, {
          size: 'medium',
          src: 'src/assets/logo.png',
          round: true
        }),
        name: vv.groupName!,
        leader: vv.groupLeadName!
      })
    })
    setData.value = item
  },
  {
    immediate: true,
    deep: true
  }
)
const column: DataTableColumn[] = [
  {
    title: '头像',
    key: 'img',
    align: 'center'
  },
  {
    title: '小组名',
    key: 'name',
    align: 'center'
  },
  {
    title: '组长',
    key: 'leader',
    align: 'center'
  },
  {
    title: '操作',
    key: 'operation',
    align: 'center',
    render(rowData) {
      return h(
        NButton,
        {
          size: 'medium',
          type: 'info',
          onClick: (event) => {
            Emits('deleteGroup', rowData.key)
            event.stopPropagation()
          }
        },
        {
          default: () => '删除'
        }
      )
    }
  }
]
const pagination = {
  pageSizes: [10, 20],
  showSizePicker: true,
  showQuickJumper: true
}
const rowProps = (row: dataOption) => {
  return {
    onClick: () => {
      m.handleInfo('不要拦着我，我要跳转到小组页面' + row.name)
      Router.push({
        path: 'groupInfo',
        query: {
          id: row.key
        }
      })
    }
  }
}
const loading = ref(false)
const creatGroup = () => {
  m.handleInfo('我点了，你呢')
  Emits('creatFlag')
}
const updateGroup = () => {
  m.handleInfo('修改，你呢')
  Emits('updateFlag')
}
onMounted(() => {})
</script>

<style></style>
