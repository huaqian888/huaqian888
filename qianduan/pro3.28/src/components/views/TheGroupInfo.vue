<template>
  <div class="GroupInfo">
    <div class="bar-oparetion">
      <n-space justify="space-between">
        <BreadcrumbProject></BreadcrumbProject>
        <BarViewOparetion
          :buttonOptions="barOparetion.buttonOptions"
          @buttonClick="barOparetion.buttonClick"
          :dropdownOptions="barOparetion.dropdownOptions"
          @dropDownClick="barOparetion.dropDownClick"
        ></BarViewOparetion>
      </n-space>
    </div>
    <DrawerProject v-model:show-flag="barOparetion.drawerShow.value">
      <n-tabs type="line" size="medium">
        <n-tab-pane name="成员管理" tab="成员管理">
          <ListDarwerMember v-model:add-flag="members.showModel.value"></ListDarwerMember>
        </n-tab-pane>
        <n-tab-pane name="小组管理" tab="小组管理">
          <ListDrawerGroup v-model:creat-flag="groups.showModel.value"></ListDrawerGroup>
        </n-tab-pane>
        <n-tab-pane name="任务管理" tab="任务管理"></n-tab-pane>
      </n-tabs>
    </DrawerProject>
  </div>
</template>

<script setup lang="ts">
import BreadcrumbProject from '../layout/projectInfo/BreadcrumbProject.vue'
import BarViewOparetion from '../layout/commons/BarViewOparetion.vue'
import DrawerProject from '../layout/commons/DrawerProject.vue'
import ListDarwerMember from '../layout/projectInfo/ListDarwerMember.vue'
import ListDrawerGroup from '../layout/projectInfo/ListDrawerGroup.vue'
import { Refresh } from '@vicons/tabler'
import { ref } from 'vue'
import { BarSide } from '../../global'
import { MessageUtil } from '../../utils/notice/notice'

const messageUtil = MessageUtil()
// 工具栏
const barOparetion = (function () {
  const drawerShow = ref(false)
  const buttonOptions: Array<BarSide.Button> = [
    {
      id: '1',
      description: '小组管理',
      icon: Refresh,
      callback: () => {
        messageUtil.handleInfo('小组管理')
        drawerShow.value = true
      }
    }
  ]
  const buttonClick = (item: BarSide.Button) => {
    item.callback()
  }
  const dropdownOptions: Array<BarSide.DropDown> = []
  const dropDownClick = (data: { id: number; optionKey: string }) => {
    switch (data.id) {
      case 0: {
        switch (data.optionKey) {
          case '1': {
            messageUtil.handleInfo('执行中')
          }
        }
      }
    }
  }
  return {
    drawerShow,
    buttonOptions,
    buttonClick,
    dropdownOptions,
    dropDownClick
  }
})()
// 成员
const members = (() => {
  const showModel = ref(false)
  return {
    showModel
  }
})()

// 小组
const groups = (() => {
  const showModel = ref(false)
  return {
    showModel
  }
})()

// 任务
const tasks = (() => {
  const showModel = ref(false)
  return {
    showModel
  }
})()
</script>

<style lang="scss">
@import '@/style/common/ViewSize.scss';
@import '@/style/variable/TheView.scss';
.GroupInfo {
  min-height: 700px;
  max-height: 100%;
  width: $Width;
  max-width: $MaxWidth;
  background-color: $TheProjectsBg;
  padding-top: 1px;
  display: inline-table;
}
.bar-oparetion {
  width: 99%;
  background-color: $TheProjectsBar;
  margin: 10px auto;
  padding: 0 10px;
}
</style>
