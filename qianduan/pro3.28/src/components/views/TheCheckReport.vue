<template>
  <div class="CheckReport">
    <div class="left-c">
      <div style="margin: 15px">
        <span>关联任务：</span>
        <n-tag type="info" size="medium">
          <n-ellipsis style="width: 185px">
            项目一下萨菲航空很快受到法国说的话公司控股和
          </n-ellipsis>
        </n-tag>
      </div>
      <n-upload abstract action="#" :default-file-list="fileList">
        <n-card
          title="附件列表"
          size="small"
          class="file-card"
          content-style="max-height: 300px; overflow-y: auto"
        >
          <n-upload-file-list />
        </n-card>
      </n-upload>
    </div>
    <div class="right-c">
      <CardProjectDescription title="报告"></CardProjectDescription>
    </div>
    <div class="main">
      <MarkDown :min-height="200" ref="content"></MarkDown>
    </div>
    <div class="opration-c">
      <n-button type="primary" size="medium" @click="submit">提交评审</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UploadFileInfo } from 'naive-ui'
import { ref } from 'vue'
import CardProjectDescription from '../layout/projectInfo/CardProjectDescription.vue'
import MarkDown from '../layout/commons/MarkDown.vue'
import { MessageUtil } from '../../utils/notice/notice'
const m = MessageUtil()
const fileList: UploadFileInfo[] = [
  {
    id: '1',
    name: 'file.doc',
    status: 'finished',
    type: 'text/plain',
    percentage: 100
  },
  {
    id: '2',
    name: 'file.doc',
    status: 'finished',
    type: 'text/plain',
    percentage: 100
  },
  {
    id: '3',
    name: 'file.doc',
    status: 'finished',
    type: 'text/plain',
    percentage: 100
  },
  {
    id: '4',
    name: 'file.doc',
    status: 'finished',
    type: 'text/plain',
    percentage: 100
  },
  {
    id: '5',
    name: 'file.doc',
    status: 'finished',
    type: 'text/plain',
    percentage: 100
  },
  {
    id: '6',
    name: 'file.doc',
    status: 'finished',
    type: 'text/plain',
    percentage: 100
  },
  {
    id: '7',
    name: 'file.doc',
    status: 'finished',
    type: 'text/plain',
    percentage: 100
  },
  {
    id: '8',
    name: 'file.doc',
    status: 'finished',
    type: 'text/plain',
    percentage: 100
  },
  {
    id: '9',
    name: 'file.doc',
    status: 'finished',
    type: 'text/plain',
    percentage: 100
  }
]
const content = ref()
const submit = () => {
  m.handleInfo('提交申请')
}
</script>

<style scoped lang="scss">
@import '@/style/common/ViewSize.scss';
@import '@/style/variable/TheView.scss';
.CheckReport {
  min-height: 700px;
  max-height: 100%;
  width: $Width;
  max-width: $MaxWidth;
  background-color: $TheProjectsBg;
  padding-top: 1px;
  display: inline-table;
}
.left-c {
  display: inline-block;
  width: 300px;
}
.file-card {
  margin-top: 12px;
  margin-left: 10px;
  font-size: 0.8em;
  font-family: 'Arial Narrow', Arial, sans-serif;
  border-radius: 10px;
  background-color: rgb(240, 238, 222);
}
.right-c {
  display: inline-block;
  height: 400px;
  width: calc(100% - 330px);
  overflow-y: auto;
  margin-top: 10px;
  margin-left: 20px;
  border-radius: 10px;
  vertical-align: top;
  background-color: rgb(238, 238, 241);
}
.opration-c {
  width: calc(100% - 10px);
  margin: 10px;
  display: flex;
  justify-content: center;
}
.main {
  padding: 10px;
  background-color: $TheProjectsBg;
}
</style>
