<template>
  <n-select
    placeholder="请选择年份"
    style="width: 200px; float: right; margin-right: 20px; margin-top: 40px; z-index: 1000"
    v-model:value="optionYear"
    size="medium"
    :options="options"
    clearable
    @update:value="drawChart"
  />
  <div ref="checktable" :style="{ width: '100%', height: '350px' }"></div>
</template>

<script setup lang="ts">
import * as Echarts from 'echarts'
import { defineProps, ref, onMounted, defineEmits, watch } from 'vue'
const options = [
  {
    label: '2021',
    value: '2021'
  },
  {
    label: '2022',
    value: '2022'
  },
  {
    label: '2023',
    value: '2023'
  },
  {
    label: '2024',
    value: '2024'
  },
  {
    label: '2025',
    value: '2025'
  }
]
const props = defineProps({
  option: {
    type: Object
  }
})
const optionYear = ref(new Date().getFullYear())
const checktable = ref()
const Emits = defineEmits(['getYearSignOutTable'])
const drawChart = () => {
  console.log('1')
  if (optionYear.value !== new Date().getFullYear()) {
    Emits('getYearSignOutTable', optionYear.value)
  }
  console.log(myData.value)
  if (myData.value && checktable.value) {
    const Chart = Echarts.init(checktable.value)
    Chart.setOption(myData.value)
    console.log(Chart)
    window.addEventListener('resize', () => {
      Chart.resize()
    })
  }
}
const myData = ref()
watch(
  myData,
  (v, o) => {
    console.log(v, o)
    if (v && o) {
      console.log('你来啊')
      drawChart()
    }
  },
  { immediate: true, deep: true }
)
watch(
  () => props.option,
  (newV) => {
    if (newV) {
      console.log('来了吗大哥')
      console.log(myData.value)
      myData.value = newV
      console.log(myData.value)
    }
  },
  { immediate: true, deep: true }
)
</script>
<style>
.checktable {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
