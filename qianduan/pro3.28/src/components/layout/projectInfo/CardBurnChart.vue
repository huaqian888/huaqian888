<template>
  <div ref="burnCharts" :style="{ width: '960px', height: '320px', display: 'inline-table' }"></div>
</template>

<script setup lang="ts">
import * as Echarts from 'echarts'
import { defineProps, defineEmits, ref, onMounted } from 'vue'
const props = defineProps({
  option: {
    type: Object,
    default: () => {
      return {
        title: {
          text: '燃尽图'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Email', 'Union Ads']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      }
    }
  }
})
const burnCharts = ref()
const drawChart = () => {
  const Chart = Echarts.init(burnCharts.value)
  Chart.setOption(props.option)
  window.addEventListener('resize', () => {
    Chart.resize()
  })
}
onMounted(() => {
  drawChart()
})
</script>

<style>
.d {
  display: inline-table;
}
</style>
