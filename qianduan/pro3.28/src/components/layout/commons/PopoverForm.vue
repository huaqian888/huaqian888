<template>
  <n-popover trigger="click" :width="150" placement="bottom" shift>
  
    <template #trigger>
      <n-button class="button-c" :type="props.buttonType" :ghost="props.ghost" @click="handleClick">
        {{ props.title }}
        <template #icon>
          <n-icon>
            <component :is="props.iconCompont" />
          </n-icon>
        </template>
      </n-button>
    </template>
    <!-- 下拉框类型 -->
    <n-select
      v-model:value="selectValue"
      :options="props.options"
      :placeholder="'请选择' + props.title"
      v-show="typeComputed('select')"
      @update:value="handleSelectValue"
    />
    <!-- 权重点击类型 -->
    <n-input
      v-model:value="selectValue"
      type="number"
      v-show="typeComputed('input')"
      :placeholder="'请输入' + props.title"
      size="medium"
      :maxlength="20"
      clearable
      @change="handleSelectValue"
    ></n-input>
    <!-- 选择时间类型 -->
    <n-date-picker
      v-model:value="selectValues"
      type="datetimerange"
      size="medium"
      v-show="typeComputed('datetimerange')"
      @update:value="handleSelectValues"
    >
    </n-date-picker>

  </n-popover>
</template>

<script setup lang="ts">
import { SelectOption } from 'naive-ui'
import { PropType, ref, defineProps, defineEmits, Component as defineComponent, inject } from 'vue'
import { BrandInstagram as statues } from '@vicons/tabler'
import { API } from '../../../model';
const props = defineProps({
  options: {
    type: Array as PropType<SelectOption[]>,
    default: () => {
      return [
        {
          value: '0',
          label: '进行中'
        },
        {
          value: '1',
          label: '已完成'
        }
      ]
    }
  },
  value: {
    type: String,
    default: '0'
  },
  values: {
    type: Array,
    default: () => []
  },
  type: {
    type: String,
    default: 'select'
  },
  buttonType: {
    type: String,
    default: 'default'
  },
  title: {
    type: String,
    default: '标题'
  },
  iconCompont: {
    type: Object as PropType<defineComponent>,
    default: () => statues
  },
  ghost: {
    type: Boolean,
    default: false
  }
})
const Api = inject<API.API>('$api')!
const Emits = defineEmits(['update:value', 'update:values', 'buttonClick'])
const selectValue = ref(props.value)
const selectValues = ref<Array<string>>()
const handleSelectValue = (value: string, option: object) => {
  Emits('update:value', value)
}
const handleSelectValues = (values: []) => {
  Emits('update:values', values)
}
const typeComputed = (type: string) => {
  if (props.type === type) {
    return true
  } else {
    return false
  }
}
const handleClick = () => {
  Emits('buttonClick')
}
</script>

<style scoped lang="scss">
.button-c {
  width: 130px;
  padding-left: 10px;
  justify-content: start;
}
</style>
