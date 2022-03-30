<template>
  <div class="the-projects">
    <!-- 上部分搜索创建项目框 -->
    <div class="projects-bar">
      <n-space justify="space-between">
        <!-- 搜索框 -->
        <n-input-group>
          <n-select
            v-model:value="seacherSelect"
            size="medium"
            :options="seacherOptions"
            style="width: 100px"
          />
          <n-input
            v-model:value="seacherInput"
            type="text"
            placeholder="搜索"
            size="medium"
            maxlength="20"
            clearable
          ></n-input>
          <n-button type="primary" size="medium" @click="seacher">
            <template #icon>
              <n-icon size="20">
                <search />
              </n-icon>
            </template>
          </n-button>
        </n-input-group>
        <!-- 刷新、创建项目、未完待续 -->
        <bar-view-oparetion
          :buttonOptions="buttonOptions"
          @buttonClick="buttonClick"
          :dropdownOptions="dropdownOptions"
          @dropDownClick="dropDownClick"
        ></bar-view-oparetion>
      </n-space>
    </div>
    <!-- 展示所有项目 -->
    <div class="projects-main">
      <projects-Card
        v-for="(item, index) in projectsData"
        :key="index"
        :project-info="item"
        @click="projectsPush(item.projectId!)"
        @menuSelect="menuSelect"
      ></projects-Card>
    </div>
    <!-- 创建项目弹窗 -->
    <ModelUpdateProject
      v-model:showFlag="creatModel.showModel.value"
      :leader-list="creatModel.userOption.value"
      :user-list="creatModel.userOption.value"
      @creatProject="creatModel.creatProject"
      @updateProject="creatModel.updateProject"
      :update="creatModel.updateFlag.value"
      :text="creatModel.type.value"
    ></ModelUpdateProject>
    
    <!-- <ModelUpdateProject
      v-model:showFlag="project.showModel.value"
      @updateProject="project.updateProject"
      :user-list="project.userOptions.value"
      text="修改项目"
      :update="true"
    ></ModelUpdateProject>-->
  </div>
</template>

<script setup lang="ts">
// 未使用script setup语法糖，未在setup()内使用生命周期函数，wacth，computed，components等的写法
import { inject, ref, watch, onMounted } from 'vue'
// setup()中使用路由
import { useRouter } from 'vue-router'
// xicons图标库，配合naive ui组件库使用，按需引入
import ProjectsCard from '../layout/projects/ProjectsCard.vue'
import BarViewOparetion from '../layout/commons/BarViewOparetion.vue'
import { BarSide, Entity } from '../../global'
import { SelectOption } from 'naive-ui'
import { Refresh, Search, Outlet as Create, Dots as More } from '@vicons/tabler'
import { API } from '../../model'
import { MessageUtil, NotificationUtil } from '../../utils/notice/notice'
import ModelUpdateProject from '../layout/projectInfo/ModelUpdateProject.vue'
interface ProjectInfo extends Entity.Project {
  projectLeadId?: string
  projectLeadName?: string
  projectMembers?: Array<string> | Array<Entity.Account>
  projectTasks?: Array<string>
}
interface CreateProject {
  project: ProjectInfo
  projectLeadId: string
  userIds: Array<string>
}
const Api = inject<API.API>('$api')!
const Router = useRouter()
const notificationUtil = NotificationUtil()
const messageUtil = MessageUtil()
const allUserList = ref<Entity.Account[]>([])
const getAllUserList = async () => {
  await Api.queryUserInfoAll({
    limit: 10,
    pageOffset: 0
  }).then((data) => {
    if (data?.code === 200) {
      allUserList.value = data.data.userInfoList
    }
  })
}
const queryProjectById = async (id: number) => {
  await Api.queryProjectById({}, { params: { projectId: id } }).then((data) => {
    if (data?.code === 200) {
      projectsData.value = data.data
    }
  })
}
const allProjectList = ref<ProjectInfo[]>([])
const getAllProjectList = async () => {
  await Api.queryProjectAll({}, { params: { limit: 10, pageOffset: 0 } }).then((data) => {
    if (data?.code === 200) {
      allProjectList.value = data.data.projects
    }
  })
}
onMounted(() => {
  getAllProjectList().then(() => {
    getProjectsData()
  })
  getAllUserList()
})
const seacherInput = ref<number>()
const datalist = ref<string[]>([])
const seacherSelect = ref('1')
const seacherOptions = [
  {
    label: '进行中',
    value: '1'
  },
  {
    label: '已完成',
    value: '0'
  }
]
const seacher = () => {
  queryProjectById(seacherInput.value!)
}
// showModel
const creatModel = (function showModel() {
  const showModel = ref(false)
  const type = ref('创建项目')
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
  }
  const creatProject = async (info: ProjectInfo) => {
    const Data: CreateProject = {
      project: {
        projectCreateTime: new Date().toUTCString(),
        projectDescribe: info.projectDescribe,
        projectName: info.projectName
      },
      projectLeadId: info.projectLeadId!,
      userIds: info.projectMembers! as Array<string>
    }
    await Api.createProject(Data).then((data) => {
      if (data?.code === 200) {
        messageUtil.handleSuccess('项目创建成功')
      } else {
        messageUtil.handleError('项目创建失败')
      }
    })
    getAllProjectList().then(() => {
      getProjectsData()
    })
  }
  const updateProject = () => {
    messageUtil.handleInfo('我要改项目，你这厮敢拦我？？？')
  }
  return {
    showModel,
    userOption,
    type,
    updateFlag,
    updateProject,
    getUserOption,
    creatProject
  }
})()
// projectViewbar button
const { buttonOptions, buttonClick } = (function getButtonOptions() {
  const buttonOptions: Array<BarSide.Button> = [
    {
      id: '0',
      description: '刷新',
      icon: Refresh,
      callback: () => {
        notificationUtil.handleInfo({ content: '数据刷新' })
        getAllProjectList()
      }
    },
    {
      id: '1',
      description: '创建项目',
      icon: Create,
      callback: () => {
        notificationUtil.handleInfo({ content: '创建项目' })
        creatModel.showModel.value = true
      }
    },
    {
      id: '2',
      description: '未完待续',
      icon: More,
      callback: () => {
        notificationUtil.handleInfo({ content: '未完待续' })
      }
    }
  ]
  const buttonClick = (item: BarSide.Button) => {
    item.callback()
  }
  return { buttonOptions, buttonClick }
})()
// projectViewbar DropDown
const { dropdownOptions, dropDownClick } = (function getDropDownOptions() {
  const dropdownOptions: Array<BarSide.DropDown> = [
    {
      id: '1',
      label: '按状态筛选',
      options: [
        {
          key: '1',
          label: '执行中'
        },
        {
          key: '2',
          label: '终止中'
        },
        {
          key: '3',
          label: '未开始'
        }
      ]
    }
  ]
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
  return { dropdownOptions, dropDownClick }
})()
// 关于项目卡片的数据
const { projectsData, projectsPush, getProjectsData, menuSelect } = (function projectsInfo() {
  const projectsData = ref<ProjectInfo[]>([])
  const getProjectsData = async () => {
    const item = allProjectList.value
    item.forEach(async (v, i, arr) => {
      await Api.queryUserInfoGroup({groupId: v.projectGroup,limit:10,pageOffset:0 }).then((data) => {
        if (data?.code === 200) {
          arr[i].projectMembers = data.data
        }
      })
      await Api.queryGroupById({}, { params: { groupId: v.projectGroup } })
        .then((data) => {
          if (data?.code === 200) {
            return data.data.groupLead
          }
        })
        .then((id) => {
          Api.queryUserInfoById({}, { params: { userId: id } }).then((data) => {
            if (data?.code === 200) {
              arr[i].projectLeadId = id
              arr[i].projectLeadName = data.data.userName
            }
          })
        })
    })
    projectsData.value = item
    
  }
  const projectsPush = (query: string) => {
    Router.push({
      name: 'projectInfo',
      query: {
        id: query
      }
    })
  }
  const menuSelect = (key: String) => {
    creatModel.showModel.value = true
    creatModel.type.value = '修改项目'
    creatModel.updateFlag.value = true
  }
  return { projectsData, projectsPush, getProjectsData, menuSelect }
})()
</script>

<style scoped lang="scss">
@import '@/style/common/ViewSize.scss';
@import '@/style/variable/TheView.scss';
.the-projects {
  min-height: 700px;
  width: $Width;
  max-width: $MaxWidth;
  background-color: $TheProjectsBg;
  padding-top: 1px;
  display: inline-table;
  .creat-peoject {
    display: inline-block;
    height: 500px;
    min-width: 800px;
  }
}
.projects-bar {
  width: 96%;
  background-color: $TheProjectsBar;
  margin: 10px auto;
  padding: 0 10px;
}
.projects-main {
  display: inline-block;
  width: 100%;
  padding: 0 10px;
}
</style>
