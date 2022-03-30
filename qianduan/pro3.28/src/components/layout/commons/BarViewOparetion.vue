<template>
  <n-space>
    <n-button
      v-for="(item, index) in buttonOptions"
      :key="index"
      attr-type="reset"
      :bordered="false"
      strong
      ghost
      @click="ButtonClick(item)"
    >
      <template #icon>
        <n-icon>
          <component :is="item.icon"></component>
        </n-icon>
      </template>
      {{ item.description }}
    </n-button>
    <n-dropdown
      v-for="(item, index) in dropdownOptions"
      :key="index"
      trigger="hover"
      @select="(key: string) => DropDownClick(key, index)"
      :options="item.options"
    >
      <n-button :keyboard="false" :bordered="false">{{ item.label }}</n-button>
    </n-dropdown>
  </n-space>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType } from 'vue'
import { BarSide } from '../../../global'
defineProps({
  buttonOptions: Array as PropType<BarSide.Button[]>,
  dropdownOptions: Array as PropType<BarSide.DropDown[]>
})
const emits = defineEmits(['buttonClick', 'dropDownClick'])

const ButtonClick = (item: BarSide.Button | number) => {
  
  emits('buttonClick', item)
}
const DropDownClick = (key: string, index: number) => {
  
  emits('dropDownClick', { id: index, optionKey: key })
}
</script>

<style></style>
