<template>
  <n-card title="title" class="card-info" size="medium" content-style="min-height: 300px">
    <template #header>
      <div class="header">小组名:{{ title }}</div>
      <!-- <n-icon size="20" style="margin-left: 20px; vertical-align: middle">
        <Autosum24Filled />
      </n-icon>-->
    </template>
    <template #header-extra>
      <n-popover trigger="hover">
        <template #trigger>
          <n-button size="medium" @click="addGroupUser" :bordered="false" text>
            <template #icon>
              <n-icon size="20">
                <AddCircle32Filled />
              </n-icon>
            </template>
          </n-button>
        </template>
        <span>添加小组成员</span>
      </n-popover>
    </template>
    <template #default>
      <span style="font-size: 1em; vertical-align: middle; margin-right: 15px">
        组员总数:
        <n-number-animation :from="0" :to="100" :duration="1000" />
      </span>
      <span>小组长: {{ props.data?.groupLeadName }}</span>
      <!-- <n-scrollbar style="max-height: 280px">
        <n-descriptions
          label-placement="top"
          :key="index"
          size="small"
          :column="4"
          bordered
          v-for="(item, index) of info"
        >
          <n-descriptions-item>
            <n-icon size="20">
              <Rename16Filled />
            </n-icon>
            <span class="span-text">{{ item.groupName }}</span>
          </n-descriptions-item>
          <n-descriptions-item>
            <n-icon size="20">
              <PersonSettings20Filled />
            </n-icon>
            <span class="span-text">{{ item.groupLeadName }}</span>
          </n-descriptions-item>
          <n-descriptions-item>
            <n-icon size="20">
              <PeopleTeam16Filled />
            </n-icon>
            <span class="span-text">{{ item.groupMembers?.length }}</span>
          </n-descriptions-item>
          <n-descriptions-item v-if="item">
            <n-button type="info" size="small" @click="updateClick(index)" text>修改</n-button>
          </n-descriptions-item>
        </n-descriptions>
      </n-scrollbar> -->
    </template>
    <template #footer></template>
    <template #action></template>
  </n-card>
</template>

<script setup lang="ts">
import { defineProps, PropType, defineEmits, onMounted, watch, ref } from 'vue'
import {
  Autosum24Filled,
  AddCircle32Filled,
  Rename16Filled,
  PersonSettings20Filled,
  PeopleTeam16Filled
} from '@vicons/fluent'
import { Entity } from '../../../global'
interface ProjectGroup extends Entity.Group {
  groupLeadName?: string
  groupMembers?: Array<Entity.Account>
}
const props = defineProps({
  title: String,
  data: {
    type: Object
  },
  size: {
    type: String,
    default: '300px'
  }
})
onMounted(() => {
  watch(
    () => {
      return props.data
    },
    (newV) => {
      info.value = newV!
      console.log('传过来的小组列表info', info.value)
    }
  )
})
const Emits = defineEmits(['addGroupUser', 'updateClick'])
const info = ref<ProjectGroup>()
const addGroupUser = () => {
  Emits('addGroupUser')
}
const updateClick = (index: number) => {
  Emits('updateClick', index)
}
</script>

<style scoped lang="scss">
@import "@/style/variable/TheView.scss";
.card-info {
  display: inline-block;
  vertical-align: top;
  width: v-bind(size);
  margin-right: 10px;
}
.header {
  display: inline;
  height: 30px;
  background-color: $CardProjectInfoTitleBg;
}
.span-text {
  vertical-align: top;
  padding-left: 5px;
}
</style>
