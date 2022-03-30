<template>
  <n-thing>
    <template #header> {{ props.title }} </template>
    <ShowMarkDown :context="props.descriptionData"></ShowMarkDown>
  </n-thing>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import ShowMarkDown from '../commons/ShowMarkDown.vue'
const props = defineProps({
  title: {
    type: String,
    default: '项目描述'
  },
  descriptionData: {
    type: String,
    default: ''
  }
})
</script>

<style></style>
