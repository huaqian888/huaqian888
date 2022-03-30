<template>
  <n-grid x-gap="12" y-gap="12" cols="1 840:2 1260:3 1680:4">
    <n-gi v-for="(item, index) in data" :key="index">
      <task-card
        :tools="tools"
        @add-click="(value) => forwardEmit('addClick')(value)"
        @edit-click="(value) => forwardEmit('editClick')(value)"
        @delete-click="(value) => forwardEmit('deleteClick')(value)"
      />
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import TaskCard from './TaskCard.vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  tools: {
    type: String,
    default: 'add,edit,delete'
  },
  data: {
    type: Array,
    default: () => {
      return [{}, {}, {}, {}]
    }
  }
})

const emits = defineEmits(['addClick', 'editClick', 'deleteClick'])

function forwardEmit(name: string) {
  return (value) => {
    emits(name, value)
  }
}
</script>

<style scoped></style>
