<template>
  <n-upload
    name="multipartFiles"
    :default-file-list="fileList"
    :show-download-button="showDownload"
    :show-remove-button="uploadButtonText != ''"
    @download="download"
    :custom-request="uploadFile"
    multiple
  >
    <div v-if="uploadButtonText !== ''">
      <n-button>{{ uploadButtonText }}</n-button>
    </div>
  </n-upload>
</template>

<script lang="ts">
import { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui'
import { FileInfo } from 'naive-ui/lib/upload/src/interface'
import { PropType, defineComponent } from 'vue'
import Download from 'downloadjs'

export default defineComponent({
  props: {
    // 上传
    uploadButtonText: {
      type: String,
      default: ''
    },
    // 展示
    fileList: {
      type: Array as PropType<Array<UploadFileInfo>>,
      default: () => {
        return []
      }
    },
    // 下载
    showDownload: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    // 下载
    download(file: FileInfo) {
      Download(file.url!, file.name, file.type!)
    },
    // 上传文件
    async uploadFile(options: UploadCustomRequestOptions) {
      const fromdata = new FormData()
      fromdata.append('multipartFiles', options.file.file as File)

      options.file.status = 'uploading'

      const data = await this.$api.filein(fromdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (data?.code === 200) {
        options.file.status = 'finished'
      } else {
        options.file.status = 'error'
      }
    }
  }
})
</script>
