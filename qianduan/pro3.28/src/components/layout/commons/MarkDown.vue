<template>
  <div ref="vditor"></div>
</template>

<script lang="ts">
import Vditor from 'vditor'
import { defineComponent } from 'vue'
import ShowMarkDown from './ShowMarkDown.vue'

const vditor: Vditor | null = null
export default defineComponent({
  props: {
    height: {
      type: String,
      default: 'auto'
    },
    minHeight: {
      type: Number,
      default: 0
    },
    width: {
      type: String,
      default: 'auto'
    },
    outline: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ShowMarkDown
  },
  data() {
    return {
      vditor: vditor
    }
  },
  mounted() {
    this.vditor = new Vditor(this.$refs.vditor as HTMLElement, {
      // 宽高
      height: this.height,
      minHeight: this.minHeight,
      width: this.width,

      toolbarConfig: {
        pin: true
      },
      // 字数统计
      counter: {
        enable: true
      },
      cache: {
        enable: false
      },
      // 上传
      upload: {
        url: `${import.meta.env.VITE_APP_SERVER_FILE}/file/fileIn`,
        fieldName: 'multipartFiles',
        format: (files: File[], responseText: string): string => {
          const data = JSON.parse(responseText)
          if (data.code === 200) {
            const succMap = {}
            succMap[`${files[0].name}`] = `${import.meta.env.VITE_APP_SERVER_FILE}/${data.data[0]}`
            return JSON.stringify({
              code: 200,
              message: '',
              data: {
                errFiles: [],
                succMap: succMap
              }
            })
          } else {
            return JSON.stringify({
              code: 444,
              message: '保存错误',
              data: {
                errFiles: [`${files[0].name}`],
                succMap: {}
              }
            })
          }
        }
      },
      // 大纲，偏左
      outline: {
        enable: this.outline,
        position: 'left'
      }
    })
  },
  methods: {
    getHtml(): string {
      return this.vditor?.getHTML() as string
    },
    setContext(context: string) {
      this.vditor?.setValue(context)
    },
    getContext(): string {
      return this.vditor?.getValue() as string
    }
  }
})
</script>

<style>
@import 'vditor/dist/index.css';
</style>
