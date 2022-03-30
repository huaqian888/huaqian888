<template>
  <n-card size="medium" style="display: inline-table; vertical-align: top">
    <!-- 项目名、修改项目按钮 -->
    <template #header>
      <n-tag type="default" size="large" :bordered="false" :color="{ color: 'rgb(0, 0, 0, 0)' }">
        <n-ellipsis style="max-width: 170px; font-size: 1.2em; font-weight: bolder">
          {{ props.projectInfo?.projectName }}
        </n-ellipsis>
      </n-tag>
      <n-button size="medium" @click="editClick" quaternary circle>
        <template #icon>
          <n-icon>
            <edit />
          </n-icon>
        </template>
      </n-button>
    </template>
    <!-- 进行中 -->
    <template #header-extra>
      <n-tag type="info" round> {{ StatusText }} </n-tag>
    </template>
    <!-- 图片 -->
    <template #default>
      <ButtonAvatar
        :avatar="true"
        :text="props.projectInfo?.projectLeadName"
        :avatar-size="'30px'"
        :bordered="false"
        :color="{ color: 'rgb(0, 0, 0, 0)' }"
      ></ButtonAvatar>
    </template>
    <!-- 日期 -->
    <template #footer>
      <n-time
        class="timeShow"
        type="datetime"
        v-if="props.projectInfo?.projectCreateTime"
        :time="moment(props.projectInfo?.projectCreateTime).toDate()"
        format="yyyy-MM-dd hh:mm"
      />
      <n-tag v-else type="warning" size="medium">NULL</n-tag>
      ——
      <n-time
        class="timeShow"
        type="datetime"
        v-if="props.projectInfo?.projectEndTime"
        :time="moment(props.projectInfo.projectEndTime).toDate()"
        format="yyyy-MM-dd hh:mm"
      />
      <n-tag v-else type="warning" size="medium">NULL</n-tag>
    </template>
    
  </n-card>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, PropType } from 'vue'
import ButtonAvatar from '../commons/ButtonAvatar.vue'
import { EditOff16Filled as edit } from '@vicons/fluent'
import { MessageUtil } from '../../../utils/notice/notice'
import { Entity } from '../../../global'
import moment from 'moment'
interface ProjectInfo extends Entity.Project {
  projectLeadId?: string
  projectLeadName?: string
  projectMembers?: Array<string> | Array<Entity.Account>
  projectTasks?: Array<string>
}
const m = MessageUtil()
const props = defineProps({
  projectInfo: {
    type: Object as PropType<ProjectInfo>,
    defualt: () => {}
  }
})
const Emits = defineEmits(['updateInfo'])
const editClick = () => {
  Emits('updateInfo')
  m.handleInfo('我想在这修改项目基本信息，你有意见？？？')
}
const StatusText = computed(() => {
  return props.projectInfo?.projectStatus === 0 ? '进行中' : '已完成'
})
</script>

<style lang="scss">
.timeShow {
  font-size: 1em;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
