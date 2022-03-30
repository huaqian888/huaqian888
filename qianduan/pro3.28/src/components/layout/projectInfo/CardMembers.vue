<template>
  <n-card title="title" class="card-info" size="medium" content-style="min-height: 300px">
    <template #header>
      <div class="header">{{ title }}</div>
      <n-icon size="20" style="margin-left: 20px; vertical-align: middle">
        <Autosum24Filled />
      </n-icon>
      <span style="font-size: 0.8em; vertical-align: middle">
        总数: <n-number-animation :from="0" :to="props.data?.length" />
      </span>
    </template>
    <template #header-extra>
      <n-button size="medium" @click="addClick" :bordered="false" text>
        <template #icon>
          <n-icon size="20">
            <AddCircle32Filled />
          </n-icon>
        </template>
      </n-button>
    </template>
    <template #default>
      <n-scrollbar style="max-height: 250px">
        <ButtonAvatar
          v-for="(item, index) in data"
          :key="index"
          :text="item.userName"
          :text-size="'1.2em'"
          :avatar-size="'25px'"
          :avatar="true"
          round
          style="margin: 5px 5px"
        ></ButtonAvatar>
      </n-scrollbar>
    </template>
    <template #footer></template>
    <template #action></template>
  </n-card>
</template>

<script setup lang="ts">
import { defineProps, PropType, defineEmits } from 'vue'
import { Autosum24Filled, AddCircle32Filled } from '@vicons/fluent'
import { Entity } from '../../../global'
import ButtonAvatar from '../commons/ButtonAvatar.vue'
const props = defineProps({
  title: String,
  data: {
    type: Array as PropType<Array<Entity.Account>>,
    default: () => {
      return [
        {
          uesrId: '',
          userName: ''
        }
      ]
    }
  },
  size: {
    type: String,
    default: '300px'
  }
})
const Emits = defineEmits(['addClick'])
const addClick = () => {
  Emits('addClick')
}
</script>

<style scoped lang="scss">
@import '@/style/variable/TheView.scss';
.card-info {
  display: inline-block;
  vertical-align: top;
  width: v-bind(size);
  margin-right: 10px;
}
.header {
  display: inline;
  height: 30px;
  background-color: $CardProjectInfoTitleBg;
}
.span-text {
  vertical-align: top;
  padding-left: 5px;
}
</style>
