<template>
  <div class="BarTopDisplay">
    <el-scrollbar class="BarTopDisplay-scrollbar">
      <div class="scrollbar-div">
        <ButtonBarSide
          v-for="(item, index) in PeopleOparetion"
          :key="index"
          :padding-top="'5px'"
          :height="'80px'"
          @click="skipView(item.path)"
        >
          <template #icon>
            <component :is="item.icon"></component>
          </template>
          <template #name>
            <span class="name-style">{{ item.name }}</span>
          </template>
        </ButtonBarSide>
      </div>
    </el-scrollbar>
    <div class="BarTopDisplay-space">
      <n-space :align="'center'">
        <AvatarInfoBar
          :src="userInfo.src"
          :name="userInfo.name"
          :account="userInfo.account"
          size="60px"
        ></AvatarInfoBar>
        <!-- 退出登录 -->
        <n-button round strong secondary type="error" size="large" @click="regist">
          <span>
            <strong>{{ enter }}</strong>
          </span>
        </n-button>
        <!-- 打卡 -->
        <n-button
          round
          strong
          secondary
          :type="signOutFlag ? 'success' : 'error'"
          size="large"
          @click="punchCard"
          v-if="islogin"
        >
          <span>
            <strong>{{ signInText }}</strong>
          </span>
        </n-button>
      </n-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed, PropType, reactive, inject } from 'vue'
import ButtonBarSide from './ButtonBarSide.vue'
import AvatarInfoBar from './AvatarInfoBar.vue'
import { BarSide } from '../../../global'
import { useRouter } from 'vue-router'
import { MessageUtil } from '../../../utils/notice/notice'
import { API } from '../../../model'
const props = defineProps({
  height: String,
  PeopleOparetion: Array as PropType<Array<BarSide.Operation>>
})
const Router = useRouter()
const skipView = (path: string) => {
  Router.push(path)
}
const scrollbarWidth = computed(() => {
  return props.PeopleOparetion?.length! * 80 + 'px'
})
const { userInfo } = (function User() {
  const userInfo = reactive({
    src: 'src\\assets\\logo.png',
    name: window.sessionStorage.getItem('userName')!,
    email: '545384847@qq.com',
    account: window.sessionStorage.getItem('userAccount')!
  })
  return {
    userInfo
  }
})()
// 请求api对象
const Api = inject<API.API>('$api')!
// 注册
const regist = () => {
  window.sessionStorage.clear()
  Router.push({
    path: '/'
  })
}
// 登录接口
const islogin = ref(true)
const haslogin = ref(true)
const enter = ref('退出登录')
const userId = sessionStorage.getItem('userId')
// 控制打卡退卡类型
const signOutFlag = ref(true)
const messageSuccess = MessageUtil().handleSuccess
const messageError = MessageUtil().handleError
const { punchCard, signInText } = (function SignIn() {
  const signInFlag = ref(false)
  const signInText = computed(() => {
    return signInFlag.value ? '退卡' : '打卡'
  })
  const punchCard = async () => {
    if (!signInFlag.value) {
      await Api.signIn({ userId: userId }).then((data) => {
        if (data?.code === 200) {
          messageSuccess(signInText.value + '成功', {
            closable: false,
            keepAliveOnHover: true,
            duration: 1000
          })
          signInFlag.value = !signInFlag.value
          signOutFlag.value = !signOutFlag.value
        } else {
          messageError(signInText.value + '失败', {
            closable: false,
            keepAliveOnHover: true,
            duration: 1000
          })
        }
      })
    } else {
      await Api.signOut({ userId: userId }).then((data) => {
        if (data?.code === 200) {
          messageSuccess(signInText.value + '成功', {
            closable: false,
            keepAliveOnHover: true,
            duration: 1000
          })
          signInFlag.value = !signInFlag.value
          signOutFlag.value = !signOutFlag.value
        } else {
          messageError(signInText.value + '失败', {
            closable: false,
            keepAliveOnHover: true,
            duration: 1000
          })
        }
      })
    }
  }
  return {
    punchCard,
    signInText
  }
})()
</script>

<style lang="scss">
@import "@/style/variable/BarTopDisplayColor.scss";
@import "@/style/variable/Login.scss";
.BarTopDisplay {
  height: v-bind(height);
  width: 100%;
  top: 0;
  background-color: #c5ffa5cc;
  .BarTopDisplay-scrollbar {
    display: inline-block;
    width: 1000px;
    .scrollbar-div {
      width: v-bind(scrollbarWidth);
      max-height: 80px;
    }
  }
  .name-style {
    font-weight: bolder;
  }
  .BarTopDisplay-space {
    display: inline-block;
    vertical-align: top;
  }
}
.select {
  display: flex;
  justify-content: center;
}
.register {
  span {
    color: $Register;
  }
  span:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>
