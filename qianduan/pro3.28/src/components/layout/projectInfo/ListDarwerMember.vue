<template>
  <n-spin size="large" v-if="loading" />
  <div v-else>
    <n-button type="primary" size="medium" @click="addMember">添加成员</n-button>
    <n-data-table :columns="column" :data="setData" :pagination="pagination"></n-data-table>
  </div>
</template>

<script setup lang="ts">
import { DataTableColumn, NAvatar, NButton } from 'naive-ui'
import { defineProps, defineEmits, h, PropType, ref, computed, VNode, watch } from 'vue'
import { Entity } from '../../../global'
import { MessageUtil } from '../../../utils/notice/notice'
interface DataOption {
  key: string
  img: VNode
  name: string
  charactar: string
}
const m = MessageUtil()
const props = defineProps({
  colums: {
    type: Array as PropType<DataTableColumn[]>,
    default: () => []
  },
  dataList: {
    type: Array as PropType<Entity.Account[]>,
    default: () => []
  },
  pagination: {
    type: Object,
    default: () => {}
  },
  addFlag: {
    type: Boolean,
    default: false
  },
  groupId: {
    type: String,
    default: '-1'
  }
})
const Emits = defineEmits(['update:addFlag'])
const setData = ref()
watch(
  props.dataList,
  () => {
    const item: DataOption[] = []
    props.dataList.forEach((v, i) => {
      item.push({
        key: v.userId!,
        img: h(NAvatar, {
          size: 'medium',
          src: 'src/assets/logo.png',
          round: true
        }),
        name: v.userName!,
        charactar: v.userId?.toString() === props.groupId ? '负责人' : '成员'
      })
    })
    setData.value = item
  },
  {
    immediate: true
  }
)
const column: DataTableColumn[] = [
  {
    title: '头像',
    key: 'img',
    align: 'center'
  },
  {
    title: '用户名',
    key: 'name',
    align: 'center'
  },
  {
    title: '角色',
    key: 'charactar',
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
          onClick: () => {
            m.handleInfo('删除' + rowData.key)
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

const loading = ref(false)
const addMember = () => {
  Emits('update:addFlag', true)
}
</script>

<style></style>
