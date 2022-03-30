<template>
  <n-tag class="tag" style="vertical-align: middle">
    <n-ellipsis style="max-width: 60px">
      <span class="text">{{ text }}</span>
    </n-ellipsis>
    <template #avatar>
      <n-avatar
        class="avatar"
        :src="props.fallbacksrc"
        @click.stop="avatarClick"
        v-if="props.avatar"
        round
        :fallback-src="props.fallbacksrc"
      />
    </template>
  </n-tag>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'
const props = defineProps({
  text: String,
  textSize: {
    type: String,
    default: '1em'
  },
  avatarSize: {
    type: String,
    default: '20px'
  },
  avatar: {
    type: Boolean,
    default: false
  },
  fallbacksrc: {
    type: String,
    default: 'src/assets/logo.png'
  }
})
const tagHeight = computed(() => {
  return props.avatar ? parseInt(props.avatarSize) + 5 + 'px' : '20px'
})
const Emits = defineEmits(['avatarClick'])
const avatarClick = () => {
  Emits('avatarClick')
}
</script>
<style scoped lang="css">
.tag {
  height: v-bind(tagHeight);
}
.avatar {
  height: v-bind(avatarSize);
}
.text {
  font-size: v-bind(textSize);
}
</style>
