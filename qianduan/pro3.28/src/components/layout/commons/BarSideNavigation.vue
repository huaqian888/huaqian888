<template>
  <div class="BarSideNavigation">
    <n-space vertical :align="'center'">
      <ButtonBarSide
        v-for="(item, index) in ProjectsOperation"
        :key="index"
        v-show="store.showSideOperationFlag"
        @click="pushView(item.path)"
      >
        <template #icon>
          <component :is="item.icon"></component>
        </template>
        <template #name>
          <span class="name-style">{{ item.name }}</span>
        </template>
      </ButtonBarSide>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import ButtonBarSide from './ButtonBarSide.vue'
import { BarSide } from '../../../global'
import { useRouter } from 'vue-router'
import { Store } from '../../../stores'
const store = Store()
const props = defineProps({
  width: String,
  ProjectsOperation: Array as PropType<Array<BarSide.Operation>>
})
const Router = useRouter()
const pushView = (path: string) => {
  Router.push(path)
}
</script>

<style lang="scss">
@import '@/style/variable/BarSideNavigationcolor.scss';
.BarSideNavigation {
  min-height: 945px;
  height: 100%;
  width: v-bind(width);
  background-color: $BarSideNavigationBg;
  .name-style {
    font-weight: bolder;
  }
}
</style>
