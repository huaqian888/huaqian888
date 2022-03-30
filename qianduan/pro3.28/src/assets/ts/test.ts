import { Projects } from '../../global'

const allProjectsData: Array<Projects.Project> = [
  {
    id: '1',
    projectTitle: '项目之空城计',
    projectState: '执行中',
    projectVersionCount: '2',
    projectVersion: '1.1.1',
    projectTaskCount: '10',
    projectTaskCompletedCount: '5',
    projectSeetingPerson: '李晓磊',
    projectMembersCount: '10'
  },
  {
    id: '2',
    projectTitle: '项目之美人计',
    projectState: '执行中',
    projectVersionCount: '2',
    projectVersion: '1.1.1',
    projectTaskCount: '10',
    projectTaskCompletedCount: '5',
    projectSeetingPerson: '李晓磊',
    projectMembersCount: '10'
  },
  {
    id: '3',
    projectTitle: '项目之空城计',
    projectState: '执行中',
    projectVersionCount: '2',
    projectVersion: '1.1.1',
    projectTaskCount: '10',
    projectTaskCompletedCount: '5',
    projectSeetingPerson: '李晓磊',
    projectMembersCount: '10'
  },
  {
    id: '4',
    projectTitle: '项目之美人计',
    projectState: '执行中',
    projectVersionCount: '2',
    projectVersion: '1.1.1',
    projectTaskCount: '10',
    projectTaskCompletedCount: '5',
    projectSeetingPerson: '李晓磊',
    projectMembersCount: '10'
  },
  {
    id: '5',
    projectTitle: '项目之空城计',
    projectState: '执行中',
    projectVersionCount: '2',
    projectVersion: '1.1.1',
    projectTaskCount: '10',
    projectTaskCompletedCount: '5',
    projectSeetingPerson: '李晓磊',
    projectMembersCount: '10'
  }
]

const projectInfoData = {
  projectId: '1',
  projectLeadId: 'id',
  projectName: '项目1之无敌风火',
  projectState: '执行中',
  projectDescribe:
    '信创工作委员会成员单位，通过 ISO/IEC 27001:2013认证，从产品特性到系统管理全方位完备的安全措施，确保数据安全可靠，' +
    '从项目管理到代码、知识库、DEVOPS 的一体化平台，无需多个系统间切换，极大提升工作效率，超过 8 年的沉淀，' +
    '超 20 万家企业信赖选择，满足从 5 人到上万人团队协作的需求。',
  projectGroup: [],
  projectTasks: [],
  projectMembers: [],
  projectCreateTime: new Date(),
  projectEndTime: new Date()
}

const projectGroups = [
  {
    groupId: 'groupId',
    groupParentId: 'groupParentId',
    groupName: '后端组',
    groupLead: '5',
    groupMembers: ['1', '2', '3']
  },
  {
    groupId: 'groupId',
    groupParentId: 'groupParentId',
    groupName: '前端组',
    groupLead: '1',
    groupMembers: ['1', '2', '3', '4', '5']
  },
  {
    groupId: 'groupId',
    groupParentId: 'groupParentId',
    groupName: '文档设计',
    groupLead: '6',
    groupMembers: ['1', '2', '3', '4', '5', '6']
  },
  {
    groupId: 'groupId',
    groupParentId: 'groupParentId',
    groupName: '测试',
    groupLead: '3',
    groupMembers: ['1', '2', '3', '4', '5', '6']
  }
]

const projectMembersTest = [
  {
    userId: '1',
    userName: '李晓磊'
  },
  {
    userId: '2',
    userName: '李磊'
  },
  {
    userId: '3',
    userName: '李晓'
  },
  {
    userId: '4',
    userName: '晓磊'
  },
  {
    userId: '5',
    userName: '李了三'
  },
  {
    userId: '6',
    userName: '张三'
  },
  {
    userId: '7',
    userName: '李晓磊'
  },
  {
    userId: '8',
    userName: '李磊'
  },
  {
    userId: '9',
    userName: '李晓'
  },
  {
    userId: '10',
    userName: '晓磊'
  },
  {
    userId: '11',
    userName: '李了三'
  },
  {
    userId: '12',
    userName: '张三'
  }
]

const allMembersData = [
  {
    label: '李晓磊',
    value: '1',
    imgUrl: 'src/assets/logo.png'
  },
  {
    label: '李肖磊',
    value: '2'
  },
  {
    label: '李晓磊',
    value: '3'
  },
  {
    label: '李磊',
    value: '4'
  },
  {
    label: '晓磊',
    value: '5'
  },
  {
    label: '李晓',
    value: '6'
  },
  {
    label: '李',
    value: '7'
  },
  {
    label: '晓磊',
    value: '8'
  },
  {
    label: '磊',
    value: '9'
  }
]

export { allProjectsData, projectInfoData, allMembersData, projectGroups, projectMembersTest }
