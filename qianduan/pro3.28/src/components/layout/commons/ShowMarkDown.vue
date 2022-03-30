<template>
  <div ref="vditor"></div>
</template>

<script lang="ts">
import Vditor from 'vditor'
import { defineComponent,ref } from 'vue'
export default defineComponent({
  props: {
    context: {
      type: String,
      default: ''
    }
  },
  watch: {
    context(newValue, oldValue) {
      this.setContext(newValue)
    }
  },
  mounted() {},
  methods: {
    setContext(context: string) {
      Vditor.preview(this.$refs.vditor as HTMLDivElement, context, {
        mode: 'light'
      })
    }
  }
})
</script>

<style>
@import 'vditor/dist/index.css';
</style>
