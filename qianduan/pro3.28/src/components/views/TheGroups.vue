<template>
  <div class="the-Groups">
    <div class="groups-bar">
      <n-space justify="space-between">
        <n-input-group style="padding: 10px">
          <n-input
            v-model:value="selectInfo"
            type="text"
            placeholder="请输入ID"
            size="medium"
            clearable
            maxlength="20"
          ></n-input>
          <n-button type="primary" size="medium" @click="groupCard.serchGroupById">
            <template #icon>
              <n-icon size="20">
                <search />
              </n-icon>
            </template>
          </n-button>
        </n-input-group>

        <!-- <bar-view-oparetion
          :buttonOptions="buttonOptions"
          @buttonClick="buttonClick"
        ></bar-view-oparetion>-->
      </n-space>
    </div>
    <ModelCreatGroup
      v-model:showFlag="creatModel.showModel.value"
      :userOptions="creatModel.userOption.value"
      @creatGroup="creatModel.creatGroup"
      :update="creatModel.updateFlag.value"
      :text="creatModel.type.value"
    ></ModelCreatGroup>
    <CardGroupsInfo
      class="CardGroupsInfo"
      :title="groupCard.title.value"
      :data="groupCard.groupInfos.value"
      @addGroupUser="groupCard.addGroupUser"
    ></CardGroupsInfo>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, reactive, ref, watch } from 'vue'
import ModelCreatGroup from '../layout/projectInfo/ModelCreatGroup.vue'
import CardGroupsInfo from '../layout/projectInfo/CardGroupsInfo.vue'
import BarViewOparetion from '../layout/commons/BarViewOparetion.vue'
import { Refresh, Search, Outlet as Create, Dots as More } from '@vicons/tabler'
import { BarSide, Entity } from '../../global'
import { MessageUtil, NotificationUtil } from '../../utils/notice/notice'
import { SelectOption } from 'naive-ui'
import { API } from '../../model'
import qs from 'qs'
interface GroupInfo extends Entity.Group {
  groupParentId?: string
  groupName?: string
  groupMembers?: Array<string> | Array<Entity.Account>
  groupLead?: string
  groupId?: string
}
interface CreateGroup {
  group?: GroupInfo
  groupUsers?: Array<string> | Array<Entity.Account>
}
interface ProjectGroup extends Entity.Group {
  groupLeadName?: string
  groupMembers?: Array<Entity.Account>
}
const selectInfo = ref('')
const Api = inject<API.API>('$api')!
const allUserList = ref<Entity.Account[]>([])
const notificationUtil = NotificationUtil()
const messageUtil = MessageUtil()
const groupInfo = ref<GroupInfo>()
onMounted(() => {
  queryGroupsByUserId()
})
const groupCard = (function groupCardInfo() {
  const title = ref('')
  const getData = reactive<ProjectGroup>({
    groupLeadName: '',
    groupMembers: []
  })
  const groupInfos = ref<ProjectGroup>()
  const arr = ref([1, 2, 3])
  const addGroupUser = async () => {
    await Api.addGroupUser(
      {},
      {
        params: {
          groupId: 3,
          userIds: arr.value.join(',')
        }
      }
    ).then((data) => {
      console.log(data)
      if (data?.code === 200) {
        messageUtil.handleSuccess('添加成功')
      } else {
        messageUtil.handleError('添加失败')
      }
    })
  }
  const serchGroupById = async () => {
    await Api.queryGroupById({}, { params: { groupId: selectInfo.value } }).then((data) => {
      if (data?.code === 200) {
        groupInfo.value = data.data
        title.value = data.data.groupName
        queryUserInfoById(data.data.groupLead)
      }
    })
  }
  const queryUserInfoById = async (groupLeaderId: string) => {
    await Api.queryUserInfoById({}, { params: { userId: groupLeaderId } }).then((data) => {
      if (data?.code === 200) {
        getData.groupLeadName = data.data.userName
        console.log(getData)
        groupInfos.value = getData as ProjectGroup
      }
    })
  }
  return {
    queryUserInfoById,
    serchGroupById,
    addGroupUser,
    title,
    groupInfos
  }
})()
// const getAllUserList = async () => {
//   await Api.queryUserInfoAll({
//     limit: 10,
//     pageOffset: 0
//   }).then((data) => {
//     if (data?.code === 200) {
//       allUserList.value = data.data.userInfoList
//     }
//   })
// }
const myGroups = ref<GroupInfo[]>([])
const queryGroupsByUserId = async () => {
  await Api.queryGroupsByUserId({}, { params: { userId: sessionStorage.getItem('userId') } }).then(
    (data) => {
      if (data?.code === 200) {
        myGroups.value = data.data
      }
    }
  )
}
const creatModel = (function showModel() {
  const showModel = ref(false)
  const type = ref('创建小组')
  const updateFlag = ref(false)
  watch(showModel, (newV) => {
    if (newV === true) {
      getUserOption()
    }
  })
  const userOption = ref<Array<SelectOption>>([])
  const getUserOption = () => {
    userOption.value = []
    allUserList.value.forEach((v) => {
      userOption.value.push({
        value: v.userId!,
        label: v.userName!,
        imgUrl: 'src/assets/logo.png'
      })
    })
    console.log(userOption.value)
  }
  const creatGroup = async (info: GroupInfo) => {
    const Data: CreateGroup = {
      group: {
        groupParentId: info.groupParentId!,
        groupName: info.groupName,
        groupLead: info.groupLead
      },
      groupUsers: info.groupMembers! as Array<string>
    }
    await Api.createGroup(Data).then((data) => {
      console.log(data)
      if (data?.code === 200) {
        messageUtil.handleSuccess('小组创建成功')
      } else {
        messageUtil.handleError('小组创建失败')
      }
    })
    // getAllProjectList().then(() => {
    //   getProjectsData()
    // })
  }
  const updateProject = () => {
    // messageUtil.handleInfo('我要改项目，你这厮敢拦我？？？')
  }
  return {
    showModel,
    userOption,
    type,
    updateFlag,
    updateProject,
    getUserOption,
    creatGroup
  }
})()
// const { buttonOptions, buttonClick } = (function getButtonOptions() {
//   const buttonOptions: Array<BarSide.Button> = [
//     {
//       id: '0',
//       description: '刷新',
//       icon: Refresh,
//       callback: () => {
//         notificationUtil.handleInfo({ content: '数据刷新' })
//         // getAllProjectList()
//       }
//     },
//     {
//       id: '1',
//       description: '创建小组',
//       icon: Create,
//       callback: () => {
//         notificationUtil.handleInfo({ content: '创建小组' })
//         creatModel.showModel.value = true
//       }
//     },
//     {
//       id: '2',
//       description: '未完待续',
//       icon: More,
//       callback: () => {
//         notificationUtil.handleInfo({ content: '未完待续' })
//       }
//     }
//   ]
//   const buttonClick = (item: BarSide.Button) => {
//     item.callback()
//   }
//   return { buttonOptions, buttonClick }
// })()
</script>

<style lang="scss">
@import '@/style/common/ViewSize.scss';
@import '@/style/variable/TheView.scss';
.the-Groups {
  min-height: 700px;
  max-height: 100%;
  background-color: #fcf9ec;
  width: $Width;
  max-width: $MaxWidth;
  padding-top: 1px;
  display: inline-table;
  .CardGroupsInfo {
    margin-left: 38px;
  }
}
.groups-bar {
  width: 96%;
  margin: 0 auto;
}
</style>
