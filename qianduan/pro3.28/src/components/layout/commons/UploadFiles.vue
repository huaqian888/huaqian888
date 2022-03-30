<template>
  <n-upload
    action="https://123.cn"
    v-model:file-list="fileList"
    @change="handleUploadChange"
    @remove="handleRemove"
  >
    <n-upload-dragger style="width: inherit">
      <div :style="{ 'margin-bottom': '12px', width: props.width }">
        <n-icon size="48" :depth="3">
          <archive-icon />
        </n-icon>
      </div>
      <n-text style="font-size: 16px">点击或者拖动文件到该区域来上传</n-text>
    </n-upload-dragger>
  </n-upload>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { Archive16Filled as archiveIcon } from '@vicons/fluent'
const props = defineProps({
  width: {
    type: String,
    default: 'auto'
  }
})
const fileList = ref([])
const handleUploadChange = () => {}
const handleRemove = () => {}
</script>

<style lang="scss"></style>
