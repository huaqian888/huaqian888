<template>
  <n-modal
    v-model:show="showModal"
    preset="dialog"
    title="添加成员"
    type="success"
    :mask-closable="false"
    negative-text="取消"
    positive-text="确定"
    :on-positive-click="ensure"
    :on-negative-click="closeModel"
    :on-close="closeModel"
  >
    <div class="creat-peoject">
      <n-space style="margin-top: 20px" :size="[0, 20]">
        <n-select
          style="width: 380px"
          v-model:value="selectOptions"
          placeholder="请选择新增成员"
          :options="props.userOptions"
          :render-tag="renderTag"
          multiple
        ></n-select>
      </n-space>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { NAvatar, NTag, SelectOption } from 'naive-ui'
import { defineProps, defineEmits, ref, watch, PropType, h, VNodeChild, onMounted } from 'vue'
import { Entity } from '../../../global'
const props = defineProps({
  showFlag: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object as PropType<Entity.Account[]>,
    default: () => {
      return []
    }
  },
  userOptions: {
    type: Array as PropType<Array<SelectOption>>
  }
})
onMounted(() => {
  watch(
    () => {
      return props.showFlag
    },
    (newV) => {
      showModal.value = newV
    }
  )
  watch(
    () => {
      return props.data
    },
    (newV) => {
      newV.forEach((v) => {
        selectOptions.value?.push(v.userId!)
      })
    }
  )
})
const Emits = defineEmits(['update:showFlag', 'update:data', 'addMembers', 'closeModal'])
const showModal = ref(false)
const selectOptions = ref<Array<string>>([])
type RenderTag = {
  option: SelectOption
  handleClose: Function
}
const closeModel = () => {
  selectOptions.value = []
  Emits('update:showFlag', false)
}
const ensure = () => {
  Emits('addMembers', selectOptions.value)
  closeModel()
}
const renderTag = function ({ option, handleClose }: RenderTag): VNodeChild {
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
        return h(NAvatar, {
          src: option.imgUrl
        })
      }
    }
  )
}
</script>

<style></style>
