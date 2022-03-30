<template>
  <div class="userLogin">
    <section>
      <div class="Content">
        <!-- 登录 -->
        <div class="user singinBx">
          <div class="imgBx">
            <img src="../../assets/logo1.png" alt="登录图" />
          </div>
          <div class="formBx">
            <form>
              <h2>登录</h2>
              <n-input
                class="test-input"
                v-model:value="User.userAccount"
                type="text"
                placeholder="学号"
                size="medium"
                clearable
              ></n-input>
              <n-input
                class="test-input"
                v-model:value="User.userPassword"
                type="password"
                placeholder="密码"
                size="medium"
                clearable
              ></n-input>
              <input type="submit" value="登录" @click.prevent="login" />
              <p class="signup">
                没有账号？
                <a href="#/" @click="topggleForm()">注册</a>
              </p>
            </form>
          </div>
        </div>

        <!-- 注册 -->
        <div class="user singupBx">
          <div class="formBx">
            <n-form
              :model="modelRef"
              ref="formRef"
              :rules="rules"
              label-width="80"
              :inline="false"
              size="normal"
            >
              <h2>注册</h2>
              <n-form-item label path="name">
                <n-input
                  class="test-input"
                  v-model:value="modelRef.name"
                  type="text"
                  placeholder="姓名"
                  size="medium"
                  clearable
                ></n-input>
              </n-form-item>

              <n-form-item label path="account">
                <n-input
                  class="test-input"
                  v-model:value="modelRef.account"
                  type="text"
                  placeholder="学号"
                  size="medium"
                  clearable
                  @blur="userJudge"
                ></n-input>
              </n-form-item>

              <n-form-item label path="password">
                <n-input
                  class="test-input"
                  v-model:value="modelRef.password"
                  type="password"
                  placeholder="密码"
                  size="medium"
                  clearable
                  @blur="passwordJudge"
                ></n-input>
              </n-form-item>
              <input type="submit" value="注册" @click.prevent="regist" />
              <p class="signup">
                已有账号？
                <a href="#/" @click="topggleForm()">登录</a>
              </p>
            </n-form>
          </div>
          <div class="imgBx">
            <img src="../../assets/logo2.png" alt="注册图" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { inject, reactive, ref } from 'vue'
import { FormItemRule, FormRules } from 'naive-ui'
import { API } from '../../model'
import { MessageUtil } from '../../utils/notice/notice'
import { useRouter } from 'vue-router'
import { Store } from '../../stores'
//请求api对象
const Api = inject<API.API>('$api')!
const messageSuccess = MessageUtil().handleSuccess
const messageError = MessageUtil().handleError
interface ModelType {
  name: string | null
  account: string | null
  password: string | null
}
const modelRef = ref<ModelType>({
  name: null,
  account: null,
  password: null
})
const User = reactive({
  userAccount: null,
  userPassword: null
})
const rules: FormRules = {
  name: [
    {
      required: true,
      validator: (rule, value: string) => {
        if (!value) {
          return new Error('不能为空')
        }
        return true
      },
      trigger: ['blur', 'input']
    }
  ],
  account: [
    {
      required: true,
      validator(rule, value: string) {
        if (!value) {
          return new Error('不能为空')
        } else if (!/^20([1][7-9]|[2][0-2])\d{6}$/.test(value)) {
          return new Error('请输入正确的学号')
        }
        return true
      },
      trigger: ['blur', 'input']
    }
  ],
  password: [
    {
      required: true,
      validator(rule, value: string) {
        if (!value) {
          return new Error('不能为空')
        } else if (!(value.length > 1 && value.length < 11)) {
          // /^\d*$/g.test(value)||/^[a-zA-Z]*$/g.test(value)
          return new Error('密码长度应为2~10位数')
        }
        return true
      },
      trigger: ['blur', 'input']
    }
  ]
}
const topggleForm = () => {
  var Content = document.querySelector('.Content')
  Content?.classList.toggle('active')
}
const store = Store()
const userJudge = () => {}
const passwordJudge = () => {}
const router = useRouter()
const login = async () => {
  const data = await Api.login({
    userAccount: User.userAccount,
    userPassword: User.userPassword
  })
  if (data?.code === 200) {
    messageSuccess('登录成功', {
      duration: 1000
    })
    window.sessionStorage.setItem('token', data.data.token)
    window.sessionStorage.setItem('userType', data.data.userType)
    window.sessionStorage.setItem('userAccount', data.data.userAccount)
    window.sessionStorage.setItem('userId', data.data.userId)
    window.sessionStorage.setItem('userName', data.data.userName)
    window.sessionStorage.setItem('userPhone', data.data.userPhone)
    window.sessionStorage.setItem('haslogin', 'true')
    router.push({
      path: '/index'
    })
  } else if (data?.code === 444) {
    console.log(data.message!)
    messageError(data.message!, {
      duration: 1000
    })
  } else if (data?.response.status === 500) {
    messageError('用户名或密码错误', {
      duration: 1000
    })
  }
}
const regist = async () => {
  const data = await Api.register({
    userName: modelRef.value.name,
    userAccount: modelRef.value.account,
    userPassword: modelRef.value.password,
    userPhone: ''
  })
  if (data?.code === 200) {
    messageSuccess(data.message!, {
      duration: 1000
    })
    topggleForm()
  } else if (data?.code === 444) {
    console.log(data.message!)
    messageError(data.message!, {
      duration: 1000
    })
  }
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
/* 设置整个表单参数 (父盒子)*/

section .Content {
  position: relative;
  width: 800px;
  height: 500px;
  background: #fff;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

section .Content .user {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
}

/* 更改图片  （左侧）*/
section .Content .imgBx {
  position: relative;
  width: 50%;
  height: 100%;
  /* background: #fff; */
  transition: 0.5s;
}

section .Content .user .imgBx img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 右侧表单盒子 */

section .Content .user .formBx {
  position: relative;
  width: 50%;
  height: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  transition: 0.5s;
}

/* h2 */

section .Content .user .formBx form h2 {
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  /*大小*/
  letter-spacing: 2px;
  /* 间距*/
  text-align: center;
  width: 100%;
  margin-bottom: 10px;
  color: #555;
}

/* 表单文字属性 */
.test-input {
  margin: 8px 0;
}
/* 为登录设置样式 */

section .Content .user .formBx form input[type='submit'] {
  width: 100%;
  padding: 10px;
  border: none;
  outline: none;
  box-shadow: none;
  margin: 8px 0;
  max-width: 100px;
  background: #677eff;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
  transition: 0.5s;
}

/* 没有账号时 */

section .Content .user .formBx form .signup {
  position: relative;
  margin-top: 20px;
  font-size: 12px;
  letter-spacing: 1px;
  color: #555;
  text-transform: uppercase;
  font-weight: 300;
}

section .Content .user .formBx form .signup a {
  font-weight: 600;
  text-decoration: none;
  color: #677eff;
}

section .Content .singupBx {
  pointer-events: none;
}

section .Content.active .singupBx {
  pointer-events: initial;
}

section .Content .singupBx .formBx {
  left: 100%;
}

section .Content.active .singupBx .formBx {
  left: 0;
}

section .Content .singupBx .imgBx {
  left: -100%;
}

section .Content.active .singupBx .imgBx {
  left: 0;
}

section .Content .singinBx .formBx {
  left: 0;
}

section .Content.active .singinBx .formBx {
  left: 100%;
}

section .Content .singinBx .imgBx {
  left: 0;
}

section .Content.active .singinBx .imgBx {
  left: 100%;
}

@media (max-width: 991px) {
  section .Content {
    max-width: 400px;
  }

  section .Content .imgBx {
    display: none;
  }

  section .Content .user .formBx {
    width: none;
  }
}
.userLogin {
  height: 100%;
  width: 100vw;
  min-height: 99.9vh;
  min-width: 99.9vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(-45deg, #7bffe2, #000000, #b59aff);
  background-size: 400% 400%;
  -webkit-animation: Gradient 10s ease infinite;
  -moz-animation: Gradient 10s ease infinite;
  animation: Gradient 10s ease infinite;
}
@keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@-webkit-keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@-moz-keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
