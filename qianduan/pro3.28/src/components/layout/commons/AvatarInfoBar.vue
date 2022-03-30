<template>
  <div class="AvatarInfoBar">
    <div class="avaatar-div">
      <n-avatar class="avatar" :src="src" round></n-avatar>
    </div>
    <div class="avater-text">
      <span style="display: block">{{ name }}</span>
      <span>{{ account }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router';
defineProps({
  src: String,
  name: String,
  email: String,
  size: String,
  account:String
})
const router = useRouter()
</script>

<style>
.AvatarInfoBar {
  display: inline-block;
  margin-top: 10px;
  text-align: center;
}
.avatar {
  width: v-bind(size);
  height: v-bind(size);
}
.avaatar-div {
  display: inline-block;
}
.avater-text {
  display: inline-block;
  vertical-align: top;
  padding: 10px 10px;
}
</style>
