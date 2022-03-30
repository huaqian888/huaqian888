<template>
  <div id="App">
    <el-config-provider :locale="ElementUiZhCn">
      <n-config-provider :locale="NaiveZhCn" :date-locale="NaiveDataZhCn">
        <el-container>
          <el-header :height="hg" id="header">
            <n-message-provider>
              <BarTopDisplayVue :height="hg" :PeopleOparetion="peopleOparetion"></BarTopDisplayVue>
            </n-message-provider>
          </el-header>
          <el-container>
            <el-main id="main">
              <n-notification-provider placement="bottom-right">
                <n-message-provider>
                  <n-dialog-provider>
                    <router-view></router-view>
                  </n-dialog-provider>
                </n-message-provider>
              </n-notification-provider>
            </el-main>
          </el-container>
        </el-container>
      </n-config-provider>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive} from 'vue'
import BarTopDisplayVue from '../layout/commons/BarTopDisplay.vue'
import {
  AppFolder24Filled,
  PeopleTeam28Filled,
  PeopleCommunity20Filled,
  PersonInfo16Filled,
  ClipboardTaskListRtl20Filled,
  ClipboardCheckmark24Filled
} from '@vicons/fluent'
import { BarSide } from '../../global'
import { zhCN as NaiveZhCn, dateZhCN as NaiveDataZhCn } from 'naive-ui'
import ElementUiZhCn from 'element-plus/lib/locale/lang/zh-cn'
const hg = ref('80px')
const peopleOparetion: Array<BarSide.Operation> = [
  {
    id: '0',
    path: '/Backlog',
    name: '待办',
    icon: ClipboardTaskListRtl20Filled
  },
  {
    id: '1',
    path: '/Projects',
    name: '项目',
    icon: AppFolder24Filled
  },
  {
    id: '2',
    path: '/Checks',
    name: '我的审核',
    icon: ClipboardCheckmark24Filled
  },
  {
    id: '3',
    path: '/MyGroups',
    name: '我的小组',
    icon: PeopleTeam28Filled
  },
  {
    id: '4',
    path: '/Members',
    name: '所有成员',
    icon: PeopleCommunity20Filled
  },
  {
    id: '5',
    path: '/PersonCenter',
    name: '我的信息',
    icon: PersonInfo16Filled
  },
]

</script>

<style lang="scss">
#App {
  min-width: 1040px;
  min-height: 99.9vh;
  position: relative;
  background-color: lightblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#header {
  padding: 0;
}
#main {
  padding: 0;
}
#App {
  min-width: 1040px;
  min-height: 99.9vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
