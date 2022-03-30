<template>
  <n-card size="medium" hoverable>
    <template #header>
      <n-tag type="default" size="large" :bordered="false" :color="{ color: 'rgb(0, 0, 0, 0)' }">
        <n-ellipsis style="max-width: 200px; font-size: 1.2em; font-weight: bolder">
          {{ props.dataInfo.taskName }}
        </n-ellipsis>
      </n-tag>
      <span class="weight-c"> {{ props.dataInfo.weight }} </span>
    </template>
    <template #header-extra>
      <n-tag type="info" round> {{ statusComputed }} </n-tag>
    </template>
    <n-time
      class="time-c"
      :time="moment(props.dataInfo.taskStartime).toDate()"
      format="yyyy-MM-dd hh:mm"
    />
    <span>至</span>
    <n-time
      class="time-c"
      :time="moment(props.dataInfo.taskEndTime).toDate()"
      format="yyyy-MM-dd hh:mm"
    />
  </n-card>
</template>

<script setup lang="ts">
import { computed, defineProps, PropType } from 'vue'
import { Entity } from '../../../global'
import moment from 'moment'
const props = defineProps({
  dataInfo: {
    type: Object as PropType<Entity.Task>,
    default: () => {}
  }
})
const statusComputed = computed(() => {
  return props.dataInfo.status === 0 ? '进行中' : '已完成'
})
</script>

<style lang="scss">
.time-c {
  font-family: Arial, Helvetica, sans-serif;
}
.weight-c {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  min-width: 30px;
  border-radius: 15px;
  text-align: center;
  font-family: Helvetica, sans-serif;
  background-color: rgb(202, 226, 218);
}
</style>
