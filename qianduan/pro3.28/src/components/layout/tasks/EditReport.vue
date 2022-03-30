<template>
  <n-modal
    preset="dialog"
    title="报告"
    positive-text="提交"
    negative-text="取消"
    @positive-click="submitCallback"
    @negative-click="cancelCallback"
    :style="{ width: props.width }"
  >
    <MarkDown :min-height="200" ref="content"></MarkDown>
    <UploadFiles style="margin-top: 10px" :width="curWidth"></UploadFiles>
  </n-modal>
</template>

<script setup lang="ts">
import { defineProps, inject, onMounted, Ref, ref } from 'vue'
import { Entity } from '../../../global'
import { API } from '../../../model'
import { MessageUtil } from '../../../utils/notice/notice'
import MarkDown from '../commons/MarkDown.vue'
import UploadFiles from '../commons/UploadFiles.vue'
interface ProjectInfo extends Entity.Project {
  projectLeadId?: string
  projectLeadName?: string
  projectMembers?: Array<string> | Array<Entity.Account>
  projectTasks?: Array<string>
}
const Api = inject<API.API>('$api')!
// const projectInfo = inject<Ref<ProjectInfo>>('projectInfo')
const m = MessageUtil()
const props = defineProps({
  width: {
    type: String,
    default: 'auto'
  },
  taskId: {
    type: String,
    default: '-1'
  },
  endTime: {
    type: String,
    default: ''
  }
})
onMounted(() => {
  curWidth.value = (document.documentElement.clientWidth * parseInt(props.width)) / 100 - 104 + 'px'
})
const curWidth = ref('')
const content = ref()
const submitCallback = () => {
  Api.submitTaskReport({
    createTime: new Date().toUTCString,
    endTime: props.endTime,
    judgeUserId: projectInfo.value.projectLeadId,
    reportDescribe: content.value.getContext(),
    status: 0,
    taskId: props.taskId
  }).then((data) => {
    if (data!.code === 200) {
      m.handleInfo('报告提交成功')
    } else {
      m.handleError('报告提交失败')
    }
  })
}
const cancelCallback = () => {
  m.handleInfo('取消提交1111')
}
</script>

<style lang="scss"></style>
