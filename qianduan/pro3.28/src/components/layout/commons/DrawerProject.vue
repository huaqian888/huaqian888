<template>
  <n-drawer :show="showFlag" :width="width" :placement="showPlace" :on-mask-click="close">
    <n-drawer-content>
      <slot></slot>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, onMounted, reactive, Ref, ref } from 'vue'
const props = defineProps({
  showFlag: {
    type: Boolean,
    default: false
  },
  width: {
    type: String,
    default: '50%'
  },
  showPlace: {
    type: String,
    default: 'right'
  }
})
const Emits = defineEmits(['update:showFlag'])
const close = () => {
  Emits('update:showFlag', false)
}
</script>

<style></style>
