<template>
  <n-card title="title" class="card-info" size="medium" content-style="min-height: 300px">
    <template #header>
      <div class="header">{{ title }}</div>
    </template>
    <template #header-extra>
      <n-tag type="success" size="medium" round>{{
        props.data?.projectStatus === 0 ? '执行中' : '已完成'
      }}</n-tag>
    </template>
    <template #default>
      <n-descriptions label-placement="left" :column="2">
        <n-descriptions-item label="项目名称" span="2">
          <n-tag type="info" size="small" :bordered="false"> {{ props.data?.projectName }} </n-tag>
        </n-descriptions-item>
        <n-descriptions-item label="负责人" span="2">
          <ButtonAvatar
            :bordered="false"
            :text="props.data?.projectLeadName"
            :avatar="true"
            :color="{ color: 'rgb(231,245,238)' }"
          ></ButtonAvatar>
        </n-descriptions-item>
        <n-descriptions-item label="项目创建时间" span="2">
          <n-time
            class="time"
            v-if="props.data?.projectCreateTime"
            :time="moment(props.data?.projectCreateTime, moment.ISO_8601).toDate()"
            format="yyyy年MM月dd日 hh:mm:ss"
          />
          <span v-else>null</span>
        </n-descriptions-item>
        <n-descriptions-item label="项目完成日期" span="2">
          <n-time
            v-if="props.data?.projectEndTime"
            class="time"
            :time="moment(props.data?.projectEndTime, moment.ISO_8601).toDate()"
            format="yyyy年MM月dd日 hh:mm:ss"
          />
          <span v-else>null</span>
        </n-descriptions-item>
        <n-descriptions-item label="项目描述" span="2"
          ><ShowMarkDown :context="props.data?.projectDescribe"></ShowMarkDown
        ></n-descriptions-item>
      </n-descriptions>
    </template>
    <template #footer></template>
    <template #action></template>
  </n-card>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { Entity } from '../../../global'
import ButtonAvatar from '../commons/ButtonAvatar.vue'
import ShowMarkDown from '../commons/ShowMarkDown.vue'
import moment from 'moment'
interface ProjectInfo extends Entity.Project {
  projectLeadId?: string
  projectLeadName?: string
  projectMembers?: Array<string> | Array<Entity.Account>
  projectTasks?: Array<string>
}
const props = defineProps({
  title: String,
  data: Object as PropType<ProjectInfo>,
  size: {
    type: String,
    default: '300px'
  }
})
</script>

<style scoped lang="scss">
@import '@/style/variable/TheView.scss';
.card-info {
  display: inline-block;
  width: v-bind(size);
  margin-right: 10px;
}
.header {
  display: inline;
  height: 30px;
  background-color: $CardProjectInfoTitleBg;
}
.time {
  background-color: lightblue;
}
</style>
