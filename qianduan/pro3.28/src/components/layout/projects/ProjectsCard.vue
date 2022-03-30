<template>
  <n-card
    class="projects-card"
    :size="'large'"
    hoverable
    v-show="projectInfo.projectName"
    :bordered="false"
    :header-style="{ 'font-size': '1em', padding: '15px' }"
    :content-style="{ padding: '10px' }"
  >
    <template #header>
      <n-ellipsis style="max-width: 120px">{{ projectInfo.projectName }}</n-ellipsis>
    </template>
    <template #header-extra>
      <span class="header-extra">{{ projectInfo.projectStatus === 0 ? '执行中' : '已完成' }}</span>
      <n-dropdown trigger="hover" @select="handleSelect" :options="options">
        <n-button :keyboard="false" quaternary circle @click.stop>
          <template #icon>
            <n-icon>
              <menu-icon />
            </n-icon>
          </template>
        </n-button>
      </n-dropdown>
    </template>
    <template #default>
      <div class="card-content">
        <n-space>
            <ButtonAvatar
              :bordered="false"
              :text="props.projectInfo.projectName"
              :avatar="true"
              :color="{ color: '#DAF4F5' }"
            ></ButtonAvatar>
          <n-icon size="22">
            <members-icon />
          </n-icon>10
          <n-icon size="22">
            <leader-icon />
          </n-icon>20
          <n-icon size="22">
            <task-icon />
          </n-icon>10
        </n-space>
      </div>
    </template>
  </n-card>
</template>

<script setup lang="ts">
import { defineProps, PropType, defineEmits, h, Component } from 'vue'
import ButtonAvatar from '../commons/ButtonAvatar.vue'
import {
  LauncherSettings24Filled as MenuIcon,
  PersonSettings16Filled as MembersIcon,
  TaskListSquareRtl20Regular as LeaderIcon,
  People16Regular as TaskIcon,
  ErrorCircleSettings16Regular as SetIcon
} from '@vicons/fluent'
import { Entity } from '../../../global'
import { DropdownOption, NIcon } from 'naive-ui'
import { MessageUtil } from '../../../utils/notice/notice'

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
    default: () => {
      return {
        projectTitle: 'sss',
        projectState: 'ssss'
      }
    }
  }
})

const Emits = defineEmits(['menu-select'])
const handleSelect = (key: number, option: DropdownOption) => {
  m.handleInfo('你敢点我试试？！' + key)
  Emits('menu-select')
}
const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}
const options: DropdownOption[] = [
  {
    label: '修改项目',
    key: '1',
    icon: renderIcon(SetIcon)
  }
]

</script>
<style scoped lang="scss">
@import "@/style/variable/TheView.scss";
.projects-card {
  display: inline-block;
  background-color: $TheProjrctsCardBg;
  width: 320px;
  margin: 10px 15px;
  border-radius: 10px;
  .card-content {
    display: inline-block;
    width: 100%;
    text-align: center;
    border-radius: 10px;
    .content-title {
      display: block;
      width: 90%;
      margin: auto;
      border-radius: 10px;
      background-color: rgb(233, 245, 241);
    }
  }
  .header-extra {
    display: inline-block;
    height: 25px;
    width: 70px;
    line-height: 25px;
    text-align: center;
    background-color: $TheProjrctsStatue;
    border-radius: 10px;
  }
  .card-icon {
    color: $TheProjectsIcon;
    size: 10px;
  }
}
</style>
