<template>
  <div class="ProjectInfo">
    <!-- 项目、小组、项目管理按钮 -->
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
    <!--图形区 -->
    <div class="show-main">
      <div style="display: inline-block; vertical-align: top">
        <!-- 卡片信息 -->
        <CardProjectInfo
          :projectInfo="projectInfo"
          style="width: 350px; border-radius: 10px; background-color: rgb(245, 238, 228)"
          @update-info="project.updateInfo"
        ></CardProjectInfo>
        <!-- 雷达 -->
        <ProgressProjectTask
          style="margin-top: 10px; background-color: rgb(245, 238, 228); border-radius: 10px"
        ></ProgressProjectTask>
      </div>
      <!-- 折线 -->
      <CardBurnChart
        style="
          background-color: rgb(245, 238, 228);
          margin-left: 10px;
          border-radius: 10px;
          width: 1040px;
        "
      ></CardBurnChart>
      <!-- 项目描述 -->
      <CardProjectDescription
        :descriptionData="projectInfo.projectDescribe"
        style="padding: 10px; background-color: rgb(245, 238, 228); border-radius: 10px"
      ></CardProjectDescription>
    </div>
    <!-- 添加成员弹窗 -->
    <ModelAddMember
      v-model:showFlag="members.showModel.value"
      :userOptions="members.allUserOption.value"
      @addMembers="members.addMembers"
    ></ModelAddMember>
    <!-- 新建小组弹窗 -->
    <ModelCreatGroup
      v-model:showFlag="groups.showModel.value"
      :data="groups.groupInfo.value"
      :userOptions="groups.userOption.value"
      @creatGroup="groups.updateGroups"
      :text="groups.title.value"
    ></ModelCreatGroup>
    <!-- 修改项目弹窗 -->
    <ModelUpdateProject
      v-model:showFlag="project.showModel.value"
      @updateProject="project.updateProject"
      :user-list="project.userOptions.value"
      :project-group="projectInfo"
      text="修改项目"
      :update="true"
    ></ModelUpdateProject>
    <!-- 项目管理弹窗 -->
    <DrawerProject v-model:show-flag="barOparetion.drawerShow.value" width="55%">
      <n-tabs type="line" size="medium">
        <n-tab-pane name="成员管理" tab="成员管理">
          <ListDarwerMember
            :data-list="projectMembers"
            :group-id="projectInfo.projectLeadId + ''"
            v-model:add-flag="members.showModel.value"
          ></ListDarwerMember>
        </n-tab-pane>
        <n-tab-pane name="小组管理" tab="小组管理">
          <ListDrawerGroup
            :data-list="groups.showProjectGroups.value"
            @creat-flag="groups.groupAdd"
            @delete-group="groups.deleteGroup"
          ></ListDrawerGroup>
        </n-tab-pane>
        <n-tab-pane name="任务管理" tab="任务管理">
          <ListDarwerTask
            v-model:creat-flag="tasks.showModel.value"
            :datas="tasks.groupTasks.value"
            :members="tasks.membersMap.value"
            :groups="tasks.groupsMap.value"
            @delete="tasks.getGourpTasks"
          ></ListDarwerTask>
        </n-tab-pane>
      </n-tabs>
    </DrawerProject>
    <!-- 创建任务弹窗 -->
    <n-modal
      v-model:show="tasks.showModel.value"
      preset="dialog"
      title="创建任务"
      positive-text="创建"
      negative-text="取消"
      @positive-click="tasks.creatTask"
      :mask-closable="false"
      :style="{ width: '90%' }"
    >
      <create-task :group-id="parseInt(projectInfo.projectGroup!)" ref="createTaskRef" />
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, inject, computed, provide, Ref } from 'vue'
import { Settings } from '@vicons/tabler'
import { BarSide, Entity } from '../../global'
import { MessageUtil } from '../../utils/notice/notice'
import BarViewOparetion from '../layout/commons/BarViewOparetion.vue'
import CardProjectInfo from '@/components/layout/projectInfo/CardProjectInfo.vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from 'vue-router'
import ModelCreatGroup from '../layout/projectInfo/ModelCreatGroup.vue'
import ModelAddMember from '../layout/projectInfo/ModelAddMember.vue'
import ListDarwerMember from '../layout/projectInfo/ListDarwerMember.vue'
import ModelUpdateProject from '../layout/projectInfo/ModelUpdateProject.vue'
import { SelectOption } from 'naive-ui'
import { API } from '../../model'
import DrawerProject from '../layout/commons/DrawerProject.vue'
import ListDrawerGroup from '../layout/projectInfo/ListDrawerGroup.vue'
import BreadcrumbProject from '../layout/projectInfo/BreadcrumbProject.vue'
import CardBurnChart from '../layout/projectInfo/CardBurnChart.vue'
import ProgressProjectTask from '../layout/projectInfo/ProgressProjectTask.vue'
import CardProjectDescription from '../layout/projectInfo/CardProjectDescription.vue'
import ListDarwerTask from '../layout/projectInfo/ListDarwerTask.vue'
import CreateTask from '../layout/tasks/CreateTask.vue'
import moment from 'moment'
interface ProjectInfo extends Entity.Project {
  projectLeadId?: string
  projectLeadName?: string
  projectMembers?: Array<string> | Array<Entity.Account>
  projectTasks?: Array<string>
}
interface ProjectGroup extends Entity.Group {
  groupLeadName?: string
  groupMembers?: Array<Entity.Account>
}
onBeforeRouteLeave((to, from) => {})
onBeforeRouteUpdate((to, from) => {
  messageUtil.handleInfo('我没更新吗，看看我的id？？？' + to.query.id)
  if (to.query.id !== from.query.id) {
    getProjectInfo(to.query.id as string).then(() => {
      getProjectGroups()
      getProjectMembers()
      getAllUserList()
      project.getShowProjectInfo()
    })
  }
  messageUtil.handleInfo('我更新了啊!!')
})
const messageUtil = MessageUtil()
const Route = useRoute()
const Api = inject<API.API>('$api')!
const projectInfo = ref<ProjectInfo>({})
const getProjectInfo = async (id: string) => {
  await Api.queryProjectById({}, { params: { projectId: id } }).then((data) => {
    if (data?.code === 200) {
      projectInfo.value = data.data
    }
  })
}
const projectGroups = ref<ProjectGroup[]>([])
// provide<Ref<ProjectInfo>>('projectInfo', projectInfo as Ref<ProjectInfo>)
provide('test', 1)
const getProjectGroups = async () => {
  await Api.queryGroupByGroup({}, { params: { groupId: projectInfo.value.projectGroup } }).then(
    (data) => {
      if (data?.code === 200) {
        projectGroups.value = data.data
        groups.getShowProjectGroups()
      }
    }
  )
}

const projectMembers = ref<Entity.Account[]>([])
const getProjectMembers = async () => {
  await Api.queryUserInfoGroup({
    groupId: projectInfo.value.projectGroup,
    limit: 2,
    pageOffset: 0
  }).then((data) => {
    if (data?.code === 200) {
      projectMembers.value = data.data.userInfoList
    }
  })
}
const allUserList = ref<Entity.Account[]>([])
const getAllUserList = async () => {
  await Api.queryUserInfoAll({ limit: 10, pageOffset: 0 }).then((data) => {
    if (data?.code === 200) {
      allUserList.value = data.data.userInfoList
    }
  })
}
onMounted(() => {
  getProjectInfo(Route.query.id as string).then(() => {
    getProjectGroups()
    getProjectMembers()
    getAllUserList()
    // project.getShowProjectInfo()
  })
})
// 工具栏
const barOparetion = (function () {
  const drawerShow = ref(false)
  watch(drawerShow, (v) => {
    if (v === true) {
      tasks.getGourpTasks()
    }
  })
  const buttonOptions: Array<BarSide.Button> = [
    {
      id: '1',
      description: '项目管理',
      icon: Settings,
      callback: () => {
        // messageUtil.handleInfo('项目管理')
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
// 项目信息
const project = (function () {
  const showModel = ref(false)
  watch(showModel, (newV) => {
    if (newV === true) {
      getUserOption()
    }
  })
  const updateInfo = (flag: Boolean) => {
    showModel.value = !showModel.value
  }
  const showProjectInfo = ref<ProjectInfo>({})
  const getShowProjectInfo = async () => {
    const item = projectInfo.value
    await Api.queryGroupById({}, { params: { groupId: projectInfo.value.projectGroup } }).then(
      (data) => {
        if (data?.code === 200) {
          item.projectLeadId = data.data.groupLead
        }
      }
    )
    // await Api.queryUserInfoById({}, { params: { userId: item.projectLeadId } }).then((data) => {
    //   if (data?.code === 200) {
    //     item.projectLeadName = data.data.userName
    //     showProjectInfo.value = item
    //   }
    // })
  }
  const userOptions = ref<SelectOption[]>([])
  const getUserOption = () => {
    const item: Array<SelectOption> = []
    allUserList.value.forEach((v) => {
      item.push({ value: v.userId!, label: v.userName!, imgUrl: 'src/assets/logo.png' })
      projectMembers.value.forEach((c) => {
        if (v.userId === c.userId) {
          item.pop()
        }
      })
      userOptions.value = item
    })
  }
  const updateProject = async (info: ProjectInfo) => {
    console.log(info)
    // 修改项目名
    await Api.updateProject(
      {},
      {
        params: {
          projectId: projectInfo.value.projectId,
          projectName: info.projectName
        }
      }
    ).then((data) => {
      if (data?.code == 200) {
        getProjectInfo(Route.query.id as string)
        messageUtil.handleSuccess('修改成功')
      }
    })
    // 添加项目描述
    // 修改项目状态
    // 重新获取项目信息
  }
  return {
    showModel,
    userOptions,
    updateInfo,
    updateProject,
    showProjectInfo,
    getShowProjectInfo
  }
})()
// 小组信息
const groups = (function () {
  const showModel = ref(false)
  const title = ref('')
  const userOption = ref<SelectOption[]>([])
  const showProjectGroups = ref<ProjectGroup[]>([])
  const groupInfo = ref<ProjectGroup>()
  const groupUpdate = (index: number) => {
    messageUtil.handleInfo('修改小组信息')
    groupInfo.value = showProjectGroups.value[index]
    //console.log('修改小组的信息', groupInfo.value)
    getAllUserOption()
    title.value = '修改小组'
    showModel.value = true
  }
  const groupAdd = () => {
    messageUtil.handleInfo('增加小组')
    groupInfo.value = {}
    getAllUserOption()
    // console.log('修改小组的信息·', groupInfo.value)
    title.value = '创建小组'
    showModel.value = true
  }
  const deleteGroup = async (id: number) => {
    await Api.deleteGroup({}, { params: { groupId: id } }).then((data) => {
      if (data?.code === 200) {
        messageUtil.handleSuccess('删除成功', {
          duration: 1000
        })
        getProjectGroups()
      }
    })
  }
  const updateGroups = async (info: ProjectGroup) => {
    if (title.value === '创建小组') {
      await Api.createGroup({
        group: {
          groupLead: info.groupLead,
          groupName: info.groupName,
          groupParentId: projectInfo.value.projectGroup
        },
        groupUsers: info.groupMembers
      }).then((data) => {
        if (data?.code === 200) {
          messageUtil.handleSuccess('小组创建成功！')
        } else {
          messageUtil.handleSuccess('小组创建失败！')
        }
      })
    } else {
      const item: Array<string> = []
      info.groupMembers?.forEach((v) => {
        item.push(v.userId!)
      })
      await Api.addGroupUsesr({}, { params: { groupId: groupInfo.value?.groupId, userIds: item } })
      await Api.updateGroupName(
        {},
        { params: { groupId: groupInfo.value?.groupId, groupName: info.groupName } }
      )
    }
    getProjectGroups()
  }
  const getAllUserOption = () => {
    userOption.value = []
    const item: Array<SelectOption> = []
    projectMembers.value.forEach((v) => {
      item.push({
        value: v.userId!,
        label: v.userName!,
        imgUrl: 'src/assets/logo.png'
      })
      groupInfo.value?.groupMembers?.forEach((c) => {
        if (v.userId === c.userId) {
          item.pop()
        }
      })
      userOption.value = item
    })
    // console.log('项目小组的选项', userOption.value)
  }
  const getShowProjectGroups = async () => {
    const item = projectGroups.value
    item.forEach(async (v, i, arr) => {
      await Api.queryUserInfoById({}, { params: { userId: item[i].groupLead } }).then((data) => {
        if (data?.code === 200) {
          item[i].groupLeadName = data.data.userName
        }
      })
      await Api.queryUserInfoGroup({ groupId: item[i].groupId, limit: 2, pageOffset: 0 })
        .then((data) => {
          if (data?.code === 200) {
            item[i].groupMembers = data.data
            return item
          }
        })
        .then((it) => {
          showProjectGroups.value = it!
        })
    })
    // console.log('想展示的小组数据', showProjectGroups.value)
  }
  return {
    groupUpdate,
    groupAdd,
    showModel,
    showProjectGroups,
    userOption,
    groupInfo,
    title,
    getShowProjectGroups,
    updateGroups,
    deleteGroup
  }
})()
// 成员信息
const members = (function () {
  const showModel = ref(false)
  watch(showModel, (v) => {
    if (v === true) {
      getAllUserOption()
    }
  })
  const allUserOption = ref<SelectOption[]>([])
  const getAllUserOption = () => {
    const item: SelectOption[] = []
    allUserList.value.forEach((v) => {
      item.push({
        value: v.userId!,
        label: v.userName!,
        imgUrl: 'src/assets/logo.png'
      })
      projectMembers.value.forEach((c) => {
        if (v.userId === c.userId) {
          item.pop()
        }
      })
    })
    allUserOption.value = item
  }
  const addMembers = async (selects: Array<string>) => {
    await Api.addGroupUsesr(
      {},
      { params: { groupId: projectInfo.value?.projectGroup, userIds: selects } }
    ).then((data) => {
      if (data?.code === 200) {
        messageUtil.handleSuccess('项目添加成员成功')
      } else {
        messageUtil.handleError('项目添加成员失败')
      }
    })
    getProjectMembers()
  }
  return {
    showModel,
    addMembers,
    allUserOption
  }
})()
// 任务信息
interface resultType {
  name: string
  priority: number
  weight: number
  startTime: string
  endTime: string
  select: {
    type: string
    value: {
      id: string
      groupLead: string
      name: string
    } | null
  }
  describe: string
}
const createTaskRef = ref()
const tasks = (() => {
  const showModel = ref(false)
  const creatTask = async () => {
    createTaskRef.value.check().then((data: resultType) => {
      Api.createTask({
        executorId: data.select.value?.groupLead,
        groupId:
          data.select.value?.id === null ? projectInfo.value.projectGroup : data.select.value?.id,
        executorName: data.select.value?.name,
        parentId: projectInfo.value.projectGroup,
        priority: data.priority,
        projectId: projectInfo.value.projectId,
        status: 0,
        taskCreateTime: moment().format(),
        taskDescribe: data.describe,
        taskEndTime: data.endTime,
        taskName: data.name,
        taskStartime: data.startTime,
        weight: data.weight,
        taskType: data.select.type === 'pool' ? 0 : 1
      }).then((data) => {
        if (data?.code === 200) {
          messageUtil.handleSuccess('任务创建成功')
          getGourpTasks()
        } else {
          messageUtil.handleError('任务创建失败')
        }
      })
    })
  }
  const groupTasks = ref()
  const getGourpTasks = () => {
    Api.queryTaskByGroupId({}, { params: { groupId: projectInfo.value.projectGroup } }).then(
      (data) => {
        if (data?.code === 200) {
          groupTasks.value = data?.data
        }
      }
    )
  }
  const groupsMap = computed(() => {
    const map = new Map()
    projectGroups.value.forEach((v) => {
      map.set(v.groupId, v.groupName)
    })
    map.set(projectInfo.value.projectGroup, projectInfo.value.projectName)
    return map
  })
  const membersMap = computed(() => {
    const map = new Map()
    projectMembers.value.forEach((v) => {
      map.set(v.userId, v.userName)
    })
    return map
  })
  return {
    showModel,
    creatTask,
    groupTasks,
    getGourpTasks,
    groupsMap,
    membersMap
  }
})()
</script>

<style lang="scss">
@import '@/style/common/ViewSize.scss';
@import '@/style/variable/TheView.scss';
.ProjectInfo {
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
.show-main {
  display: inline-table;
  width: 100%;
  padding: 0 10px;
}
</style>
