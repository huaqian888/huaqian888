<template>
  <n-modal
    v-model:show="showModal"
    preset="dialog"
    :title="text"
    type="success"
    :mask-closable="false"
    negative-text="取消"
    positive-text="创建"
    :on-positive-click="creatGroup"
    :on-negative-click="closeModel"
    :on-close="closeModel"
  >
    <div class="creat-peoject">
      <n-space style="margin-top: 20px" :size="[0, 20]">
        <n-input
          v-model:value="updateGroup.groupName"
          type="text"
          :placeholder="'小组名'"
          size="medium"
          style="width: 380px"
          maxlength="30"
          clearable
        >
          <template #prefix>
            <n-icon>
              <Rename16Filled />
            </n-icon>
          </template>
        </n-input>
        <n-select
          v-model:value="updateGroup.groupLead"
          size="medium"
          :disabled="text == '修改小组'"
          placeholder="小组组长"
          style="width: 380px"
          :options="props.userOptions"
          clearable
          filterable
        />
        <n-select
          style="width: 380px"
          v-model:value="updateGroup.groupMembers"
          placeholder="请选择成员"
          :options="props.userOptions"
          multiple
        ></n-select>
      </n-space>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { NAvatar, NTag, SelectOption } from 'naive-ui'
import { Rename16Filled } from '@vicons/fluent'
import { defineProps, defineEmits, ref, watch, toRef, PropType, h, VNodeChild } from 'vue'
import { Entity } from '../../../global'
interface GroupInfo extends Entity.Group {
  groupParentId?: string
  groupName?: string
  groupMembers?: Array<string> | Array<Entity.Account>
  groupLead?: string
}
const props = defineProps({
  showFlag: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object as PropType<GroupInfo>,
    default: () => {
      return {}
    }
  },
  userOptions: {
    type: Array as PropType<Array<SelectOption>>
  },
  text: {
    type: String,
    default: '创建小组'
  }
})
const Emits = defineEmits(['update:showFlag', 'creatGroup'])
// showFlag是只读类型,通过toRef,将Ref类型的showMiddel与showFlag进行关联,方便监听父组件的值变动
const showMiddel = toRef(props, 'showFlag')
watch(showMiddel, (newV, oldV) => {
  showModal.value = newV
})
// 因为showMiddel与showFlag联动,但是showFlag为只读属性,不可修改,所以通过showModal来监听组件n-model的变化
const showModal = ref(false)
// 监听showMiddel的变化修改showModal, showWatch是解除监听的句柄
const updateGroup = ref<GroupInfo>({})
const closeModel = () => {
  updateGroup.value = {}
  Emits('update:showFlag', false)
}
const creatGroup = () => {
  Emits('creatGroup', updateGroup.value)
  closeModel()
}
// type RenderTag = {
//   option: SelectOption
//   handleClose: Function
// }
// const renderTag = function ({ option, handleClose }: RenderTag): VNodeChild {
//   return h(
//     NTag,
//     {
//       round: true,
//       closable: true,
//       onClose: (e: any) => {
//         e.stopPropagation()
//         handleClose()
//       }
//     },
//     {
//       default: () => option.label,
//       avatar: () => {
//         return h(NAvatar, {
//           src: option.imgUrl
//         })
//       }
//     }
//   )
// }
</script>

<style></style>
