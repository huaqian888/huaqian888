<template>
  <div class="Checks">
    <div class="operations">
      <n-input-group style="width: inherit">
        <n-input
          v-model:value="search"
          type="text"
          placeholder="请输入审核的任务名"
          size="medium"
          style="min-width: 10%"
          :maxlength="20"
          clearable
        ></n-input>
        <n-button type="info" :bordered="false" secondary>搜索</n-button>
      </n-input-group>
    </div>
    <div class="main">
      <n-data-table
        :columns="columns"
        :data="data"
        :pagination="pagination"
        :row-props="rowProps"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { DataTableColumn } from 'naive-ui'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import moment from 'moment'
interface DataOption {
  number: String
  project: String
  submitTime: String
  operation: String
}
onMounted(() => {
  updateDate()
  console.log(data.value.length)
})
const Router = useRouter()
const search = ref('')
const columns: DataTableColumn[] = [
  {
    key: 'number',
    title: '评审编号',
    align: 'center'
  },
  {
    key: 'project',
    title: '关联任务',
    align: 'center'
  },
  {
    key: 'submitTime',
    title: '提交时间',
    align: 'center'
  },
  {
    key: 'operation',
    title: '操作',
    align: 'center'
  }
]
const data = ref<DataOption[]>([])
const updateDate = () => {
  const item: DataOption[] = data.value
  const number = pagination.pageSize * (item.length === 0 ? 2 : 1) + item.length
  for (let i = item.length; i < number; i++) {
    item.push({
      number: i + '',
      project: '项目' + i,
      submitTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      operation: '评审'
    })
  }
  data.value = item
}
const pagination = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 15, 20],
  onChange: (page: number) => {
    if (data.value.length - page * pagination.pageSize <= 0) {
      console.log(data.value.length - page * pagination.pageSize)
      updateDate()
    }
    pagination.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    if (data.value.length - pagination.page * pageSize <= 0) {
      updateDate()
    }
    pagination.page = 1
  }
})
const rowProps = (row: DataOption) => {
  return {
    onclick: () => {
      Router.push({
        path: '/CheckReport',
        query: {
          id: row.number + ''
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/style/common/ViewSize.scss';
@import '@/style/variable/TheView.scss';
.Checks {
  min-height: 700px;
  max-height: 100%;
  width: $Width;
  max-width: $MaxWidth;
  background-color: $TheProjectsBg;
  padding-top: 1px;
  display: inline-table;
  .operations {
    background-color: white;
    margin: 10px;
  }
  .main {
    width: 99%;
    border-radius: 10px;
    margin: 10px auto;
  }
}
</style>
