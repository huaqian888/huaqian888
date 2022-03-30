import { DropdownOption } from 'naive-ui'
import { Component } from 'vue'

export namespace Entity {
  export interface Account {
    userId?: string
    userType?: string
    userName?: string
    userAccount?: string
    userPassword?: string
    userPhone?: string
    userEmail?: string
    usercheckPass?: string
  }
  export interface Project {
    projectId?: string
    projectName?: string
    projectStatus?: string | number
    projectDescribe?: string
    projectGroup?: string
    projectCreateTime?: string
    projectEndTime?: string
  }
  export interface Group {
    groupId?: string
    groupParentId?: string
    groupName?: string
    groupLead?: string
  }
  export interface GroupUser {
    groupUserId: string
    groupId: string
    userId: string
  }
  export interface Attendance {
    attendanceId: string
    signIn: string
    signOut: string
    userId: string
  }
  export interface Judge {
    judgeId?: string
    judgeResult?: string
    judgeOpinion?: string
    taskId?: string
    reportDescribe?: string
    reportPosition?: string
  }
  export interface Task {
    taskId?: string
    parentId?: string
    taskName?: string
    taskDescribe?: string
    executorId?: string
    executorName?: string
    groupId?: string
    projectId?: string
    weight?: number
    priority?: string
    status?: number
    taskCreateTime?: string
    taskStartime?: string
    taskEndTime?: string
    taskType?: number
    taskCompletetime?: string
  }
  export interface TaskPoolInfo {
    groupTaskId?: string
    groupId?: string
    taskId?: string
  }
}

export namespace BarSide {
  export interface Operation {
    readonly id: string
    readonly path: string
    readonly name: string
    readonly icon: any
  }
  export interface DropDown {
    id: string
    label: String
    options: Array<DropdownOption>
  }
  export interface Button {
    id: string
    description: string
    icon: Component
    callback: Function
  }
}

export namespace Result {
  export interface SelectResult<T = any> {
    type: string
    value: T
  }

  export interface CreateTaskCheckResult {
    name: string
    priority: number
    weight: number
    startTime: Date
    endTime: Date
    select: SelectResult<number>
  }

  export interface Result<SUCCESS = boolean, T = null> {
    success: SUCCESS
    data: T
  }
}
