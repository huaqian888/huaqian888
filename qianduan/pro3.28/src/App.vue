<script setup lang="ts">
import { zhCN as NaiveZhCn, dateZhCN as NaiveDataZhCn } from 'naive-ui'
import ElementUiZhCn from 'element-plus/lib/locale/lang/zh-cn'
import { useRouter } from 'vue-router';
import { nextTick, provide, reactive } from 'vue';
const state = reactive({
  showRouter: true
})
function reload() {
  state.showRouter = false
  nextTick(() => {
    state.showRouter = true
  })
}
provide('reload', reload)
</script>

<template>
  <div id="App">
    <el-config-provider :locale="ElementUiZhCn">
      <n-config-provider :locale="NaiveZhCn" :date-locale="NaiveDataZhCn">
        <n-notification-provider placement="bottom-right">
          <n-message-provider>
            <n-dialog-provider>
              <router-view v-if="state.showRouter"></router-view>
            </n-dialog-provider>
          </n-message-provider>
        </n-notification-provider>
      </n-config-provider>
    </el-config-provider>
  </div>
</template>

<style lang="scss">
#App {
  min-width: 1040px;
  min-height: 99.9vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
