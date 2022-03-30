<template>
  <n-modal
    style="width: 900px"
    v-model:show="showModel"
    :mask-closable="false"
    preset="dialog"
    :title="text"
    negative-text="取消"
    positive-text="确定"
    @positive-click="ensure"
    @negative-click="closeModel"
    :on-after-leave="closeModel"
  >
    <div class="creat-peoject">
      <n-space style="margin-top: 20px" :size="[0, 20]" justify="center">
      <!-- 修改项目名字 -->
        <n-input
          v-model:value="updateInfo.projectName"
          type="text"
          :placeholder="'项目名'"
          size="medium"
          style="width: 800px"
          maxlength="30"
          clearable
        >
          <template #prefix>
            <n-icon>
              <AppFolder24Filled />
            </n-icon>
          </template>
        </n-input>
        <!-- 修改项目负责人(非特殊情况一般不会改) -->
        <n-select
          v-model:value="updateInfo.projectLeadId"
          v-if="!update"
          size="medium"
          placeholder="请选择负责人"
          style="width: 800px"
          :options="props.leaderList"
          :disabled="props.update"
          clearable
          filterable
        />
        <!-- 修改项目状态 -->
        <n-select
          v-show="update"
          v-model:value="updateInfo.projectStatus"
          size="medium"
          placeholder="请修改状态"
          style="width: 800px"
          :options="stateList"
          clearable
          filterable
        />
        <!-- 修改项目成员(非特殊情况一般不会改) -->
        <n-select
          v-if="!update"
          style="width: 800px"
          v-model:value="updateInfo.projectMembers"
          placeholder="请选择成员"
          :options="props.userList"
          multiple
          filterable
        ></n-select>
        <MarkDown height="300px" width="800px" ref="content"></MarkDown>
      </n-space>
    </div>

  </n-modal>
</template>

<script setup lang="ts">
import { NAvatar, NTag, SelectOption } from 'naive-ui'
import { AppFolder24Filled } from '@vicons/fluent'
import { defineProps, defineEmits, onMounted, ref, watch, PropType, h } from 'vue'
import MarkDown from '../commons/MarkDown.vue'
import { Entity } from '../../../global'
interface ProjectInfo extends Entity.Project {
  projectLeadId?: string
  projectLeadName?: string
  projectMembers?: Array<string> | Array<Entity.Account>
  projectTasks?: Array<string>
  projectName?: string
  projectStatus?: string | number
}
const props = defineProps({
  showFlag: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: '创建项目'
  },
  projectGroup: {
    type: Object as PropType<ProjectInfo>
  },
  userList: {
    type: Array as PropType<SelectOption[]>
  },
  leaderList: {
    type: Array as PropType<SelectOption[]>
  },
  update: {
    type: Boolean,
    default: false
  }
})
const Emits = defineEmits(['update:showFlag', 'creatProject', 'updateProject'])
onMounted(() => {
  watch(
    () => {
      return props.showFlag
    },
    (newV, oldV) => {
      showModel.value = newV
    }
  )
})

const showModel = ref(false)
const content = ref()
const updateInfo = ref<ProjectInfo>({})
const stateList = [
  {
    value: 1,
    label: '已完成'
  },
  {
    value: 0,
    label: '执行中'
  }
]
const closeModel = () => {
  updateInfo.value = {}
  Emits('update:showFlag', false)
}
const ensure = () => {
  updateInfo.value.projectDescribe = content.value.getContext()
  updateInfo.value.projectGroup =  props.projectGroup!.projectId
  console.log(updateInfo.value);
  
  
  if (props.text === '修改项目') {
    Emits('updateProject', updateInfo.value)
  } else {
    Emits('creatProject', updateInfo.value)
  }
  closeModel()
}
type RenderTag = {
  option: SelectOption
  handleClose: Function
}
const renderTag = function ({ option, handleClose }: RenderTag) {
  return h(
    NTag,
    {
      round: true,
      closable: true,
      onClose: (e: any) => {
        e.stopPropagation()
        handleClose()
      }
    },
    {
      default: () => option.label,
      avatar: () => {
        return h( NAvatar, {
          src: option.imgUrl
        })
      }
    }
  )
}
</script>

<style></style>
