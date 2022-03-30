<template>
  <div class="ButtonBarSide">
    <n-icon class="button-icon" :size="size">
      <slot name="icon"></slot>
    </n-icon>
    <div class="button-name">
      <slot name="name"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  size: {
    type: String,
    default: '40px'
  },
  height: {
    type: String,
    default: '80px'
  },
  paddingTop: {
    type: String,
    default: '20px'
  },
  width: {
    type: String,
    default: '80px'
  }
})
</script>

<style lang="scss">
@import '@/style/variable/BarSideNavigationColor.scss';
.ButtonBarSide {
  display: inline-block;
  width: v-bind(width);
  min-height: v-bind(height);
  padding-top: v-bind(paddingTop);
  text-align: center;
  transition: background-color 1s;
  &:hover {
    background-color: rgb(220, 228, 228);
    .button-icon {
      animation: bounce;
      animation-duration: 1s;
    }
  }
  .button-project {
    display: inline-block;
    text-align: center;
    font-size: 40px;
  }
  .button-icon {
    display: inline-block;
    color: $BarSideButtonOnBg;
  }
  .button-name {
    display: inline-block;
    width: 100%;
    line-height: initial;
  }
}
</style>
