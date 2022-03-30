<template>
  <n-space justify="space-around">
    <div>
      <n-progress
        class="progressCircle"
        type="circle"
        status="success"
        :stroke-width="10"
        :percentage="50"
        :rail-color="changeColor(themeVars.successColor, { alpha: 0.2 })"
        style="width: 100px"
      >
        <span>50%</span>
      </n-progress>
      <span class="spanDescription"> 任务完成率 </span>
    </div>
    <div>
      <n-progress
        class="progressCircle"
        type="circle"
        status="warning"
        :stroke-width="10"
        :percentage="50"
        :rail-color="changeColor(themeVars.warningColor, { alpha: 0.2 })"
        style="width: 100px"
      >
        <span>50%</span>
      </n-progress>
      <span class="spanDescription"> 任务超时率 </span>
    </div>
    <div>
      <n-progress
        class="progressCircle"
        type="circle"
        status="default"
        :stroke-width="10"
        :rail-color="changeColor(themeVars.infoColor, { alpha: 0.2 })"
        :percentage="50"
        style="width: 100px"
      >
        <span>50%</span>
      </n-progress>
      <span class="spanDescription"> 任务未完成率 </span>
    </div>
  </n-space>
</template>

<script setup lang="ts">
import { changeColor } from 'seemly'
import { useThemeVars } from 'naive-ui'
const themeVars = useThemeVars()
</script>

<style lang="scss">
.progressCircle {
  display: block;
}
.spanDescription {
  display: inline-block;
  width: 100%;
  text-align: center;
}
</style>
