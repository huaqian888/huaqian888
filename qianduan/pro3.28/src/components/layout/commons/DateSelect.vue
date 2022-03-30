<template>
  <span class="divide-equally-width">
    <n-select v-model:value="date.year" :options="getNumberOptions(0, yearLength)" />
  </span>
  <span class="divide-equally-width">
    <n-select v-model:value="date.month" :options="getNumberOptions(0, 12)" />
  </span>
  <span class="divide-equally-width">
    <n-select v-model:value="date.day" :options="getNumberOptions(0, 30)" />
  </span>
  <span class="divide-equally-width">
    <n-select v-model:value="date.hour" :options="getNumberOptions(0, 24)" />
  </span>
  <span class="divide-equally-width">
    <n-select v-model:value="date.minute" :options="getNumberOptions(0, 60)" />
  </span>
  <span class="divide-equally-width">
    <n-select v-model:value="date.second" :options="getNumberOptions(0, 60)" />
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  yearLength: {
    type: Number,
    default: 101
  }
})

const date = ref({
  year: 0,
  month: 0,
  day: 0,
  hour: 0,
  minute: 0,
  second: 0
})

function getNumberOptions(start: number, end: number) {
  return Array.apply(null, { length: end - start }).map((_, i) => ({
    label: String(i),
    value: i + start
  }))
}

const width = `${(100.0 / 6).toString()}%`

function getDate() {
  return date.value
}

defineExpose({
  getDate
})
</script>

<style scoped>
.divide-equally-width {
  display: inline-block;
  width: v-bind(width);
}
</style>
