<template>
  <n-breadcrumb separator=">" style="height: 100%; display: flex; align-items: center">
    <n-breadcrumb-item v-for="(item, index) in optionT" :key="index" @click="push(item)">
      <n-icon size="20"> <project-icon v-if="item.type === 'project'" /> <Group v-else /> </n-icon>
      {{ item.name }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { CalendarWorkWeek16Regular as ProjectIcon, Group20Filled as Group } from '@vicons/fluent'
import { useRouter } from 'vue-router'

interface BreadcrumbOption {
  key: string
  name: string
  path: string
  type: string
}
const Router = useRouter()
const props = defineProps({
  options: {
    type: Array as PropType<BreadcrumbOption[]>,
    default: () => []
  }
})
const optionT: BreadcrumbOption[] = [
  {
    key: '19',
    name: '项目一',
    path: 'projectInfo',
    type: 'project'
  },
  {
    key: '1',
    name: '小组二',
    path: '/groupInfo',
    type: 'group'
  },
  {
    key: '11',
    name: '小组二点一',
    path: '/groupInfo',
    type: 'group'
  }
]
const push = (path: BreadcrumbOption) => {
  Router.push({
    path: path.path,
    query: {
      id: path.key
    }
  })
}
</script>

<style></style>
