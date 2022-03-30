<template>
  <div class="PersonCenter">
    <!-- 个人信息 -->
    <div class="PersonContent">
      <div class="Part1">
        <h2>基本信息</h2>
        <div class="PersonTitle">
          <img
            src="../../assets/logo.png"
            style="float: left; width: 143px; margin: 10px 0; border-radius: 50%; border: 1px solid"
          />
          <p>
            姓名:{{ UserInfor.userName }}
            <span class="updatePw">
              <n-button round strong secondary size="large" type="info" @click="updatePassWord">
                <span>
                  <strong>修改密码</strong>
                </span>
              </n-button>
            </span>
          </p>
          <p>学号:{{ UserInfor.userAccount }}</p>
          <p>电话:{{ UserInfor.userPhone === 'undefined' ? empty : UserInfor.userPhone }}</p>
        </div>
      </div>
      <!-- 每日考勤表 -->
      <div class="Part2">
        <div class="PersonTitle">
          <n-space vertical :size="12">
            <n-data-table
              :bordered="false"
              :columns="tableInfo.columns"
              :data="tableInfo.data"
              :pagination="tableInfo.pagination"
              :rowProps="tableInfo.rowProps"
            />
          </n-space>
        </div>
      </div>
      <!-- 全年打卡表 -->
      <div class="Part3">
        <div class="PersonSign">
          <CheckLogin @getYearSignOutTable="getYearSignOutTable" :option="myData"></CheckLogin>
        </div>
      </div>
    </div>
    <!-- 修改密码 -->
    <n-modal
      class="updatePassWord"
      v-model:show="updatePassword"
      preset="card"
      title="修改密码"
      style="width: 600px; line-height: 50px"
    >
      <n-input
        v-model:value="passWords.oldPassWord"
        type="password"
        placeholder="请输入原密码"
        size="medium"
        :maxlength="15"
        clearable
      ></n-input>
      <n-input
        v-model:value="passWords.newPassWord"
        type="password"
        placeholder="请输入新密码"
        size="medium"
        :maxlength="15"
        clearable
      ></n-input>
      <template #footer>
        <n-button type="error" size="medium" style="float: right" @click="cancelUpdate">取消</n-button>
        <n-button
          type="primary"
          size="medium"
          style="float: right; margin-right: 20px"
          @click="submitUpdate"
        >修改</n-button>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, reactive, ref } from 'vue'
import { API } from '../../model'
import { MessageUtil } from '../../utils/notice/notice'
import CheckLogin from './CheckLogin.vue'
interface clockIn {
  userAccount: string
  userName: string
  moringStatus: string
  noonStatus: string
  eveningStatus: string
}
const tableInfo = (function initTableInfo() {
  const rowProps = (row: { name: string }) => {
    return {
      style: 'cursor: pointer;',
      onClick: () => {
        messageSuccess(row.name, { duration: 1000 })
      }
    }
  }
  const columns = reactive([
    {
      title: '学号',
      key: 'userAccount'
    },
    {
      title: '姓名',
      key: 'userName'
    },
    {
      title: '上午打卡情况',
      key: 'moringStatus'
    },
    {
      title: '下午打卡情况',
      key: 'noonStatus'
    },
    {
      title: '晚上打卡情况',
      key: 'eveningStatus'
    }
  ])
  const data = reactive<clockIn[]>([
    {
      userAccount: '2020404130',
      userName: '刘毓凯',
      moringStatus: '打卡: 8:30,退卡: 12:00',
      noonStatus: '打卡: 8:30,退卡: 12:00',
      eveningStatus: '打卡: 8:30,退卡: 12:00'
    },
    {
      userAccount: '2020404130',
      userName: '刘毓凯',
      moringStatus: '打卡: 8:30,退卡: 12:00',
      noonStatus: '打卡: 8:30,退卡: 12:00',
      eveningStatus: '打卡: 8:30,退卡: 12:00'
    },
    {
      userAccount: '2020404130',
      userName: '刘毓凯',
      moringStatus: '打卡: 8:30,退卡: 12:00',
      noonStatus: '打卡: 8:30,退卡: 12:00',
      eveningStatus: '打卡: 8:30,退卡: 12:00'
    },
    {
      userAccount: '2020404130',
      userName: '刘毓凯',
      moringStatus: '打卡: 8:30,退卡: 12:00',
      noonStatus: '打卡: 8:30,退卡: 12:00',
      eveningStatus: '打卡: 8:30,退卡: 12:00'
    }
  ])
  const paginationReactive = reactive({
    page: 1,
    pageSize: 3,
    showSizePicker: true,
    pageSizes: [3, 5, 7],
    onChange: (page: number) => {
      paginationReactive.page = page
    },
    onUpdatePageSize: (pageSize: number) => {
      paginationReactive.pageSize = pageSize
      paginationReactive.page = 1
    }
  })
  return {
    columns,
    data,
    pagination: paginationReactive,
    rowProps
  }
})()
// const clockInDetail
const updatePassword = ref(false)
const updatePassWord = () => {
  updatePassword.value = !updatePassword.value
}
const UserInfor = reactive({
  userAccount: window.sessionStorage.getItem('userAccount'),
  userName: window.sessionStorage.getItem('userName'),
  userPhone: window.sessionStorage.getItem('userPhone')
})
const passWords = reactive({
  oldPassWord: '',
  newPassWord: ''
})
const cancelUpdate = () => {
  updatePassword.value = !updatePassword.value
}
const Api = inject<API.API>('$api')!
const messageSuccess = MessageUtil().handleSuccess
const messageError = MessageUtil().handleError
const userId = sessionStorage.getItem('userId')
const submitUpdate = async () => {
  await Api.updateUserPassword({
    userId: userId,
    userOldPassword: passWords.oldPassWord,
    userNewPassword: passWords.newPassWord
  }).then((data) => {
    if (data?.code === 200) {
      messageSuccess('修改成功', { duration: 1000 })
      cancelUpdate()
    } else {
      messageError('原密码错误', { duration: 1000 })
    }
  })
}
const myData = ref()
const year: string = new Date().getFullYear().toString()
const getYearSignOutTable = async (year: number) => {
  myData.value = null
  await Api.yearSignOutTable({ userId: userId, year: year }).then((data) => {
    if (data?.code === 200) {
      myData.value = data.data.eachDailySubmitTopicSum
      console.log(myData.value)
      year = data.data.contributeDate
    }
  })
}
const checkTableOption = ref({
  title: {
    top: 30,
    text: '打卡表',
    subtext: '一年内打卡情况',
    left: 'center',
    textStyle: {
      color: '#000'
    }
  },
  tooltip: {
    trigger: 'item',
    triggerOn: 'click',
    formatter: function (params: any) {
      let string
      if (params.data[1] === 0) {
        string = '未打卡'
        return params.data[0] + '<span style="color:red "> <br>' + string + '</span>'
      } else if (params.data[1] === 1) {
        string = '打卡不全'
        return params.data[0] + '<span style="color:orange "> <br>' + string + '</span>'
      } else {
        string = '打卡完全'
        return params.data[0] + '<span style="color:green "> <br>' + string + '</span>'
      }
    }
  },
  legend: {
    top: '40',
    left: '150',
    data: ['未打卡', '打卡不全', '打卡完全'],
    textStyle: {
      // 设置字体颜色
      color: '#000'
    }
  },
  calendar: [
    {
      top: 120,
      left: 'center',
      range: [year],
      splitLine: {
        show: true,
        lineStyle: {
          // 设置月份分割线的颜色
          color: '#D3D3D3',
          // color: 'red',
          width: 4,
          type: 'solid'
        }
      },
      yearLabel: { show: false },
      dayLabel: {
        nameMap: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], // 设置中文显示
        textStyle: {
          // 设置周显示颜色
          color: '#000'
        }
      },
      monthLabel: {
        nameMap: 'cn', // 设置中文显示
        textStyle: {
          // 设置月显示颜色
          color: '#000'
        }
      },
      itemStyle: {
        normal: {
          // 设置背景颜色
          color: '#ffffff',
          borderWidth: 1,
          // 设置方块分割线段颜色
          borderColor: '#D3D3D3'
        }
      }
    }
  ],
  series: [
    {
      name: '未打卡',
      type: 'scatter',
      coordinateSystem: 'calendar',
      data: myData.value,
      // 根据值设置原点大小
      symbolSize: function (val: any) {
        if (val[1] === 0) {
          return 15
        }
      },
      itemStyle: {
        normal: {
          // 设置圆点颜色
          color: 'red'
        }
      }
    },
    {
      name: '打卡不全',
      type: 'scatter',
      coordinateSystem: 'calendar',
      data: myData.value,
      // 根据值设置原点大小
      symbolSize: function (val: any) {
        if (val[1] !== 0 && val[1] < 4) {
          return 15
        }
      },
      itemStyle: {
        normal: {
          // 设置圆点颜色
          color: 'orange'
        }
      }
    },
    {
      name: '打卡完全',
      type: 'scatter',
      coordinateSystem: 'calendar',
      data: myData.value,
      // 根据值设置原点大小
      symbolSize: function (val: any) {
        if (val[1] === 4) {
          return 15
        }
      },
      itemStyle: {
        normal: {
          // 设置圆点颜色
          color: 'green'
        }
      }
    }
  ]
})
const empty = '无'
onMounted(() => {
  console.log('dio大')
  getYearSignOutTable(parseInt(year))
})
</script>

<style lang="scss">
@import "@/style/common/ViewSize.scss";
@import "@/style/variable/TheView.scss";
.PersonCenter {
  min-height: 700px;
  max-height: 100%;
  width: $Width;
  max-width: $MaxWidth;
  background-color: $TheProjectsBg;
  padding-top: 1px;
  // display: inline-table;
  display: flex;
  flex-direction: column;
  .PersonContent {
    width: 100%;
    display: flex;
    flex-direction: column;
    .Part1 {
      margin-left: 1%;
      .PersonTitle {
        font-weight: bold;
        color: #0d84b6;
        border-radius: 4px;
        h2 {
          font-weight: bold;
          color: #0d84b6;
          display: inline-block;
          font-size: 16px;
          text-align: left;
          padding: 0px 12px;
          height: 40px;
          line-height: 40px;
          // border: 1px solid #f8d19d;
          border-radius: 4px;
        }
        p {
          letter-spacing: 2px;
          padding: 10px;
          margin: 8px 0;
          // font-size: 20px;
          width: 400px;
          font-weight: 500;
          line-height: 11px;
          margin-left: 160px;
          margin-top: 30px;
        }
      }
    }
    .Part2 {
      display: flex;
      width: 100%;
      .PersonTitle {
        // flex: 1;
        font-weight: bold;
        color: #0d84b6;
        width: 98%;
        margin: 0 auto;
        border-radius: 4px;
        h2 {
          width: 100%;
          font-weight: bold;
          color: #0d84b6;
          font-size: 16px;
          text-align: left;
          padding: 0px 12px;
          height: 40px;
          line-height: 40px;
          // border: 1px solid #f8d19d;
          border-radius: 4px;
        }
        p {
          letter-spacing: 2px;
          padding: 10px;
          margin: 8px 0;
          // font-size: 20px;
          font-weight: 500;
        }
        .pagination {
          width: 100%;
          padding: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: white;
        }
      }
    }
    .Part3 {
      display: flex;
      .PersonSign {
        width: 100%;
      }
    }
  }
}
.activeshow {
  display: block !important;
}
.updatePw {
  margin-left: 10px;
}
</style>
